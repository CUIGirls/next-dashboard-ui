"use client";
// components/ProfilePage.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@arctic.com",
    phone: "+47 988 86 066",
    password: "password123", // Example password
  });

  const handleEditClick = () => setIsEditing(true);
  const handleProfileImageClick = () => setIsUploadOpen(true); // Open upload form
  const handleUploadClose = () => setIsUploadOpen(false); // Close upload form
  const handleSave = () => setIsEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload here
    alert("File upload functionality not implemented.");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-screen w-screen flex flex-col">
      <div className="flex items-center">
        <div className="relative">
          <img
            src="/avatar.png"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <button
            onClick={handleProfileImageClick}
            className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </button>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-semibold">
            `${profile.firstName} ${profile.lastName}`
          </h2>
          <span className="text-gray-500">Accountant</span>
        </div>
        <div className="ml-4 flex-shrink-0 flex items-center">
          <button
            onClick={handleEditClick}
            className="flex items-center text-blue-500"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="mr-1" />
            Edit Information
          </button>
        </div>
      </div>

      <div className="mt-6 flex-1 overflow-auto">
        {isEditing ? (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Email*</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Surname*</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-600 mb-2">Password</label>
              <input
                type="text"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-gray-600">First Name:</span>
              <span>{profile.firstName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Surname:</span>
              <span>{profile.lastName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Phone:</span>
              <span>{profile.phone}</span>
            </div>
            <div className="flex flex-col md:col-span-2">
              <span className="text-gray-600">Password:</span>
              <span>{profile.password}</span>
            </div>
          </div>
        )}
      </div>

      {/* Upload Form Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Upload Profile Picture
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              type="button"
              onClick={handleUploadClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
