import React from "react";
import { ShieldCheck, FileText, Lock, Globe, Mail, User, Bell, Fingerprint } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      {/* Hero Banner - Full Width */}
      <div className="w-full bg-gray-400 text-white py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <ShieldCheck className="w-12 h-12 mr-4" />
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
              </div>
              <p className="mt-4 text-blue-100 text-lg">Protecting your data is our priority</p>
            </div>
            <div className="bg-blue-600 px-6 py-3 rounded-lg shadow-lg">
              <p className="text-sm text-blue-100">Last Updated: March 5, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections - Full Width with contained content */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Introduction Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Introduction</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                Welcome to our E-commerce Platform. We are committed to protecting
                your personal information and ensuring your privacy. This policy
                explains how we collect, use, and safeguard your data while providing
                you with the best shopping experience possible.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex">
                <div className="mr-4">
                  <User className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Personal Details</h3>
                  <p className="text-gray-600">
                    We collect personal identification information including your name, email address, and phone number to process your orders and provide customer support.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex">
                <div className="mr-4">
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Shipping Information</h3>
                  <p className="text-gray-600">
                    Your billing and shipping addresses are collected to ensure accurate delivery and payment processing for purchased items.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex">
                <div className="mr-4">
                  <Lock className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Payment Data</h3>
                  <p className="text-gray-600">
                    Payment information is processed securely through encrypted channels and stored according to industry standards.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex">
                <div className="mr-4">
                  <Fingerprint className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Device Information</h3>
                  <p className="text-gray-600">
                    We collect device and browsing information to improve site performance and enhance your shopping experience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Data Protection Measures</h2>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-800 mb-2">Encryption</h3>
                  <p className="text-gray-600">
                    All personal data is encrypted using advanced SSL technology to ensure maximum security.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-800 mb-2">Access Control</h3>
                  <p className="text-gray-600">
                    Strict access controls limit data visibility to authorized personnel only.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-blue-800 mb-2">Monitoring</h3>
                  <p className="text-gray-600">
                    24/7 security monitoring to detect and prevent unauthorized access attempts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights Section */}
          <section>
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Your Rights</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Right to Access</h3>
                    <p className="text-gray-600">You have the right to access all personal information we have collected about you.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Right to Delete</h3>
                    <p className="text-gray-600">You can request complete deletion of your personal data from our systems.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Right to Opt-Out</h3>
                    <p className="text-gray-600">You can opt-out of marketing communications at any time.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Right to Correct</h3>
                    <p className="text-gray-600">You can request corrections to any inaccurate personal information we hold.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

       
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicyPage;