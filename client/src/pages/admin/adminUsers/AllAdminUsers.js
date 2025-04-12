// src/components/AllAdminUsers.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hoc from '../../../components/dashboardCompo/Hoc';
import DeleteModal from '../../../components/Modal/DeleteModal';
import DetailsModal from '../../../components/Modal/DetailsModal';
import {
  UserPlus,
  Pencil,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  XCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Settings,
  Calendar,
  Eye,
  Download,
  SlidersHorizontal,
} from 'lucide-react';

const getAdminUserAPI = process.env.REACT_APP_GET_ADMIN_USER_API;
const deleteAdminUserAPI = process.env.REACT_APP_DELETE_ADMIN_USER_API;

const AllAdminUsers = () => {
  const [adminUsersData, setAdminUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (adminUsersData.length > 0) {
      let filtered = adminUsersData.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toString().includes(searchTerm)
      );

      // Apply status filter if not "all"
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active';
        filtered = filtered.filter((user) => (user.active !== false) === isActive);
      }

      setFilteredUsers(filtered);
    }
  }, [searchTerm, adminUsersData, statusFilter]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getAdminUserAPI);
      setAdminUsersData(res.data.results);
      setFilteredUsers(res.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${deleteAdminUserAPI}/${selectedUserId}`);
      toast.success('Admin user deleted successfully!');
      setModalOpen(false);
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sortedData);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? (
        <ChevronUp size={16} className="inline" />
      ) : (
        <ChevronDown size={16} className="inline" />
      );
    }
    return null;
  };

  const toggleStatus = (userId) => {
    setAdminUsersData(
      adminUsersData.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };

  const renderEmptyState = () => (
    <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
      <div className="text-center">
        <XCircle size={48} className="mx-auto text-gray-400" />
        <p className="mt-4 text-gray-600 font-medium">No admin users found</p>
        <p className="text-gray-500 text-sm mt-1 mb-4">
          Try adjusting your search or add a new admin user
        </p>
        <NavLink to="/admin/addadmin">
          <button className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
            <UserPlus size={18} />
            <span>Add Admin</span>
          </button>
        </NavLink>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-t-2 border-r-2 border-blue-600 animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading admin users...</p>
      </div>
    </div>
  );

  // Integrated table with search directly in the header
  const renderIntegratedTable = () => (
    <div className="flex-1 overflow-hidden bg-white rounded-xl shadow-sm">
      {/* Integrated search and table header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="p-4 border-b flex flex-wrap items-center gap-4 justify-between bg-[#F1F3FF]">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search by username or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm('')}
              >
                <XCircle size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-400 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <SlidersHorizontal size={16} />
                <span>Filter</span>
                <ChevronDown size={16} className={filterMenuOpen ? 'transform rotate-180' : ''} />
              </button>

              {filterMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-3">
                    <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          checked={statusFilter === 'all'}
                          onChange={() => setStatusFilter('all')}
                          className="text-blue-600"
                        />
                        <span>All</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          checked={statusFilter === 'active'}
                          onChange={() => setStatusFilter('active')}
                          className="text-blue-600"
                        />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          checked={statusFilter === 'inactive'}
                          onChange={() => setStatusFilter('inactive')}
                          className="text-blue-600"
                        />
                        <span>Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* View switcher */}
            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('table')}
              >
                <Settings size={16} />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 border-b flex justify-between items-center bg-white text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span>Total: {adminUsersData.length} users</span>
            <span className="mx-2">|</span>
            <span>Showing: {filteredUsers.length} results</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
              <Download size={16} />
              <span>Export</span>
            </button>
            <span className="mx-2">|</span>
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table Header */}
        <table className="w-full table-fixed text-sm text-left">
          <thead>
            <tr className="bg-[#4F46E5]">
              <th
                className="px-6 py-2 w-1/6 cursor-pointer hover:bg-blue-700 text-white transition-colors font-medium"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-2">
                  ID {getSortIndicator('id')}
                </div>
              </th>
              <th className="px-6 py-2 w-1/6 font-medium text-white">Profile</th>
              <th
                className="px-6 py-2 w-1/3 cursor-pointer hover:bg-blue-700 text-white transition-colors font-medium"
                onClick={() => handleSort('username')}
              >
                <div className="flex items-center gap-2">
                  Username {getSortIndicator('username')}
                </div>
              </th>
              <th className="px-6 py-2 w-1/6 text-center font-medium text-white">Status</th>
              <th className="px-6 py-2 w-1/6 text-center font-medium text-white">Actions</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto max-h-[calc(100vh-380px)]">
        <table className="w-full table-fixed text-sm text-left">
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-b-0 hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4 w-1/6 font-medium text-gray-900">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                    #{user.id}
                  </span>
                </td>
                <td className="px-6 py-4 w-1/6">
                  {user.image ? (
                    <img
                      src={`/Uploads/${user.image}`}
                      alt={`${user.username}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 w-1/3 font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 w-1/6">
                  <div className="flex justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={user.active !== false}
                        onChange={() => toggleStatus(user.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-2 text-xs font-medium text-gray-500">
                        {user.active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 w-1/6">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      aria-label="View details"
                      title="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <NavLink to={`/admin/updateadmin/${user.id}`}>
                      <button
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        aria-label="Edit"
                        title="Edit user"
                      >
                        <Pencil size={18} />
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      aria-label="Delete"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto max-h-[calc(100vh-380px)]">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="flex flex-col items-center text-center mb-4">
            {user.image ? (
              <img
                src={`/Uploads/${user.image}`}
                alt={`${user.username}'s avatar`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md mb-3"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md mb-3">
                <span className="text-white text-xl font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mt-1">
              ID #{user.id}
            </span>
          </div>

          <div className="flex justify-center mt-3 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={user.active !== false}
                onChange={() => toggleStatus(user.id)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-500">
                {user.active !== false ? 'Active' : 'Inactive'}
              </span>
            </label>
          </div>

          <div className="flex justify-center space-x-3 pt-3 border-t">
            <button
              onClick={() => handleViewDetails(user)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              aria-label="View details"
              title="View details"
            >
              <Eye size={18} />
            </button>
            <NavLink to={`/admin/updateadmin/${user.id}`}>
              <button
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                aria-label="Edit"
                title="Edit user"
              >
                <Pencil size={18} />
              </button>
            </NavLink>
            <button
              onClick={() => handleDelete(user.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              aria-label="Delete"
              title="Delete user"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Toggle view for content outside filter menu
  const handleOutsideClick = (e) => {
    if (filterMenuOpen && !e.target.closest('.filter-menu')) {
      setFilterMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [filterMenuOpen]);

  return (
    <>
      <Hoc />
      <section id="content" className="bg-[#EEEEEE] flex flex-col" onClick={handleOutsideClick}>
        <main className="container mx-auto p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
          {/* Header Panel */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-4 shadow-md">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Users</h1>
                  <p className="text-gray-500">Manage system administrators</p>
                </div>
              </div>

              <NavLink to="/admin/addadmin">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-2 rounded-lg shadow-md transition-all">
                  <UserPlus size={18} />
                  <span>Add Admin</span>
                </button>
              </NavLink>
            </div>
          </div>

          {/* Content Area with merged search and table */}
          <div className="flex-1 overflow-hidden rounded-xl">
            {isLoading ? (
              renderLoadingState()
            ) : filteredUsers.length === 0 ? (
              renderEmptyState()
            ) : viewMode === 'table' ? (
              renderIntegratedTable()
            ) : (
              renderGridView()
            )}
          </div>
        </main>
      </section>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        fieldName={'Admin User'}
      />

      <DetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        user={selectedUser}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AllAdminUsers;