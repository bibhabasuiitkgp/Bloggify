// BuyProduct.js
"use client";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";

// BuyProduct component to handle the payment process
const BuyProduct = () => {
    const router = useRouter();

    // makePayment function to initiate the payment process
    const makePayment = async ({ productId = null }) => {
        const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY; // Razorpay API key from environment variables

        try {
            // Fetch order details from the server
            const res = await fetch("/api/razorpay");
            const { order } = await res.json();

            // Razorpay payment options
            const options = {
                key: key,
                name: "Book_Wagon", // Name of the business
                currency: order.currency,
                amount: order.amount, // Payment amount
                order_id: order.id, // Order ID from Razorpay
                description: "Online learning platform",

                // Handler function to verify payment after completion
                handler: async function (response) {
                    console.log(response);
                    const verificationRes = await fetch("/api/paymentverify", {
                        method: "POST",
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });
                    const resJson = await verificationRes.json();
                    // console.log("response verify==", resJson);

                    // Redirect to dashboard if payment is successful
                    if (resJson?.message === "success") {
                        // console.log("Payment successful:", resJson);
                        router.push("/dashboard");
                    }
                },

                // Prefilled user information
                prefill: {
                    name: "Bookwagon",
                    email: "Bookwagon@gmail.com",
                    contact: "0000000000",
                },
            };

            // Create a new Razorpay payment object and open the payment window
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            // Uncomment the below code to handle payment failures
            paymentObject.on("payment.failed", function (response) {
                alert("Payment failed. Please try again. Contact support for help.");
            });
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    return (
        <>
            {/* Suspense to show loading spinner while Buy component is loading */}
            <Suspense fallback={<Loading />}>
                <Buy makePayment={makePayment} />
            </Suspense>
        </>
    );
};

export default BuyProduct;
