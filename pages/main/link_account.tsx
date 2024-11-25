import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkBankAccount = () => {
    
   // const token = sessionStorage.getItem("authToken");
 //  console.log(sessionStorage)
    // if(!token || token.length < 1){
    //     window.location.href = "/auth/login"
    // }
  useEffect(() => {

    const fetch_banks = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/get_banks");
        if(!response.ok){
          toast.error("Registration failed");
        }
        const data = await response.json()
        
    }


    
  
  }, [])
  




  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation or API call logic here to submit bank details
    console.log('Bank details:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Link Bank Account</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bankName"
              onChange={handleChange}
              value={formData.bankName}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., XYZ Bank"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              onChange={handleChange}
              value={formData.accountNumber}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Account Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              onChange={handleChange}
              value={formData.accountHolderName}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Account Holder's Full Name"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Link Bank Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkBankAccount;
