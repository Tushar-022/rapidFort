import fs from "fs/promises";
import path from "path";
import convertDocToPdf from "../utils/docToPdfConverter.js";



export const downloadPdf = async (req, res) => {
  const { fileId } = req.params;

  try {
    // Construct file path for DOCX file
    const uploadsDir = path.join(process.cwd(), "uploads"); // Use process.cwd() to get the project root
    const docFilePath = path.join(uploadsDir, `${fileId}.docx`);
   // const docFilePath = path.join("D:/crack_webd in summer 2023/wordToPdf/backend", "uploads", `${fileId}.docx`);

    // Check if the DOCX file exists


    //console.log(docFilePath);
    
    try {
      await fs.access(docFilePath); // Check if file exists
    } catch (err) {
      return res.status(404).json({ error: "File not found" });
    }

    // Convert DOCX to PDF
    let pdfFilePath;
    try {
      pdfFilePath = await convertDocToPdf(docFilePath,fileId); // Convert DOCX to PDF
      console.log(pdfFilePath);
      
    } catch (error) {
      return res.status(500).json({ error: "Failed to convert DOCX to PDF" });
    }

    // Return the PDF as a downloadable file
    res.download(pdfFilePath.filename, async (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ error: "Failed to send PDF" });
      }
     
    });
  } catch (error) {
    console.error("Error during file download:", error.message);
    res.status(500).json({ error: error.message || "Download failed." });
  }
};
