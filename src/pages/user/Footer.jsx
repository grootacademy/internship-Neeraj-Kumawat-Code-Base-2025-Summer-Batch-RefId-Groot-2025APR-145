import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-gray-80 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-extrabold">
            <span className="text-yellow-400">One Roof</span>{" "}
            <span className="text-red-400">Education</span>
          </h2>
          <p className="mt-4 text-sm text-gray-800">
            Empowering students to achieve success in competitive exams with
            structured courses, expert faculty, and modern resources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-500">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">Home</a></li>
            <li><a href="#" className="hover:text-red-500">About Us</a></li>
            <li><a href="#" className="hover:text-red-500">Programs</a></li>
            <li><a href="#" className="hover:text-red-500">Admissions</a></li>
            <li><a href="#" className="hover:text-red-500">Contact</a></li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-500">
            Our Programs
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">IIT-JEE</a></li>
            <li><a href="#" className="hover:text-red-500">NEET</a></li>
            <li><a href="#" className="hover:text-red-500">SSC / Banking</a></li>
            <li><a href="#" className="hover:text-red-500">UPSC / PCS</a></li>
            <li><a href="#" className="hover:text-red-500">Law Entrance</a></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-500">
            Connect With Us
          </h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-red-500 hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-red-500 hover:text-black transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-red-500 hover:text-black transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-red-500 hover:text-black transition">
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm text-gray-800">📍 New Delhi, India</p>
          <p className="text-sm text-gray-800">📞 +91 9876543210</p>
          <p className="text-sm text-gray-800">📧 info@oneroofedu.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} One Roof Education. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
