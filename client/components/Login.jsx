import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../src/assets/Logo.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      {/* Background Logo (light opacity) */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5">
        <img src={Logo} alt="Logo" className="w-[500px] max-w-full" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl z-10 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~-]).{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                },
              })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error */}
          {loginError && (
            <p className="text-red-600 text-center font-medium">{loginError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <NavLink
            to="/signup"
            className="inline-block text-indigo-600 hover:underline font-medium"
          >
            Don’t have an account? Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
