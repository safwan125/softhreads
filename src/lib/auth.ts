import Cookies from 'js-cookie';


// Key for storing the JWT token
export const TOKEN_KEY = 'softhreads_jwt';
export const USER_KEY = 'softhreads_user';

export const setToken = (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days expiry
};

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const setUser = (user: any) => {
    Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
};

export const getUser = () => {
    const user = Cookies.get(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
    window.location.href = '/'; // Redirect to home
};

import { client } from './wordpress';
import { gql } from 'graphql-request';

// ... (cookies helpers remain same)

export const loginUser = async (identifier: string, password: string) => {
    const mutation = gql`
        mutation Login($username: String!, $password: String!) {
            login(input: {clientMutationId: "uniqueId", username: $username, password: $password}) {
                authToken
                user {
                    id
                    databaseId
                    email
                    name
                }
            }
        }
    `;

    try {
        const data: any = await client.request(mutation, { username: identifier, password });
        if (data?.login?.authToken) {
            return {
                jwt: data.login.authToken,
                user: {
                    id: data.login.user.databaseId,
                    username: data.login.user.name,
                    email: data.login.user.email
                }
            };
        }
        throw new Error('Invalid credentials');
    } catch (error: any) {
        console.error("Login Error:", error);
        throw new Error(error.response?.errors?.[0]?.message || 'Login failed');
    }
};

export const registerUser = async (username: string, email: string, password: string) => {
    const mutation = gql`
        mutation Register($username: String!, $email: String!, $password: String!) {
            registerUser(input: {clientMutationId: "uniqueId", username: $username, email: $email, password: $password}) {
                user {
                    id
                    databaseId
                    email
                    name
                }
            }
        }
    `;

    try {
        const data: any = await client.request(mutation, { username, email, password });
        // Auto-login or return user? 
        // WPGraphQL Register doesn't return token by default unless configured or usually we login sequentially.
        // For now, let's return user and the UI might redirect to login, or we sequence it.
        // But for parity with Strapi function (which returned {jwt, user}), we might fail to get JWT here immediately without a second call.
        // Let's perform a subsequent login
        return await loginUser(username, password);
    } catch (error: any) {
        console.error("Register Error:", error);
        throw new Error(error.response?.errors?.[0]?.message || 'Registration failed');
    }
};
