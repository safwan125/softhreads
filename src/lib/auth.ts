import Cookies from 'js-cookie';
import { STRAPI_URL } from './strapi';

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

export const loginUser = async (identifier: string, password: string) => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            body: JSON.stringify({
                identifier,
                password,
            }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data; // { jwt, user }
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data; // { jwt, user }
    } catch (error) {
        throw error;
    }
};
