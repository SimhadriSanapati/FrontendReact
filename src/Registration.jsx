import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; 
import "./Registration.css";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:7000/api/v1/products/register", data);

      alert("Registration Successful!");
      console.log(response.data);

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* NAME */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              placeholder="Enter your phone"
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Phone must be at least 10 digits" },
              })}
            />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
