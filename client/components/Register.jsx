import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FancyButton from "./FancyButton";
import Logo from "../src/assets/Logo.png";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      role: "patient",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <img src={Logo} className="h-16 w-auto drop-shadow-md" alt="Logo" />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl px-6 py-8 border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter a secure password"
            {...register("password")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="number"
            placeholder="Enter phone number"
            {...register("phone")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 font-medium mb-1">Role</label>
          <select
            {...register("role")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col mb-6">
          <label className="text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            {...register("location")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <FancyButton
            label="Sign Up"
            backgroundColor="black"
            text="white"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
