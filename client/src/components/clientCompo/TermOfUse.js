import React from 'react';
import { FileText, ShieldCheck, Globe, CreditCard } from 'lucide-react';

const TermsOfUsePage = () => {
  const sections = [
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Acceptance of Terms",
      content: "By accessing and using our website, you agree to be bound by these Terms of Use. We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of any changes."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: "Purchases and Payments",
      content: "All purchases are subject to product availability. Prices are displayed in the local currency and are subject to change without notice. We accept major credit cards and approved payment methods. Your payment information is encrypted and securely processed."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-purple-500" />,
      title: "Privacy and Security",
      content: "We are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and safeguard your data. We implement industry-standard security measures to protect against unauthorized access."
    }
  ];

  const additionalTerms = [
    "Use of the website constitutes agreement to our terms",
    "All content is protected by copyright laws",
    "Prohibited from using site for illegal activities",
    "We may terminate access for violation of terms",
    "User is responsible for maintaining account confidentiality"
  ];

  return (
    <div className="min-h-screen py-6 px-0 sm:px-0 lg:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-lg overflow-hidden">
        {/* Page Header */}
        <div className="bg-blue-600 text-white py-8 px-6 text-center">
          <FileText className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold">Terms of Use</h1>
          <p className="mt-3 text-xl text-blue-100">
            Last Updated: March 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-12">
          {/* Key Sections */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Key Terms
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {section.icon}
                    <h3 className="ml-4 text-xl font-semibold text-gray-800">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
              Additional Terms
            </h2>
            <ul className="space-y-4 bg-gray-50 p-6 rounded-lg">
              {additionalTerms.map((term, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-700"
                >
                  <svg 
                    className="h-5 w-5 text-blue-500 mr-3" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {term}
                </li>
              ))}
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <section className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              Legal Disclaimer
            </h3>
            <p className="text-red-700">
              These terms are subject to change. Users are encouraged to review terms periodically. 
              In case of any disputes, the latest published terms will be considered valid.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 py-6 px-8 text-center text-gray-600">
          <p>© 2024 Our E-commerce Store. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;