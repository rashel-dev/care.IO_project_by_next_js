"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
              <FaEnvelope />
            </div>
            <input
              type="email"
              required
              className="block w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
              placeholder="Email address"
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-cyan-400 transition-colors">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="block w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-400 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500/50 mr-2" />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden group shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign In"
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-transparent text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center px-4 py-2 border border-gray-700/50 rounded-xl bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300">
          <FaGoogle className="mr-2 text-red-500" /> Google
        </button>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-700/50 rounded-xl bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300">
          <FaGithub className="mr-2" /> GitHub
        </button>
      </div>

      <p className="text-center text-gray-400">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
