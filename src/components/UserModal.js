import { useState, useEffect } from "react";
import { fetchUsers, editUser } from "@/utils/api";

export default function UserModal({ userId, closeModal }) {
  const [userDetails, setUserDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const usersData = await fetchUsers(accessToken);
        const userData = usersData.find((user) => user.id === userId);
        setUserDetails(userData);
        setEditedDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await editUser(userId, editedDetails, accessToken);
      setUserDetails(editedDetails);
      closeModal(true);
      window.location.reload();
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {userDetails && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">User Details</h2>

          <div>
            <p>ID: {userDetails.id}</p>
            <p>
              First Name:{" "}
              <input
                type="text"
                name="first_name"
                value={editedDetails.first_name}
                onChange={handleEditChange}
                className="border-2 border-gray-300 p-2 rounded-md"
              />
            </p>
            <p>
              Last Name:{" "}
              <input
                type="text"
                name="last_name"
                value={editedDetails.last_name}
                onChange={handleEditChange}
                className="border-2 border-gray-300 p-2 rounded-md"
              />
            </p>
            <p>
              Username:{" "}
              <input
                type="text"
                name="username"
                value={editedDetails.username}
                onChange={handleEditChange}
                className="border-2 border-gray-300 p-2 rounded-md"
              />
            </p>
            <p>
              Email:{" "}
              <input
                type="text"
                name="email"
                value={editedDetails.email}
                onChange={handleEditChange}
                className="border-2 border-gray-300 p-2 rounded-md"
              />
            </p>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
