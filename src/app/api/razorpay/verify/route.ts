import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: 'Razorpay secret not configured' }, { status: 500 });
        }

        const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(bodyData.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // TODO: Here you would typically also create the order in WooCommerce via GraphQL
            return NextResponse.json({ success: true, message: 'Payment verified' });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Razorpay Verification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
