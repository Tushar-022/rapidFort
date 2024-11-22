// import {v2 as cloudinary} from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config();

// // Cloudinary Configuration
// cloudinary.config({
//     cloud_name: "dznwyf9oe",     // Replace with your cloud_name
//     api_key: '675138337611678',           // Replace with your api_key
//     api_secret: "xhetxBD3_BjaOG2X7cEZybsLlB0",     // Replace with your api_secret
//   });

// // Multer Storage Configuration
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "uploads", // Folder name in Cloudinary where the files will be stored
//     resource_type: "auto", // Set this if you want Cloudinary to auto-detect if file is an image or raw file
//   },
// });

// // Define the upload middleware using multer with Cloudinary storage
// const upload = multer({ storage });

// // Metadata store (in-memory store for uploaded file metadata)
// const metadataStore = {};


// // Function to upload a file
// export const uploadFile = async (req, res) => {
//   try {
//      console.log("Tk tk");
    
//     const file = req.file; // This comes from multer

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const metadata = {
//       fileId: file.public_id, // `public_id` from Cloudinary is used as the unique file ID
//       name: file.originalname,
//       size: (file.size / 1024).toFixed(2), // Convert bytes to KB
//       uploadedAt: new Date().toISOString(),
//     };

//     console.log(metadata);
    

//     // Store metadata in the in-memory metadata store
//     metadataStore[metadata.fileId] = metadata;

//     res.status(200).json({ message: "File uploaded successfully", metadata });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ error: "File upload failed" });
//   }
// };

// // Export the upload middleware and the `uploadFile` function
// export { upload };


// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(process.cwd(), "uploads"); // Using process.cwd() for flexibility
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath); // Create the "uploads" folder if it doesn't exist
//     }
//     cb(null, uploadPath); // Save files in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `file-${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName); // Save the file with a unique name
//   },
// });

// // Multer middleware
// export const upload = multer({ storage });

// // Controller to handle file upload
// export const uploadFile = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   // Generate file URL dynamically
//   const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//   res.status(200).json({ fileUrl }); // Respond with the file URL
// };



import { log } from "console";
import metadataStore from "../utils/metadataStore.js";
import path from "path";

const uploadFile = (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileId = path.basename(file.filename, path.extname(file.filename));
    
    const formatToIST = (date) => {
      const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" };
      return new Intl.DateTimeFormat("en-IN", options).format(date);
    };

    const metadata = {
      name: file.originalname,
      size: (file.size / 1024).toFixed(2), // Convert bytes to KB
       uploadedAt: new Date(),
      //uploadedAt: formatToIST(new Date()), 
    };

    metadataStore.getMetadata(fileId, metadata);

    //console.log(fileId,metadata);

    res.status(200).json({ fileId, metadata });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "File upload failed." });
  }
};

export { uploadFile };
