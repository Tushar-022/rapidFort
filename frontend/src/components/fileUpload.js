import React, { useState } from "react";
import { uploadFile, downloadPDF } from "../services/api"; // API to handle file upload
import Metadata from "./metaData"; // Component to display metadata

function FileUpload({downloadLink,setDownloadLink}) {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError("");
    setDownloadLink(null); // Reset download link
    setMetadata(null); // Reset metadata
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB size limit
      setError("File size exceeds the 5MB limit.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Upload the file and get its metadata
      const response = await uploadFile(file);
    
      setMetadata(response.metadata); // Set metadata from response

      // Fetch download link for the converted file
      setDownloadLink(await downloadPDF(response.fileId)); // Set the PDF download link

      setFile(null); // Clear the file input
    } catch (err) {
      console.error("Error in Downloading file:", err);
      setError("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-sm">
      {/* File Input */}
      <label className="block">
        <input
          type="file"
          accept=".doc, .docx"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="bg-red-600 text-white p-4 rounded cursor-pointer hover:bg-red-700"
        >
          Select WORD files
        </label>
      </label>
      <p className="p-2 mt-4 text-gray-500">Drop WORD documents here</p>

      {/* Upload Button */}
      <button
  onClick={handleUpload}
  className={`m-4 
    ${isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
    text-black py-2 px-4 rounded`}
  disabled={isUploading}
>
  {isUploading ? "Downloading..." : "Upload"}
</button>


    

     

      {/* Error Message */}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* Metadata Display */}
      {metadata && <Metadata metadata={metadata} />}
    </div>
  );
}

export default FileUpload;
