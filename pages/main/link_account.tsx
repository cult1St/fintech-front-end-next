import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkBankAccount = () => {
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get_banks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          toast.error("Unable to load banks. Check ur network");
          setLoading(false);
          setTimeout(() => (window.location.href = "/main/dashboard"), 1000);
        }
        const data = await response.json();
        setBanks(data || []); // Assuming `data.banks` contains the list of banks
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
        setTimeout(() => (window.location.href = "/main/dashboard"), 1000);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    if (!loading && banks.length > 0) {
      const $select = $(selectRef.current);
      $select.select2({
        placeholder: "Select a bank",
        data: banks.map((bank) => ({
          id: bank.code,
          text: bank.name,
        })),
      });

      $select.on("select2:select", (e) => {
        handleChange({
          target: { name: "bankName", value: e.params.data.id },
        });
      });

      return () => $select.select2("destroy");
    }
  }, [loading, banks]);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAccountNumber = async (e) => {
    const { name, value } = e.target;

    // Create the updated state in a temporary variable
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Update the state
    setFormData(updatedFormData);

    try {
      // Use the updated state in the fetch request
      const response = await fetch(
        "http://127.0.0.1:8000/api/validate_account",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bank_code: updatedFormData.bankName,
            account_number: value,
          }),
        }
      );

      if (!response.ok) {
        const errordata = await response.json();
        toast.error(errordata.message);
      } else {
        const data = await response.json();
        console.log(data);
        console.log(formData);
        setFormData({
          ...updatedFormData,
          accountHolderName: data.data.account_name,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while validating the account.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Bank details:", formData);
    const auth_token = sessionStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/link_bank-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth_token,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            errorData.errors[field].forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          toast.error(errorData.message || "Login failed");
        }

        //throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        if (data.success == true) {
          sessionStorage.setItem("authToken", data.token);
          // toast.error(data.message)
          toast.done(data.message);
          window.location.href = "/main/dashboard";
        }
        console.log("Login successful:", data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center mt-4">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Link Bank Account
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <select
              ref={selectRef}
              name="bankName"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              onChange={handleAccountNumber}
              value={formData.accountNumber}
              required
              className="w-full px-4 py-2 mt-1 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Account Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              readOnly
              value={formData.accountHolderName}
              required
              className="w-full px-4 py-2 mt-1 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
