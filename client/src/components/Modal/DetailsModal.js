// src/components/Modal/DetailsModal.js
import React from 'react';
import { Eye, X } from 'lucide-react';

const DetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 sm:mx-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Eye size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Admin User Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={`/Uploads/${user.image}`}
                alt={`${user.username}'s avatar`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500">Username</p>
              <p className="text-lg font-semibold text-gray-900">{user.username}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-gray-900">#{user.id}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className={`text-gray-900 font-medium ${user.active !== false ? 'text-green-600' : 'text-red-600'}`}>
              {user.active !== false ? 'Active' : 'Inactive'}
            </p>
          </div>

          {/* Add more fields if available */}
          {user.email && (
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          )}
          {user.role && (
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-gray-900">{user.role}</p>
            </div>
          )}
          {user.created_at && (
            <div>
              <p className="text-sm font-medium text-gray-500">Created At</p>
              <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;