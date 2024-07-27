import React from 'react';
import './copoun.css';

const Copoun = () => {
    return (
        <div className="coupon-container">
            <h1>Exciting Offers</h1>
            <div className="coupon">
                <h3>BUY ANY 4 T Shirts @ Rs.999</h3>
                <h5>Apply TS999</h5>
            </div>
            <div className="coupon">
                <h3>BUY ANY 3 T Shirts @ Rs.700</h3>
                <h5>Apply TS700</h5>
            </div>
            <div className="coupon">
                <h3>BUY ANY 6 T Shirts @ Rs.1200</h3>
                <h5>Apply TS1200</h5>
            </div>
            <div className="coupon">
                <h3>Extra 10% OFF on Online Payment</h3>
            </div>
        </div>
    );
};

export default Copoun;
