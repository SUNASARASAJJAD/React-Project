  import React from 'react';
  import { FileText, ShieldCheck, Globe, CreditCard, AlertTriangle, Check, Book, FileWarning, Eye, ScrollText, User, Lock } from 'lucide-react';
  import { jsPDF } from 'jspdf';

  const TermsOfUsePage = () => {
    const sections = [
      {
        icon: <Globe className="h-8 w-8 text-white" />,
        bgColor: "bg-blue-600",
        title: "Acceptance of Terms",
        content: "By accessing and using our website, you agree to be bound by these Terms of Use. We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of any changes."
      },
      {
        icon: <CreditCard className="h-8 w-8 text-white" />,
        bgColor: "bg-green-600",
        title: "Purchases and Payments",
        content: "All purchases are subject to product availability. Prices are displayed in the local currency and are subject to change without notice. We accept major credit cards and approved payment methods. Your payment information is encrypted and securely processed."
      },
      {
        icon: <ShieldCheck className="h-8 w-8 text-white" />,
        bgColor: "bg-purple-600",
        title: "Privacy and Security",
        content: "We are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and safeguard your data. We implement industry-standard security measures to protect against unauthorized access."
      },
      {
        icon: <User className="h-8 w-8 text-white" />,
        bgColor: "bg-indigo-600",
        title: "User Accounts",
        content: "You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account."
      },
      {
        icon: <Eye className="h-8 w-8 text-white" />,
        bgColor: "bg-amber-600",
        title: "Intellectual Property",
        content: "All content on this website including text, graphics, logos, icons, images, and software is the property of our company and is protected by copyright laws. Unauthorized use may violate copyright and other laws."
      },
      {
        icon: <Lock className="h-8 w-8 text-white" />,
        bgColor: "bg-red-600",
        title: "Limitations of Liability",
        content: "We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website. We provide the site and its contents 'as is' without warranties of any kind."
      }
    ];

    const additionalTerms = [
      "Use of the website constitutes agreement to our terms",
      "All content is protected by copyright laws",
      "Prohibited from using site for illegal activities",
      "We may terminate access for violation of terms",
      "User is responsible for maintaining account confidentiality",
      "Account sharing is strictly prohibited",
      "We reserve the right to modify or discontinue services",
      "User-generated content may be monitored or removed"
    ];

    const legalDisclaimer = "These terms are subject to change without prior notice. Users are encouraged to review terms periodically. In case of any disputes, the latest published terms will be considered valid and binding. The information provided on this website is for general informational purposes only and should not be considered as legal advice.";

    const handleDownloadPDF = () => {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let y = margin;
    
      // टाइटल के लिए ग्रेडिएंट बैकग्राउंड
      doc.setFillColor(25, 93, 194); // Blue-700 color
      doc.rect(margin - 5, y - 5, maxWidth + 10, 15, 'F');
      
      // टाइटल
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Terms of Use", margin, y);
      y += 15;
    
      // लास्ट अपडेटेड
      doc.setTextColor(0, 0, 0); // Reset to black
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Last Updated: March 2024", margin, y);
      y += 15;
    
      // सेक्शन - की टर्म्स एंड कंडीशंस
      doc.setFillColor(31, 41, 55); // Gray-800
      doc.setTextColor(255, 255, 255);
      doc.roundedRect(margin - 5, y - 5, maxWidth + 10, 12, 2, 2, 'F');
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Key Terms & Conditions", margin, y);
      doc.setTextColor(0, 0, 0); // Reset to black
      y += 15;
    
      // Color mapping for sections
      const sectionColors = {
        "bg-blue-600": [37, 99, 235],      // blue-600
        "bg-green-600": [22, 163, 74],     // green-600
        "bg-purple-600": [147, 51, 234],   // purple-600
        "bg-indigo-600": [79, 70, 229],    // indigo-600
        "bg-amber-600": [217, 119, 6],     // amber-600
        "bg-red-600": [220, 38, 38]        // red-600
      };
    
      sections.forEach((section) => {
        // सेक्शन टाइटल के लिए कलर बॉक्स
        const color = sectionColors[section.bgColor] || [0, 0, 0];
        doc.setFillColor(color[0], color[1], color[2]);
        doc.roundedRect(margin - 5, y - 7, maxWidth / 3, 14, 3, 3, 'F');
        
        // सेक्शन टाइटल
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, margin, y);
        y += 12;
    
        // सेक्शन कंटेंट
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const splitContent = doc.splitTextToSize(section.content, maxWidth);
        doc.text(splitContent, margin, y);
        y += splitContent.length * 7 + 10; // कंटेंट की लंबाई के अनुसार स्पेसिंग
      });
    
      // एडिशनल टर्म्स सेक्शन
      doc.setFillColor(59, 130, 246); // Blue-500
      doc.setTextColor(255, 255, 255);
      doc.roundedRect(margin - 5, y - 5, maxWidth + 10, 12, 2, 2, 'F');
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Additional Terms", margin, y);
      doc.setTextColor(0, 0, 0);
      y += 15;
    
      additionalTerms.forEach((term) => {
        // बुलेट पॉइंट को कलरफुल बनाना
        doc.setFillColor(219, 234, 254); // Blue-100
        doc.circle(margin + 2, y - 2, 2, 'F');
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const splitTerm = doc.splitTextToSize(`• ${term}`, maxWidth);
        doc.text(splitTerm, margin, y);
        y += splitTerm.length * 7 + 5;
      });
    
      // लीगल डिस्क्लेमर सेक्शन
      doc.setFillColor(239, 68, 68); // Red-500
      doc.setTextColor(255, 255, 255);
      doc.roundedRect(margin - 5, y - 5, maxWidth + 10, 12, 2, 2, 'F');
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Legal Disclaimer", margin, y);
      doc.setTextColor(0, 0, 0);
      y += 15;
    
      // रेड बॉर्डर के साथ डिस्क्लेमर
      doc.setDrawColor(239, 68, 68); // Red-500 border
      doc.setFillColor(254, 242, 242); // Red-50 background
      doc.roundedRect(margin - 5, y - 5, maxWidth + 10, 40, 2, 2, 'FD');
      
      doc.setTextColor(185, 28, 28); // Red-700
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const splitDisclaimer = doc.splitTextToSize(legalDisclaimer, maxWidth - 10);
      doc.text(splitDisclaimer, margin, y);
      y += splitDisclaimer.length * 7 + 10;
    
      // पेज फुटर
      doc.setFillColor(243, 244, 246); // Gray-100
      doc.rect(0, doc.internal.pageSize.getHeight() - 20, pageWidth, 20, 'F');
      doc.setTextColor(107, 114, 128); // Gray-500
      doc.setFontSize(10);
      doc.text("© 2024 Company Name. All rights reserved.", margin, doc.internal.pageSize.getHeight() - 10);
    
      // Save the PDF
      doc.save("Terms_of_Use.pdf");
    };
    return (
      <div className="min-h-screen bg-[#EEEEEE]">
        {/* Hero Section - Full Width but Smaller */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto py-8 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/10 p-3 rounded-full mr-4">
                <ScrollText className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Terms of Use</h1>
                <p className="text-sm text-blue-100">
                  Please read these terms carefully before using our services
                </p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <p className="text-sm text-blue-100">Last Updated: March 2024</p>
            </div>
          </div>
        </div>
    
        {/* Key Sections - Grid Layout */}
        <div className="w-full py-6 mt-5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Key Terms & Conditions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className={`${section.bgColor} p-6`}>
                    <div className="bg-white/20 p-3 rounded-full inline-block mb-2">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Terms Section - With Backdrop */}
        <div className="w-full py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-8">
                <FileText className="h-10 w-10 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Additional Terms</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {additionalTerms.map((term, index) => (
                  <div 
                    key={index} 
                    className="flex items-start"
                  >
                    <div className="bg-blue-100 rounded-full p-1 mt-1 mr-4">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700">{term}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="w-full py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg overflow-hidden shadow-md">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
                  <h3 className="text-2xl font-bold text-red-800">
                    Legal Disclaimer
                  </h3>
                </div>
                <p className="text-red-700 leading-relaxed text-lg">
                  {legalDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Questions About Our Terms?</h2>
              <p className="text-gray-600 mt-4">Contact our legal team for clarification on any of our policies</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <FileWarning className="h-5 w-5 mr-2" />
                Contact Legal Team
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                Download Terms PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TermsOfUsePage;