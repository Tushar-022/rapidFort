import axios from "axios";
import * as pdfjsLib from 'pdfjs-dist';
// import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
//const API_BASE_URL = "http://localhost:5000";



// Upload a file and receive metadata
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //console.log(response.data);
  

  return response.data; // The backend should return metadata including fileId
};


export const downloadPDF = async (fileId) => {
  try {
    // Open the PDF URL directly in a new tab
    window.open(`${API_BASE_URL}/download/${fileId}`);
  } catch (error) {
    console.error("Error downloading the PDF:", error);
  }
};
