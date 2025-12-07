import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./Store"; // your thunk
import { useNavigate } from "react-router-dom";

function Login({ setPopup }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setPopup("⚠️ Please fill all fields!");
      setTimeout(() => setPopup(""), 2000);
      return;
    }

    dispatch(loginUser(form));
  };

  // Redirect after login
  useEffect(() => {
    if (success) {
      setPopup("✅ Login Successful!");
      setTimeout(() => {
        setPopup("");
        navigate("/"); // redirect home
      }, 1500);
    }
  }, [success, navigate, setPopup]);

  // Show error popup
  useEffect(() => {
    if (error) {
      setPopup("❌ Invalid credentials! Try again.");
      setTimeout(() => setPopup(""), 2000);
    }
  }, [error, setPopup]);

  return (
    <div style={{ width: "350px", margin: "60px auto" }}>
      <h2>🔐 Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
