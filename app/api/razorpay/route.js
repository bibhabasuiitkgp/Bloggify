import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});


export async function GET() {  // Handler function for GET requests

    const payment_capture = 1;
    const amount = 1 * 10000;
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: "testingDemo",
            userId: "100",
            productId: 'P100'
        }
    };

    const order = await instance.orders.create(options);  // Creating an order
    return NextResponse.json({ msg: "success", order }); // Return the order
}


export async function POST(req) {
    const body = await req.json(); // Getting the body of the request


    return NextResponse.json({ msg: body });
}