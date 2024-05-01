"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContext, UserContextProvider } from "@/context/UserContext";

export default function Login() {
  const { userId, setUserId, userToken, setUserToken, setUsername } =
    useContext(UserContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await axios.post(
        "https://aleeyah.onrender.com/auth/login",
        formData
      );
      console.log(response?.data);
      setUserToken(response?.data?.token);
      setUserId(response?.data?.user?.id); // Optional: Store token in local storage
      setUsername(response?.data?.user?.username)
      // Optional: Store token in local storage
      toast.success(response.data.message, {
        position: "top-center",
      });

      setTimeout(() => {
        router.push(`/${userId}/chat`);
      }, 3000);
      
    } catch (error) {
      console.error(error); // Display error message
      toast.error(error.response?.data?.message, {
        position: "top-center",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <main className="w-full h-screen md:w-2/6 mx-auto flex flex-col items-center p-4 md:p-2 md:justify-center gap-6">
      <ToastContainer />
      <div className="md:w-[150px]">
        <Image
          src={"/logo.png"}
          width={1000}
          height={1000}
          alt="product logo"
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex flex-col w-full items-center">
        <h1 className="text-primarycolor font-bold text-3xl">Sign In</h1>
        <p>
          {"Don't have an account?"}{" "}
          <a href="/signup" className="text-primarycolor">
            Sign Up
          </a>
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full">
            <label className="text-gray-400">E-mail address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="bg-gray-50 outline-primarycolor h-[60px] rounded px-3"
            />
          </div>{" "}
          <div className="flex flex-col gap-1">
            <label className="text-gray-400">Password</label>
            <div className="relative">
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-5"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </div>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-gray-50 w-full h-[60px] outline-primarycolor rounded px-3"
              />
              {formData.password.length > 6 ? (
                ""
              ) : (
                <p className="text-red-400 text-sm">
                  Password must be up to 6 characters
                </p>
              )}
            </div>
          </div>
          {formData.password.length > 6 && formData.email.length > 0 ? (
            loading ? (
              <button className="bg-green-200 flex justify-center items-center p-4 md:p-6 rounded text-white">
                <AiOutlineLoading3Quarters className="text-primarycolor font-bold animate-spin" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primarycolor p-4 md:p-6 rounded text-white"
              >
                Continue
              </button>
            )
          ) : (
            <button
              disabled
              className="cursor-help bg-gray-200 p-4 md:p-6  rounded text-white"
            >
              Continue
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
