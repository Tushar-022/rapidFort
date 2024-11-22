// import React, { useState } from "react";
// import { uploadFile, downloadPDF } from "../services/api"; // Assuming downloadPDF is in your api.js file
// import Metadata from "./metaData"; // Assuming Metadata component will render the file metadata

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [metadata, setMetadata] = useState(null);
//   const [error, setError] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [fileId, setFileId] = useState(null); // Store fileId for download

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError("");
//     setMetadata(null);
//     setFileId(null); // Reset fileId when a new file is selected
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("File size exceeds the 5MB limit.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       const uploadedMetadata = await uploadFile(file);
//       setMetadata(uploadedMetadata); // Assuming backend returns metadata including fileId
//       setFileId(uploadedMetadata.fileId); // Save the fileId for download
//       setFile(null);
//     } catch (err) {
//       setError("Error uploading file. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = async () => {
//     if (!fileId) {
//       setError("No file available for download.");
//       return;
//     }

//     try {
//       const downloadUrl = await downloadPDF(fileId);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.setAttribute("download", "file.pdf"); // Optional: specify file name for download
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link); // Clean up the link element
//     } catch (err) {
//       setError("Error downloading file. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-sm">
//       <label className="block">
//         <input
//           type="file"
//           accept=".doc, .docx"
//           onChange={handleFileChange}
//           className="hidden"
//           id="file-input"
//         />

//         <label
//           htmlFor="file-input"
//           className="bg-red-600 text-white p-4 rounded cursor-pointer hover:bg-red-700"
//         >
//           Select WORD files
//         </label>
//       </label>
//       <p className="p-2 mt-4 text-gray-500">Drop WORD documents here</p>

//       {/* Upload button */}
//       <button
//         onClick={handleUpload}
//         className={`m-4 ${
//           isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
//         } text-white py-2 px-4 rounded hover:bg-blue-700`}
//         disabled={isUploading}
//       >
//         {isUploading ? "Uploading..." : "Upload"}
//       </button>

//       {/* Download button */}
//       <button
//         onClick={handleDownload}
//         className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//         disabled={!fileId}
//       >
//         Download PDF
//       </button>

//       {error && <p className="mt-2 text-red-500">{error}</p>}

//       {/* Display metadata */}
//       {metadata && <Metadata metadata={metadata} />}
//     </div>
//   );
// }

// export default FileUpload;

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
