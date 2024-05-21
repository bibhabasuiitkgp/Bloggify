// BuyProduct.js
"use client";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";

const BuyProduct = () => {
    const router = useRouter();

    const makePayment = async ({ productId = null }) => {
        const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
        console.log(key);

        try {
            const res = await fetch("/api/razorpay");
            const { order } = await res.json();
            console.log(order.id);

            const options = {
                key: key,
                name: "StudySphere",
                currency: order.currency,
                amount: order.amount,
                order_id: order.id,
                description: "Online learning platform",
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
                    console.log("response verify==", resJson);

                    if (resJson?.message === "success") {
                        console.log("Payment successful:", resJson);
                        router.push("/dashboard");
                    }
                },
                prefill: {
                    name: "studysphere",
                    email: "studysphere@gmail.com",
                    contact: "0000000000",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            //   paymentObject.on("payment.failed", function (response) {
            //     alert("Payment failed. Please try again. Contact support for help.");
            //   });
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Buy makePayment={makePayment} />
            </Suspense>
        </>
    );
};

export default BuyProduct;
