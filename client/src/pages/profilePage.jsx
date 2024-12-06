import React, { useState } from "react";
import userimage from "../assets/freepik__candid-image-photography-natural-textures-highly-r__40109.jpeg";
import icon1 from "../assets/devicon_google.svg";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Shailesh Kale",
    email: "Shaileshkale87730@gmail.com",
  });

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setProfile({
      name: formData.get("name"),
      email: formData.get("email"),
    });
    setIsEditModalOpen(false);
  };

  const tasks = [
    {
      label: "Palindrome Check",
      technology: "Python",
      difficulty: "Easy",
      description:
        "Write a Python function to check if a given string is a palindrome.",
      tags: ["strings", "algorithms"],
      completion_time: "15 minutes",
    },
  ];

  return (
    <div className="md:h-[83.9vh] h-full flex justify-center items-center">
      <div className="flex md:flex-row flex-col w-full h-full">
        {/* Left Profile Panel */}
        <div className="md:w-[20%] w-full md:border md:border-black flex flex-col items-center">
          <div className="m-8">
            <img
              src={userimage}
              alt="user"
              className="w-52 h-52 rounded-full object-cover"
            />
          </div>
          <Heading heading_type="h1" heading={profile.name} style="text-2xl" />
          <Heading heading_type="h3" heading={profile.email} />
          <div className="mt-3 flex flex-row gap-5 justify-center">
            {[...Array(4)].map((_, i) => (
              <Link to="https://www.google.com/" key={i}>
                <img src={icon1} alt={`icon-${i}`} className="w-6" />
              </Link>
            ))}
          </div>
        </div>

        {/* Task Table */}
        <div className="md:w-[80%] w-full">
          <div className="flex md:justify-end justify-center md:mt-2 mt-5 md:mb-0  mb-4 mr-3">
            <Button label="Edit Profile" onClick={handleEditClick} />
          </div>
          <div className="overflow-x-auto w-full mt-2 px-6">
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  {[
                    "Title",
                    "Technology",
                    "Difficulty",
                    "Description",
                    "Tags",
                    "Completion Time",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <tr key={i}>
                      {Object.values(task).map((value, idx) => (
                        <td
                          key={idx}
                          className="border border-gray-300 px-4 py-2">
                          {Array.isArray(value) ? value.join(", ") : value}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colSpan="6">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profile.name}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md bg-gray-200"
                  onClick={handleCloseModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border rounded-md bg-blue-500 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
