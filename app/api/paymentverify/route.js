// paymentverify.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance with API credentials
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Handler function for POST requests to verify payment
export async function POST(req) {
  // Parse JSON body from the request
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
  
  // Concatenate order ID and payment ID to create the body string
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // Generate the expected signature using HMAC SHA256
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  // Compare the expected signature with the received signature
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Return success response with payment information if signatures match
    return NextResponse.json(
      { message: "success", paymentId: razorpay_payment_id, orderId: razorpay_order_id },
      { status: 200 }
    );
  } else {
    // Return failure response if signatures do not match
    return NextResponse.json({ message: "fail" }, { status: 400 });
  }
}
