
import { FaTruck, FaMoneyBillAlt, FaHeadset, FaShieldAlt } from "react-icons/fa";

const WhyUs = () => {
  return (
    <section className="py-16 px-4 sm:px-4 lg:px-8 max-sm:py-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12 max-sm:mb-6">
        <h2 className="text-3xl sm:text-3xl max-md:text-xl font-bold text-gray-800 mb-1">
          Why Shop With Us? 
        </h2>
        <p className="text-lg max-md:text-[14px] text-gray-600 max-w-2xl mx-auto">
          Discover the unique benefits that make us your preferred shopping destination
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Shipping */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaTruck className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FREE SHIPPING</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>

          {/* Refund */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaMoneyBillAlt className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% REFUND</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>

          {/* Support */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaHeadset className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">SUPPORT 24/7</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>

          {/* Security */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaShieldAlt className="text-3xl text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">SECURE PAYMENT</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
