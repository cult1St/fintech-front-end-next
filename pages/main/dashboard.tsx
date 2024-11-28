import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const dashboard_response =  async () => {
    const auth_token = sessionStorage.getItem("authToken");
    try{
      const response = await fetch("http://localhost:8000/api/dashboard", {
        method:"post",
        headers:{
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+auth_token,
        }
      })

      if(!response.ok){
        const error_message = await response.json();
        toast.error(error_message.error)
        
        window.location.href = "/auth/login"
      }
      setLoading(false);
      const data = await response.json();
      console.log(data)
    }catch(error){
      toast.error("Sorry, An Error Occured")
    }
  }
  dashboard_response();



  // Mock data
  const accountInfo = {
    balance: "$5,000",
    accountNumber: "123456789",
    bankName: "XYZ Bank",
  };

  const linkedAccounts = [
    { bank: "XYZ Bank", accountNumber: "123456789" },
    { bank: "ABC Bank", accountNumber: "987654321" },
  ];

  const transactions = [
    { id: 1, type: "Deposit", amount: "$1,000", date: "2024-10-01" },
    { id: 2, type: "Withdrawal", amount: "$500", date: "2024-10-05" },
    { id: 3, type: "Deposit", amount: "$2,000", date: "2024-10-10" },
  ];
  if(loading){
    return  (
      <div className="flex justify-center h-screen items-center mt-4">
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }else{
    return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
        {/* Account Details */}
        <div className="bg-indigo-100 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-indigo-700 mb-2">Account Details</h3>
          <p className="text-gray-700"><span className="font-semibold">Balance:</span> {accountInfo.balance}</p>
          <p className="text-gray-700"><span className="font-semibold">Account Number:</span> {accountInfo.accountNumber}</p>
          <p className="text-gray-700"><span className="font-semibold">Bank:</span> {accountInfo.bankName}</p>
        </div>

        {/* Linked Bank Accounts */}
        <div className="bg-blue-100 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Linked Bank Accounts</h3>
          <ul>
            {linkedAccounts.map((account, index) => (
              <li key={index} className="text-gray-700 flex justify-between py-2">
                <span>{account.bank}</span>
                <span>Account Number: {account.accountNumber}</span>
              </li>
            ))}
          </ul>
          <Link className='bg-blue-600 text-white rounded-sm p-2' href='/main/link_account'>
            Link An Acount
          </Link>
        </div> 

        {/* Transaction History */}
        <div className="bg-green-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-700 mb-2">Transaction History</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className="text-gray-700 flex justify-between py-2">
                <span>{transaction.type}</span>
                <span>{transaction.amount}</span>
                <span>{transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  }
  
};

export default Dashboard;
