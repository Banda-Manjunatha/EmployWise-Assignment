import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );

      // Filter out previously deleted users
      const filteredUsers = response.data.data.filter(
        (user) => !deletedUserIds.includes(user.id)
      );

      // Apply any previous updates to the fetched users
      const processedUsers = filteredUsers.map((user) => ({
        ...user,
        ...updatedUsers[user.id],
      }));

      setUsers(processedUsers);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtered users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const lowercasedSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowercasedSearch) ||
        user.last_name.toLowerCase().includes(lowercasedSearch) ||
        user.email.toLowerCase().includes(lowercasedSearch)
    );
  }, [users, searchTerm]);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="mb-2">Are you sure you want to delete this user?</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                // Remove the user from the current page's list
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);

                // Track the deleted user's ID
                setDeletedUserIds((prevDeletedIds) => [...prevDeletedIds, id]);

                toast.dismiss(t.id);
                toast.success("User deleted successfully");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    // Update local state
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);

    // Persist the update across page changes
    setUpdatedUsers((prev) => ({
      ...prev,
      [editingUser.id]: {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
      },
    }));

    toast.success("User updated successfully");
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen relative">
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            {filteredUsers.length} result{filteredUsers.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Modal for editing user */}
      {editingUser && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-2xl">
            <h3 className="text-2xl mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                value={editingUser.first_name}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    first_name: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                value={editingUser.last_name}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    last_name: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    email: e.target.value,
                  })
                }
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdateUser}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl text-center font-semibold">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-center text-gray-400 mb-4">{user.email}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleEditUser(user)}
                className="text-blue-400 hover:text-blue-600"
              >
                <FaEdit className="text-2xl" />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-400 hover:text-red-600"
              >
                <FaTrash className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show message when no users match search */}
      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No users found matching your search.
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center"
        >
          <FaChevronLeft className="mr-2" /> Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center"
        >
          Next <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default UserList;
