import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 border-t border-gray-800" : "bg-gray-900"
      } text-white pt-16 pb-8`}
    >
      <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-10">
          {/* Address section - first on all devices */}
          <div className="space-y-4 order-1">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-center lg:text-left">
              Address
            </h3>
            <p className="text-gray-300 leading-relaxed text-center lg:text-left">
              Engineering and Architecture Division
              <br />
              Room No: B5-203, Vindhya C6, VLEAD
              <br />
              IIIT-H, Gachibowli, Hyderabad - 500032
            </p>
          </div>
        
          {/* Follow Us section - second on desktop, last on mobile */}
          <div className="space-y-4 order-3 md:order-2">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-center">
              Follow Us
            </h3>
            <div className="flex space-x-4 justify-center align-center">
              <a
                href="https://www.facebook.com/vlead.iiithyd"
                className="h-10 w-10 rounded-full bg-blue-600/90 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://twitter.com/TheVirtualLabs"
                className="h-10 w-10 rounded-full bg-blue-400/90 flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.youtube.com/@virtual-lab-experiments-ii4780"
                className="h-10 w-10 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://www.linkedin.com/in/virtual-labs-008ba9136"
                className="h-10 w-10 rounded-full bg-blue-700/90 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="https://www.instagram.com/thevirtuallabs?igsh=dWdsdWl0aHczNTkx"
                className="h-10 w-10 rounded-full bg-pink-600/90 flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        
          {/* Contact section - third on desktop, second on mobile */}
          <div className="space-y-4 order-2 md:order-3">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-center lg:text-right">
              Contact
            </h3>
            <div className="text-gray-300 space-y-2">
              <p className="flex items-start justify-center md:justify-end">
                <span className="text-center lg:text-right">
                  General Information: 011-64674687
                  <br />
                  Development/Outreach: +91-9177792945
                  <br />
                  Email: support@vlabs.ac.in
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12zm0 1a1 1 0 011 1v4.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 019 10V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">AGPL 3.0</span>
            </a>

            <span className="text-gray-600 mx-2 hidden sm:inline">•</span>

            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                Creative Commons (CC BY-NC-SA 4.0)
              </span>
            </a>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Virtual Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
