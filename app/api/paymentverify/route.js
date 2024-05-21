// paymentverify.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export async function POST(req) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Returning success response with payment information
    return NextResponse.json({ message: "success", paymentId: razorpay_payment_id, orderId: razorpay_order_id }, { status: 200 });
  } else {
    return NextResponse.json({ message: "fail" }, { status: 400 });
  }
}
