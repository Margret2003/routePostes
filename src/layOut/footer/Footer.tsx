import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaPlusSquare, FaGlobe } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12 text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand / Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold text-gray-800 tracking-wide">
            Social<span className="text-cyan-500">App</span>
          </span>
          <p className="text-sm text-gray-400">
            Share your thoughts and connect with friends easily.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/home" className="hover:text-cyan-500 transition-colors">
            Home
          </Link>
          <Link to="/profile" className="hover:text-cyan-500 transition-colors">
            Profile
          </Link>
          <Link to="/addPost" className="hover:text-cyan-500 transition-colors">
            Add Post
          </Link>
        </div>

        {/* Copyright & Info */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          <p>© {new Date().getFullYear()} Route Posts. All rights reserved.</p>
          <p className="mt-1">Designed with passion & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
