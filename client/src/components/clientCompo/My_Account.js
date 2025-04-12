import { useState, useEffect } from 'react';
import { User, ShoppingBag, Heart, Clock, CreditCard, MapPin, LogOut, Settings, ChevronRight, Bell } from 'lucide-react';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null); // State to hold dynamic user data

  // Mock data (fallback if no user is logged in)
  const defaultUser = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 2023",
    avatar: "/api/placeholder/100/100",
  };

  const recentOrders = [
    { id: '#ORD-12345', date: 'April 2, 2025', status: 'Delivered', amount: '$129.99' },
    { id: '#ORD-12342', date: 'March 28, 2025', status: 'Processing', amount: '$59.99' },
    { id: '#ORD-12339', date: 'March 15, 2025', status: 'Delivered', amount: '$89.50' },
  ];

  const wishlistItems = [
    { name: 'Wireless Earbuds', price: '$79.99', stock: 'In Stock' },
    { name: 'Smart Watch', price: '$159.99', stock: 'Low Stock' },
    { name: 'Premium Laptop Bag', price: '$49.99', stock: 'In Stock' },
  ];

  const addresses = [
    { type: 'Home', address: '123 Main Street, Apt 4B, New York, NY 10001' },
    { type: 'Work', address: '456 Business Ave, Suite 200, New York, NY 10018' },
  ];

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      // Format joinDate dynamically based on current date or API data if available
      const joinDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
      setUser({
        name: storedUser.username || "Unknown User",
        email: storedUser.email || "No email provided",
        joinDate: storedUser.joinDate || joinDate, // Use stored joinDate if available
        avatar: storedUser.picture || "https://i.pravatar.cc/100", // Default avatar if none provided
      });
    } else {
      setUser(defaultUser); // Fallback to default user if no one is logged in
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Account Overview</h3>
              <div className="flex items-center space-x-4">
                <img src={user?.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-medium text-lg">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-gray-500 text-sm">Member since {user?.joinDate}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <button 
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                  onClick={() => setActiveTab('orders')}
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Wishlist</h3>
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {wishlistItems.map((item, index) => (
                    <li key={index} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.price}</p>
                      </div>
                      <span className={`text-sm ${
                        item.stock === 'In Stock' ? 'text-green-600' : 
                        item.stock === 'Low Stock' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {item.stock}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Saved Addresses</h3>
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    onClick={() => setActiveTab('addresses')}
                  >
                    Manage <ChevronRight size={16} />
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {addresses.map((address, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-start">
                        <MapPin size={18} className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="font-medium">{address.type}</p>
                          <p className="text-gray-600 text-sm">{address.address}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Order History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...recentOrders, 
                    { id: '#ORD-12334', date: 'March 1, 2025', status: 'Delivered', amount: '$112.50' },
                    { id: '#ORD-12321', date: 'February 24, 2025', status: 'Delivered', amount: '$35.99' },
                    { id: '#ORD-12315', date: 'February 15, 2025', status: 'Cancelled', amount: '$249.99' }
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <CreditCard size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-gray-500 text-sm">Expires 12/26</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
              </div>
              
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-md mr-3">
                    <CreditCard size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Mastercard ending in 8888</p>
                    <p className="text-gray-500 text-sm">Expires 09/25</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="text-indigo-600 text-sm hover:text-indigo-800">Edit</button>
                  <button className="text-gray-500 text-sm hover:text-gray-700">Remove</button>
                </div>
              </div>
              
              <button className="mt-4 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 flex items-center">
                <CreditCard size={18} className="mr-2" />
                Add New Payment Method
              </button>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">My Addresses</h3>
            <div className="space-y-4">
              {addresses.map((address, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <MapPin size={18} className="text-gray-400 mt-1 mr-2" />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{address.type}</p>
                          {index === 0 && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button className="text-indigo-600 text-sm hover:text-indigo-800">Edit</button>
                      <button className="text-gray-500 text-sm hover:text-gray-700">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="mt-4 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 flex items-center">
                <MapPin size={18} className="mr-2" />
                Add New Address
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-3">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      defaultValue={user?.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded-md" 
                      defaultValue={user?.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full p-2 border rounded-md" 
                      defaultValue="+1 (555) 123-4567" // Replace with dynamic data if available
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3">Password</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order updates</p>
                      <p className="text-gray-500 text-sm">Receive updates on your order status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotional emails</p>
                      <p className="text-gray-500 text-sm">Receive emails about sales and new products</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex items-center justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            </div>
            <div className="flex space-x-4 items-center">
              <button className="text-gray-500 hover:text-gray-700 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-2">
                <img src={user?.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                <span className="hidden md:block font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full px-4 py-3 flex items-center text-left ${
                        activeTab === item.id 
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`mr-3 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => {
                      localStorage.clear(); // Clear localStorage on logout
                      window.location.href = "/login"; // Redirect to login
                    }} 
                    className="w-full px-4 py-3 flex items-center text-left text-red-600 hover:bg-red-50"
                  >
                    <span className="mr-3 text-red-400">
                      <LogOut size={18} />
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {user ? renderTabContent() : <div>Loading user data...</div>}
          </div>
        </div>
      </main>
    </div>
  );
}