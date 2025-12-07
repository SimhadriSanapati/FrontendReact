import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./Store";
import "./Order.css";

function Order() {
  const dispatch = useDispatch();

  const { loading, error, orderDetails } = useSelector(
    (state) => state.getorders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p>Loading Orders...</p>;
  if (error) return <p>Error: {error}</p>;

  const ordersList = orderDetails || [];

  return (
    <div className="order-container">
      <h1>All Orders</h1>

      {ordersList.length === 0 ? (
        <p>No orders found</p>
      ) : (
        ordersList.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>User: {order.userEmail}</p>

            <p>Total Price: ₹{order.totalPrice}</p>
            <p>Total Discount: ₹{order.totalDiscount}</p>
            <p>GST: ₹{order.gstAmount}</p>
            <p>Net Amount: ₹{order.netAmount}</p>
            <p>Status: {order.paymentStatus}</p>

            <h4>Items:</h4>

            {order.items?.length > 0 ? (
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    <img
                      src={item.photo}
                      alt={item.name}
                      width="50"
                      height="50"
                    />
                    {item.name} — ₹{item.price} × {item.qty}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
