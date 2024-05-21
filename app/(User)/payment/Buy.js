"use client"
import React, { useState } from "react";
import "./styles.css"

const Buy = ({ makePayment }) => {

    const [isLoading, setIsLoading] = useState(false);



    return (
        <div>
            <main>
        <div className="card">
          <div className="card-header">
            <img src="https://rvs-order-summary-component.netlify.app/images/illustration-hero.svg" alt="" />
          </div>
          <div className="card-body">
            <div className="card-title">Order Summary</div>
            <div className="card-text">You can now listen to millions of songs, audiobooks, and podcasts on any device anywhere you like!</div>
            <div className="card-plan">
              <div className="card-plan-img"><img src="https://rvs-order-summary-component.netlify.app/images/icon-music.svg" alt="" /></div>
              <div className="card-plan-text">
                <div className="card-plan-title">Annual Plan</div>
                <div className="card-plan-price">$59.99/year</div>
              </div>
              <div className="card-plan-link"><a href="#!">Change</a></div>
            </div>
            <div className="card-payment-button">
            <button
                onClick={() => {
                    makePayment({ productId: "example_ebook" });
                }}
                disabled={isLoading}

            >
                {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
            </div>
            <div className="card-cancel-button">
              <button>Cancel Order</button>
            </div>
          </div>
        </div>
      </main>

            {/* <h1>Razor Pay Integration with NextJs 13</h1>
            <button
                onClick={() => {
                    makePayment({ productId: "example_ebook" });
                }}
                disabled={isLoading}

            >
                {isLoading ? 'Processing...' : 'Buy Now'}
            </button> */}



        </div>
    );
};

export default Buy;
