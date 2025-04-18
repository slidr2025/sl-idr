'use client'
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showForm, setShowForm] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const formRef = useRef();

  useEffect(() => {
    const targetDate = new Date("2025-04-25T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      const days = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((difference / 1000 / 60) % 60));
      const seconds = Math.max(0, Math.floor((difference / 1000) % 60));
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenForm = (type) => {
    setPaymentType(type);
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleSubmit = () => {
    setTimeout(() => {
      if (paymentType === "Stripe") {
        window.location.href = "https://buy.stripe.com/test_bIYcN11k15ku3pC9AA";
      } else {
        window.location.href = "https://wise.com/pay/r/P92tUo0d_eF0rE0";
      }
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center animate-fade-in relative">
      <div className="space-y-6 max-w-3xl w-full flex flex-col items-center justify-center">
        <div className="transform animate-slide-up">
          <h2 className="text-5xl font-bold text-white mb-2">APRIL 25, 2025</h2>
          <div className="text-3xl text-white tracking-widest mb-6">
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div>
        </div>
        <h1 className="text-6xl font-bold transform animate-zoom-in">
          <span className="text-red-600">SL</span>
          <span className="text-white bg-black px-2">-IDR</span>
        </h1>
        <p className="text-lg text-white">
          Bold. Minimal. Made in Indonesia. Experience the SL-IDR.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => handleOpenForm("Stripe")} className="flex items-center gap-2 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
            <span>💳</span> Pay with Stripe
          </button>
          <button onClick={() => handleOpenForm("Wise")} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-md">
            <span>🌍</span> Pay with Wise
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-100 text-black p-6 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Checkout with {paymentType}</h3>
              <button onClick={handleCloseForm} className="text-red-600 text-lg font-bold">&times;</button>
            </div>
            <form ref={formRef} action="https://formcarry.com/s/TEsDyDzesMZ" method="POST" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-left">
              <input type="hidden" name="paymentMethod" value={paymentType} />
              <input name="facebookName" type="text" placeholder="Facebook Name" className="border p-2 rounded" required />
              <input name="email" type="email" placeholder="Email" className="border p-2 rounded" required />
              <input name="fullName" type="text" placeholder="Full Name (For Shipping)" className="border p-2 rounded" required />
              <input name="address" type="text" placeholder="Address" className="border p-2 rounded" required />
              <input name="city" type="text" placeholder="City" className="border p-2 rounded" required />
              <input name="state" type="text" placeholder="State" className="border p-2 rounded" required />
              <input name="postcode" type="text" placeholder="Postcode / Zipcode" className="border p-2 rounded" required />
              <input name="country" type="text" placeholder="Country" className="border p-2 rounded" required />
              <input name="phone" type="text" placeholder="Phone number (with country code)" className="border p-2 rounded" required />
              <select name="shippingMethod" className="border p-2 rounded" required>
                <option value="">Select Shipping Method</option>
                <option>DHL (AROUND THE WORLD)</option>
                <option>J&T (INDONESIA ONLY)</option>
                <option>HUB SHIPPING</option>
              </select>
              <button type="submit" className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}