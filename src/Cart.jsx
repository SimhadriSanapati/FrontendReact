import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementCart, removeFromCart } from "./Store";
import ApplyCoupons from "./ApplyCoupon";
import "./Cart.css";
import SendOrederEmail from "./SendOrederEmail";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "./Store"; // ADD THIS

function Cart({ setPopup }) {
  const cartItems = useSelector((state) => state.cart);
  const { code, discountApplied, applied } = useSelector(
    (state) => state.coupon
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPrice, setDiscountPrice] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [showQR, setShowQR] = useState(false);

  // PRICE CALCULATIONS
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const manualDiscountAmount = (totalPrice * discountPrice) / 100;
  const couponDiscountAmount = applied
    ? (totalPrice * discountApplied) / 100
    : 0;

  const totalDiscount = manualDiscountAmount + couponDiscountAmount;
  const priceAfterDiscount = totalPrice - totalDiscount;

  const gstAmount = priceAfterDiscount * 0.18;
  const netAmount = priceAfterDiscount + gstAmount;

  // UPI QR PAYMENT DETAILS
  const upiID = "simhadris382@okicici";
  const payerName = "EAT & MEET STORE";

  const upiLink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${netAmount.toFixed(
    2
  )}&cu=INR`;

  // FINAL ORDER SAVE + NAVIGATE
  const handleProceedCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!userEmail.trim()) {
      alert("Please enter your email");
      return;
    }

    const orderData = {
      items: cartItems,
      totalPrice,
      totalDiscount,
      gstAmount,
      netAmount,
      userEmail,
      paymentStatus: "Paid",
    };

    dispatch(placeOrder(orderData)); // SAVE ORDER
    navigate("/order"); // GO TO ORDER PAGE
  };

  return (
    <div className="cart-container">
      <h1>Bill Summary 🛒</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.photo} alt={item.name} />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty}</p>

                <button onClick={() => dispatch(addToCart(item))}>+</button>

                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    setPopup("Removed From Cart!");
                    setTimeout(() => setPopup(""), 1500);
                  }}
                >
                  Remove
                </button>

                <button onClick={() => dispatch(decrementCart(item.id))}>
                  -
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>

          <button onClick={() => setDiscountPrice(10)}>Apply 10%</button>
          <button onClick={() => setDiscountPrice(20)}>Apply 20%</button>
          <button onClick={() => setDiscountPrice(30)}>Apply 30%</button>

          <ApplyCoupons />

          {/* EMAIL */}
          <h4>Enter your Email:</h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <SendOrederEmail
            cartItems={cartItems}
            netAmount={netAmount}
            gstAmount={gstAmount}
            userEmail={userEmail}
            totalDiscount={totalDiscount}
            total={totalPrice}
          />

          <h3>Total Discount: ₹{totalDiscount}</h3>
          <h3>Price After Discount: ₹{priceAfterDiscount}</h3>
          <h3>GST: ₹{gstAmount.toFixed(2)}</h3>
          <h1>Net Amount: ₹{netAmount.toFixed(2)}</h1>

          {/* QR PAYMENT */}
          <button
            onClick={() => setShowQR(!showQR)}
            className="qr-button"
          >
            {showQR ? "Hide QR Code" : "Show QR to Pay"}
          </button>

          {showQR && (
            <div style={{ marginTop: "20px" }}>
              <h2>Scan to Pay</h2>

              <QRCodeCanvas value={upiLink} size={230} />

              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                {upiLink}
              </p>
            </div>
          )}

          {/* CHECKOUT */}
          <button
            className="checkout-btn"
            onClick={handleProceedCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
