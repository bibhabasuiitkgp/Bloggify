import React from 'react';
import { useRouter } from 'next/navigation';

const Book = ({ img, subject, description, price, author }) => {
    const router = useRouter();

    return (
        <div className="course">
            <img src={img} alt={`${subject} Course Image`} />
            <h2>{subject}</h2>
            <p>{description}</p>
            <div className="course-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p>Price: ${price}</p>
                    <p>Author: {author}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button className="btn-5" onClick={() => router.push("/payment")} >
                        <span>Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Book;
