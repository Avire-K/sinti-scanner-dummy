"use client"


import { useState } from "react";

export default function Home() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleRequest = async () => {
    try {
      const response = await fetch("http://192.168.137.108:5000");
      if (!response.ok) throw new Error("Server responded with an error");

      const data = await response.json();
      setResponseData(data);
      setError(null);  // Clear previous errors
    } catch (err) {
      setError(err); // Convert Error object to a string
      setResponseData(null); // Clear previous data
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={handleRequest}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
      >
        Fetch Data from Server
      </button>

      {responseData && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold">Response:</h3>
          <pre className="text-sm text-gray-700">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
