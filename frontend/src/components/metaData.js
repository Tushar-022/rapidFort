import React from "react";

function Metadata({ metadata }) {
  if (!metadata) return null; // Render nothing if metadata is not available

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 mt-6 max-w-sm">
      <h2 className="text-xl font-bold text-gray-700">File Metadata</h2>
      <ul className="mt-4 text-gray-600">
        <li className="mb-2">
          <span className="font-semibold">File Name:</span> {metadata.name || "Unknown"}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Size:</span> {metadata.size || "N/A"} KB
        </li>
        <li>
          <span className="font-semibold">Uploaded At:</span> {metadata.uploadedAt || "Unknown"}
        </li>
      </ul>
    </div>
  );
}

export default Metadata;
