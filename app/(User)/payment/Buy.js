"use client"
import React, { useState, useEffect } from "react";
import "./styles.css";
import { useRouter } from "next/navigation";

// Buy component to handle the book purchase
const Buy = ({ makePayment }) => {
  const router = useRouter();

  // State to handle loading status and selected book details
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);

  // useEffect hook to retrieve the selected book from localStorage when the component mounts
  useEffect(() => {
    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
      setBook(JSON.parse(storedBook));
    }
  }, []);

  // If no book is selected, display a message
  if (!book) {
    return <div>No book selected</div>;
  }

  // Destructure book details
  const { description, price} = book;

  return (
    <div>
      <main>
        <div className="card">
          <div className="card-header">
            <img src="/images/29.png" alt="" />
          </div>
          <div className="card-body">
            <div className="card-title">Order Summary</div>
            <div className="card-text">Thank you for purchasing with us. Have a nice day</div>
            <div className="card-plan">
              <div className="card-plan-img">
                <img src="https://cdn-icons-png.freepik.com/256/171/171322.png?semt=ais_hybrid" height={"40px"} width={"40px"} alt="" />
              </div>
              <div className="card-plan-text">
                <div className="card-plan-title">{description}</div>
                <div className="card-plan-price">${price}</div>
              </div>
            </div>
            <div className="card-payment-button">
              <button
                onClick={() => {
                  setIsLoading(true); // Set loading state to true when payment process starts
                  makePayment({ productId: "example_ebook" });
                }}
                disabled={isLoading} // Disable button if payment is processing
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
            <div className="card-cancel-button">
              <button onClick={() => router.push('/dashboard')}>Cancel Order</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Buy;
