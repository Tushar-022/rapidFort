import express from "express";
import { upload } from "../middleware/multer.js";  // multer middleware
import { uploadFile } from "../controllers/uploadController.js"; // Correct import of the uploadFile function
import { getMetadata } from "../controllers/metadataController.js"; // Metadata controller
import { downloadPdf } from "../controllers/downloadController.js"; // PDF download controller

const router = express.Router();

// Upload route
router.post("/upload", upload.single("file"), uploadFile); // Ensure file handling and metadata is done

// Metadata retrieval route
let fileId=getMetadata.fileId;
router.get("/metadata/:fileId", getMetadata);

// PDF download route
router.get("/download/:fileId", downloadPdf);

export default router;
