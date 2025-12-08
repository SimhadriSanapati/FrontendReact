 src/About.jsx
import React from "react";
import "./About.css";
// import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "./config";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About </h1>
        <p className="tagline"></p>
      </header>

      <section className="about-content">
        <h2>Our Story</h2>
        <p></p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Fresh products delivered directly to your door</li>
          <li>✅ Wide range: Milk, Fruits, Vegetables, Snacks & Beverages</li>
          <li>✅ Easy online ordering with fast checkout</li>
          <li>✅ Customer-first service and satisfaction guarantee</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          To make healthy, fresh, and tasty products accessible to everyone, while delivering
          convenience and joy through online shopping.
        </p>
      </section>
    </div>
  );
}

export default About;
