"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; 

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        userName: userName,
        password: password,
      });

      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("jwtToken", token);
      const decoded: { role: string } = jwtDecode(token);
      if (decoded.role === "admin") {
        router.push("/admin");
      } else if (decoded.role === "teacher") {
        router.push("/teacher");
      } else if (decoded.role === "student") {
        router.push("/student");
      }


      // Store the token using react-query
      // const queryClient = useQueryClient();
      // queryClient.setQueryData("token", token);

      // You can also redirect the user to a new page or update the state
    } catch (error) {
      // Handle error response
      setError("Invalid user name or password.");
      console.error(error);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      if (!userName || !password) {
        setError("User Name and Password are required.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="flex w-full h-full">
        {/* Left Side with blurred background */}
        <div className="  h-screen">
          <div
            className="absolute inset-0 w-full bg-cover bg-center rounded-lg  shadow-xl"
            style={{ backgroundImage: 'url("/new.png")' }}
          >
            <div className="flex items-center justify-center  h-screen p-6 ">
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md  mt-4 justify-center ">
                <div className="flex items-center justify-center h-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpep873i6dOdCCH9I6ZIOsB-MkDKmyI7zvYg&s"
                    alt="School Logo"
                    className="w-20 h-20 z-10 rounded-full " // Size of the logo can be adjusted
                  />
                </div>
                <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
                  Sign in to your portal
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-gray-700">User ID</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                      placeholder="Enter your user ID"
                    />
                  </div>

                  <div className="relative pb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute top-9 right-3 "
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2 rounded-md focus:outline-none hover:bg-orange-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  {/* <div className="text-center mt-4">
                <p>Don't have an account? <a href="#" className="text-orange-600 hover:underline">Sign Up now</a></p>
              </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Login Form */}
      </div>
    </div>
  );
}