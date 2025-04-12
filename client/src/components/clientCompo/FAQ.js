import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, including Visa, MasterCard, and American Express. Additionally, we support payments through PayPal and Apple Pay."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location. Typically, orders are delivered within 3-5 business days for domestic orders and 7-14 business days for international orders."
    },
    {
      question: "Can I return or exchange an item?",
      answer: "Yes, we offer a 30-day return or exchange policy. Items must be unused, in their original packaging, and accompanied by a receipt. Please visit our Returns & Exchanges page for more details."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times will vary depending on the destination."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website or the shipping carrier's website."
    },
    {
      question: "What if I receive a damaged or defective item?",
      answer: "If you receive a damaged or defective item, please contact our customer support team within 7 days of receiving your order. We will gladly replace the item or issue a refund."
    },
    {
      question: "Do you offer discounts or promotions?",
      answer: "Yes, we frequently offer discounts and promotions. Be sure to subscribe to our newsletter and follow us on social media to stay updated on the latest deals."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@ecommerce.com or by calling +1 (123) 456-7890. Our team is available Monday to Friday, 9 AM to 5 PM."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@ecommerce.com or by calling +1 (123) 456-7890. Our team is available Monday to Friday, 9 AM to 5 PM."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at support@ecommerce.com or by calling +1 (123) 456-7890. Our team is available Monday to Friday, 9 AM to 5 PM."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 
          bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 
                hover:shadow-xl"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left 
                  focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="text-blue-600" size={24} />
                ) : (
                  <ChevronDown className="text-gray-500" size={24} />
                )}
              </button>
              
              {activeIndex === index && (
                <div 
                  className="px-6 py-4  text-gray-600 bg-white font-serif 
                    animate-fade-in-down"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Didn't find the answer you were looking for?
          </p>
          <a 
            href="mailto:sunasarasajjad94@gmail.com" 
            className="px-6 py-3 bg-blue-600 text-white rounded-full 
              hover:bg-blue-700 transition-colors font-semibold 
              inline-flex items-center space-x-2 shadow-md"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;