// pages/auth/register.tsx
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const RegisterPage = () => {
   const [formData, setFormData] = useState({
      name:'',
      email:'',
      phone:'',
      password:'',
      password_confirmation:''

   })
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value,
     });
     //console.log(formData)
   };
   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       const response = await fetch("http://127.0.0.1:8000/api/register", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });

       if (!response.ok) {
         const errorData = await response.json();
         
          if (errorData.errors) {
            Object.keys(errorData.errors).forEach((field) => {
              errorData.errors[field].forEach((errorMessage) => {
                toast.error(errorMessage);
              });
            });
          } else {
            toast.error(errorData.message || "Registration failed");
          }
         
         //throw new Error("Network response was not ok");
       }else{
         
       const data = await response.json();
       if(data.success == true){
         sessionStorage.setItem("authToken", data.token); 
         toast.success(data.message);
         window.location.href = "/"

       }
       console.log("Registration successful:", data);
       }

       // Handle successful registration (e.g., redirect, show message)
     } catch (error) {
       console.error("Error during registration:", error);
       // Handle registration error (e.g., show error message)
     }
   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full text-gray-600 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full text-gray-600 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full text-gray-600 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full text-gray-600 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="password_confirmation"
              className="w-full text-gray-600 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/auth/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
