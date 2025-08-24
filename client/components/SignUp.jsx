import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
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

  const onSubmit = (data) => {
    console.log(data); // send to backend API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6"
    >
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
        <label className="text-gray-700 font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          {...register("dob")}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role dropdown */}
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
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 font-medium mb-1">Location</label>
        <input
          type="text"
          placeholder="Enter location"
          {...register("location")}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
