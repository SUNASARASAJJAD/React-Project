import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 text-sm pt-12 pb-8 px-6 z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center lg:justify-between w-full max-w-6xl gap-8 mb-8">
          {/* Account Section */}
          <div className="flex-1 min-w-[200px]  space-y-4">
            <h4 className="text-lg font-semibold text-white border-b-2 border-blue-500 inline-block pb-2">
              Account
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/myaccount" className="hover:text-blue-400">
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-blue-400">
                  Login / Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-blue-400">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/watchlist" className="hover:text-blue-400">
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink to="/allproduct" className="hover:text-blue-400">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="flex-1 min-w-[200px]  space-y-4">
            <h4 className="text-lg font-semibold text-white border-b-2 border-blue-500 inline-block pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/privacypolicy" className="hover:text-blue-400">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/termsofuse" className="hover:text-blue-400">
                  Terms of Use
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="hover:text-blue-400">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-blue-400">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 min-w-[200px]  space-y-4">
            <h4 className="text-lg font-semibold text-white border-b-2 border-blue-500 inline-block pb-2">
              Social Media Links
            </h4>
            <ul className="space-y-2  flex gap-x-6 items-center">
              <li>
                <NavLink
                  to="https://www.facebook.com/profile.php?id=61573044939989"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.instagram.com/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://github.com/saad-nandoliya"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <i className="fab fa-github text-xl"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://in.linkedin.com/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-500 transition"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </NavLink>
              </li>
            </ul>
          </div>
           {/* Support Section */}
           
           <div className="flex-1 min-w-max space-y-4 ">
            <h4 className="text-lg font-semibold text-white border-b-2 border-blue-500 inline-block pb-2">
              Support
            </h4>

            <div className="space-y-2  gap-x-6">
              <div className="flex items-start ">
                <svg
                  className="w-8 h-8 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>
                  Orchid Complex, C-111/C-112, <br /> Highway, opp. HDFC Bank,
                  Chhapi,
                  <br /> Gujarat 385210
                </p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p>+91 9875101057</p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p>sunasarasajjad94@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-8 text-center w-full">
          <p>&copy; 2025 Exclusive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
