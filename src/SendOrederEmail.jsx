import React from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./VegItems.jsx";
import "./Vegetables.jsx";
import "./Home.jsx";
import "./MilkProducts.jsx";
import "./Cart.jsx";
import "./Store.js";


function SendOrederEmail({ cartItems, netAmount, gstAmount, userEmail , totalDiscount ,totalPrice }) {
  const sendindEmail = () => {
    const totalprice = netAmount; // total including GST
    const discountApplied = totalDiscount ; // 0;
    let templateParams = {
      orders: cartItems.map(item => ({
        name: item.name,
        units: item.qty,
        price: item.price,
        item: item.photo,
      })),
      order_id: Date.now(),
      shipping :0,
      total : totalPrice ,
      discountAmount : discountApplied.toFixed(2) ,
      tax: gstAmount.toFixed(2),
      totalamount: netAmount.toFixed(2) ,
      email: userEmail
    };

    emailjs
      .send('service_2lekogh', 'template_ve9jkwb', templateParams, '-5_ErNWRP7FtBLBrU')
      .then(response => {
        alert('Order Placed Successfully!', response.status, response.text);
      })
      .catch(err => {
        alert('Failed to send order email. Please try again.');
        console.error(err);
      });
  };

  return (
    <>
      <button className="send-email-btn" onClick={sendindEmail}>
        Send Order Email
      </button>
    </>
  );
}

export default SendOrederEmail;
