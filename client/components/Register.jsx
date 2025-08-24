import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../src/axiosConfig";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import FancyButton from "./FancyButton";
import Logo from "../src/assets/Logo.png";

const Register = () => {
  const navigate = useNavigate(); // <-- initialize navigate
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

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/register", data);
      console.log("Server response:", response.data);

      // Redirect to /home after successful registration
      if (response.status === 200 || response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center hover:drop-shadow-[0_4px_6px_#6366F1] transition-all ease-in-out duration-300">
        <img src={Logo} className="h-18 w-auto scale-300" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 bg-black/20 backdrop-blur-3xl shadow-md rounded-lg p-6 border-2 border-zinc-800"
      >
        {/* Full Name */}
        <div className="flex flex-col mb-4 text-center ">
          <label className="text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter a secure password"
            {...register("password")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="number"
            placeholder="Enter phone number"
            {...register("phone")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
          />
        </div>

        {/* Role dropdown */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Role</label>
          <select
            {...register("role")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col mb-4 text-center">
          <label className="text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            {...register("location")}
            className="border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit button */}
        <div className="relative left-30">
          <FancyButton
            label="SignUp"
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
