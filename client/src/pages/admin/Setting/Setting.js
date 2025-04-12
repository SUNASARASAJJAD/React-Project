import { useState } from "react";
import {
  FiSettings,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiCreditCard,
  FiTruck,
  FiBell,
  FiLock,
  FiPieChart,
} from "react-icons/fi";
import Hoc from "../../../components/dashboardCompo/Hoc";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    // General Settings
    storeName: "FashionHub",
    storeEmail: "admin@fashionhub.com",
    storePhone: "+1 (555) 123-4567",
    currency: "USD",
    timezone: "America/New_York",
    maintenanceMode: false,

    // Product Settings
    inventoryThreshold: 10,
    productApproval: "auto",
    allowReviews: true,

    // Payment Settings
    paymentMethods: ["credit_card", "paypal"],
    stripeEnabled: true,
    paypalEnabled: true,
    taxRate: 8.25,

    // Shipping Settings
    shippingZones: ["domestic", "international"],
    freeShippingThreshold: 50,
    shippingOrigin: {
      country: "United States",
      state: "California",
      zipCode: "90210",
    },

    // Notification Settings
    emailNotifications: true,
    adminNotifications: ["orders", "reviews", "refunds"],
    customerNotifications: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (field, value, action) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      if (action === "add" && !newArray.includes(value)) {
        newArray.push(value);
      } else if (action === "remove") {
        const index = newArray.indexOf(value);
        if (index > -1) newArray.splice(index, 1);
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", formData);
    // Add your API call here
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed HOC at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Hoc />
      </div>

      {/* Main content with padding to account for fixed HOC */}
      <div className="flex-1 pt-16 overflow-auto bg-[#EEEEEE] p-4 md:p-8 mt-14">
        <div className="max-w-6xl mx-auto ml-60">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Store Settings
              </h1>
              <p className="text-gray-600">
                Manage your online store configuration
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("general")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "general"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiSettings className="mr-2" /> General
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "products"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiBox className="mr-2" /> Products
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "payments"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiCreditCard className="mr-2" /> Payments
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "shipping"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiTruck className="mr-2" /> Shipping
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "notifications"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiBell className="mr-2" /> Notifications
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "security"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiLock className="mr-2" /> Security
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === "analytics"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiPieChart className="mr-2" /> Analytics
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Store Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        name="storeEmail"
                        value={formData.storeEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="storePhone"
                        value={formData.storePhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center h-10">
                        <input
                          id="maintenance-mode"
                          name="maintenanceMode"
                          type="checkbox"
                          checked={formData.maintenanceMode}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="maintenance-mode"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Maintenance Mode
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Regional Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                        <option value="JPY">Japanese Yen (JPY)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="America/New_York">
                          Eastern Time (ET)
                        </option>
                        <option value="America/Chicago">
                          Central Time (CT)
                        </option>
                        <option value="America/Denver">
                          Mountain Time (MT)
                        </option>
                        <option value="America/Los_Angeles">
                          Pacific Time (PT)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Settings */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Inventory Management
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        name="inventoryThreshold"
                        value={formData.inventoryThreshold}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Get notified when inventory drops below this number
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Product Options
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Approval
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="auto-approval"
                            name="productApproval"
                            type="radio"
                            checked={formData.productApproval === "auto"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                productApproval: "auto",
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label
                            htmlFor="auto-approval"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Auto-approve new products
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="manual-approval"
                            name="productApproval"
                            type="radio"
                            checked={formData.productApproval === "manual"}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                productApproval: "manual",
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label
                            htmlFor="manual-approval"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Manual approval required
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="allow-reviews"
                        name="allowReviews"
                        type="checkbox"
                        checked={formData.allowReviews}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="allow-reviews"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Allow customer reviews
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="credit-card"
                        type="checkbox"
                        checked={formData.paymentMethods.includes(
                          "credit_card"
                        )}
                        onChange={(e) =>
                          handleArrayChange(
                            "paymentMethods",
                            "credit_card",
                            e.target.checked ? "add" : "remove"
                          )
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="credit-card"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Credit/Debit Cards
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paypal"
                        type="checkbox"
                        checked={formData.paymentMethods.includes("paypal")}
                        onChange={(e) =>
                          handleArrayChange(
                            "paymentMethods",
                            "paypal",
                            e.target.checked ? "add" : "remove"
                          )
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Tax Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="taxRate"
                          value={formData.taxRate}
                          onChange={handleInputChange}
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Shipping Zones
                  </h2>
                  <div className="space-y-2">
                    {["domestic", "international"].map((zone) => (
                      <div key={zone} className="flex items-center">
                        <input
                          id={zone}
                          type="checkbox"
                          checked={formData.shippingZones.includes(zone)}
                          onChange={(e) =>
                            handleArrayChange(
                              "shippingZones",
                              zone,
                              e.target.checked ? "add" : "remove"
                            )
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={zone}
                          className="ml-2 block text-sm text-gray-700 capitalize"
                        >
                          {zone}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Shipping Options
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Free Shipping Threshold ($)
                      </label>
                      <input
                        type="number"
                        name="freeShippingThreshold"
                        value={formData.freeShippingThreshold}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Set to 0 to disable free shipping
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Shipping Origin
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.shippingOrigin.country}
                        onChange={(e) =>
                          handleNestedChange(
                            "shippingOrigin",
                            "country",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Region
                      </label>
                      <input
                        type="text"
                        value={formData.shippingOrigin.state}
                        onChange={(e) =>
                          handleNestedChange(
                            "shippingOrigin",
                            "state",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.shippingOrigin.zipCode}
                        onChange={(e) =>
                          handleNestedChange(
                            "shippingOrigin",
                            "zipCode",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Email Notifications
                  </h2>
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="email-notifications"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Enable email notifications
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Admin Notifications
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    Select which notifications admins should receive
                  </p>
                  <div className="space-y-2">
                    {[
                      "orders",
                      "reviews",
                      "refunds",
                      "inventory",
                      "customers",
                    ].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          id={`admin-${type}`}
                          type="checkbox"
                          checked={formData.adminNotifications.includes(type)}
                          onChange={(e) =>
                            handleArrayChange(
                              "adminNotifications",
                              type,
                              e.target.checked ? "add" : "remove"
                            )
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`admin-${type}`}
                          className="ml-2 block text-sm text-gray-700 capitalize"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Customer Notifications
                  </h2>
                  <div className="flex items-center">
                    <input
                      id="customer-notifications"
                      type="checkbox"
                      name="customerNotifications"
                      checked={formData.customerNotifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="customer-notifications"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Send order status updates to customers
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
