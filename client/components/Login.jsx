import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../src/axiosConfig";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../src/assets/Logo.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      // Use either axios or axiosInstance depending on your config
      const response = await axiosInstance.post("/user/login", data);

      console.log("Login successful:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="absolute inset-0 flex justify-center items-center opacity-5">
        <img src={Logo} alt="Logo" className="w-[500px] max-w-full" />
      </div>

      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl z-10 mx-4">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>

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
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <p className="text-red-600 text-center font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

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
