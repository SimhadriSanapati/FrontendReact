import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VegItems from './VegItems';
import MilkProducts from './MilkProducts';
import Vegetables from './Vegetables';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';
import Cart from "./Cart";
import Order from "./Order";
import Registration from "./Registration";   // ⭐ Added Registration

import './App.css';
import { useState } from "react";
import Login from "./Login";

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const [popup, setPopup] = useState("");

  return (
    <BrowserRouter>
      <div className="app-container">

        {/* Popup Message */}
        {popup && <div className="popup">{popup}</div>}

        {/* App Title */}
        <div className="app-title">🍟🍔 EAT & MEET 🥤</div>

        {/* Navbar */}
        <header className="navbar">
          <Link to="/">🏠 Home</Link>
          <Link to="/about">ℹ️ About</Link>
          <Link to="/vegetables">🥦 Vegetables</Link>
          <Link to="/vegItems">🍛 VegItems</Link>
          <Link to="/milkProducts">🥛 MilkProducts</Link>
          <Link to="/contactUs">📞 Contact Us</Link>
          <Link to="/register">📝 Register</Link> 
          <Link to="/cart">🛒 Cart ({cartCount})</Link>
          <Link to="/order">📦 Orders</Link>
          <Link to="/login">🔐 Login</Link>

        </header>

        {/* Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home setPopup={setPopup} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/vegetables" element={<Vegetables setPopup={setPopup} />} />
            <Route path="/vegItems" element={<VegItems setPopup={setPopup} />} />
            <Route path="/milkProducts" element={<MilkProducts setPopup={setPopup} />} />
            <Route path="/cart" element={<Cart setPopup={setPopup} />} />
            <Route path="/order" element={<Order setPopup={setPopup} />}/>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login setPopup={setPopup} />} />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
