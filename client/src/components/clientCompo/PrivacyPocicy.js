

import React from "react";
import { ShieldCheck, FileText, Lock, Globe } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-6 px-0 sm:px-0 lg:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white py-8 px-6">
          <div className="flex items-center">
            <ShieldCheck className="w-12 h-12 mr-4" />
            <h1 className="text-3xl font-bold">Privacy & Policy</h1>
          </div>
          <p className="mt-4 text-blue-100">Last Updated: March 5, 2025</p>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our E-commerce Platform. We are committed to protecting
              your personal information and ensuring your privacy. This policy
              explains how we collect, use, and safeguard your data.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
              <Globe className="w-6 h-6 mr-2 text-blue-600" />
              Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Personal identification information (Name, email, phone number)
              </li>
              <li>Billing and shipping addresses</li>
              <li>
                Payment information (processed securely through encrypted
                channels)
              </li>
              <li>Order history and preferences</li>
              <li>Device and browsing information</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
              <Lock className="w-6 h-6 mr-2 text-blue-600" />
              Data Protection Measures
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Encryption</h3>
                <p className="text-gray-600">
                  All personal data is encrypted using advanced SSL technology.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Access Control
                </h3>
                <p className="text-gray-600">
                  Strict access controls limit data visibility to authorized
                  personnel only.
                </p>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Rights
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>• Right to access your personal information</li>
                <li>• Right to request data deletion</li>
                <li>• Right to opt-out of marketing communications</li>
                <li>• Right to correct inaccurate personal information</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center text-gray-600">
          © 2025 Our E-commerce Platform. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
