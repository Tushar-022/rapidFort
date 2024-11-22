import multer from "multer";
import path from "path";

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // File will be stored in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // Save file with a timestamped filename
  },
});

// File filter to accept only .doc and .docx files
const fileFilter = (req, file, cb) => {
  const validExtensions = [".doc", ".docx"];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    return cb(new Error("Invalid file type. Only .doc and .docx are allowed."), false);
  }
  cb(null, true); // Accept the file
};

// Initialize multer with the storage options and file filter
const upload = multer({ storage, fileFilter });

export { upload };
