// Import necessary React modules
import React from "react";

// 404 Page Component
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      {/* Animated Text */}
      <h1
        className="text-9xl font-extrabold text-gray-600 animate-bounce"
        style={{ animationDuration: "1.5s" }}>
        404
      </h1>
      {/* Message */}
      <p className="text-2xl md:text-3xl font-medium mb-4">
        Oops! The page you are looking for doesn't exist.
      </p>
      {/* Subtext */}
      <p className="text-lg text-gray-500 mb-8">
        It might have been moved or deleted.
      </p>
      {/* Go Back Button */}
      <a
        href="/"
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
