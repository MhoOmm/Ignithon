import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom"; // import NavLink
import Logo from "../src/assets/Logo.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const response = await axios.post(
        "https://sanjeevni-backend.onrender.com/user/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      //console.log("Login successful:", response.data);

      navigate("/home");
      
      // TODO: optionally save auth token etc. here
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Logo */}
      <div className="absolute -top-30 -left-0 w-full h-full overflow-hidden ">
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-[-100px] left-0 w-full h-full object-cover transform scale-40 "
        />
      </div>

      {/* Login Form */}
      <div className="relative max-w-md w-full p-6 bg-white rounded-2xl shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className="w-full border rounded p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
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
              className="w-full border rounded p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <p className="text-red-600 text-center font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <NavLink
            to="/signup"
            className="inline-block text-blue-600 hover:underline font-medium"
          >
            Don't have an account? Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
