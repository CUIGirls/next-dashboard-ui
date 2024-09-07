"use client";
import Link from "next/link";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for button disabled and loading
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button and show spinner

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
    console.log('Login successful:', data.token);
    localStorage.setItem('jwtToken', data.token);
    } catch (error: any) {
      console.error("Login Error:", error);
      setErrorMessage(error.message); // Set error message
      setIsSubmitting(false); // Re-enable button if there's an error
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
 
  return (
    <div className="sign-up-form bg-white rounded-2xl px-10 py-10 w-full max-w-lg h-auto lg:w-1/2 lg:h-3/4 mx-auto my-10">
      <h1 className="mb-4 font-source-code text-3xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="px-10">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Email
            <input
              className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none  sm:sm:border-green-200 sm:focus:bg-green-100 sm:outline-none sm:rounded-lg sm:p-3"
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Password
            <div className="relative">
              <input
                className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none  sm:sm:border-green-200 sm:focus:bg-green-100 sm:outline-none sm:rounded-lg sm:p-3"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required
              />
              <i
                className={`bi ${
                  isPasswordVisible ? "bi-eye" : "bi-eye-slash"
                } custom-class absolute right-2 top-2 cursor-pointer`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </label>
          <button
            className="w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-xs"
            type="submit"
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? (
              <i className="bi bi-arrow-repeat animate-spin"></i> // Show spinner
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;