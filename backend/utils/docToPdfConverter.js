// import docxPdf from 'docx-pdf';
// import { getMetadata } from "../controllers/metadataController.js";
// const convertDocToPdf = (docPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       docxPdf(docPath,"D:/crack_webd in summer 2023/wordToPdf/backend/uploads/ `${fileId}`-${metadata?.filename}.pdf" ,(err, pdfPath) => {
//         if (err) {
//           console.error("Error during DOCX to PDF conversion:", err);
//           return reject(new Error("Failed to convert DOCX to PDF"));
//         }
//         resolve(pdfPath); // Return the path to the converted PDF
//       });
//     } catch (error) {
//       console.error("Unexpected error in conversion:", error);
//       reject(new Error("Unexpected error during conversion"));
//     }
//   });
// };

// export default convertDocToPdf;


import docxPdf from 'docx-pdf';
import { getMetadata } from "../controllers/metadataController.js";
import fs from "fs/promises";
import path from "path";

const convertDocToPdf = (docPath, fileId) => {
  return new Promise((resolve, reject) => {
    try {
      // Fetch the metadata using the fileId
      const metadata = getMetadata(fileId);

      // Construct the output path dynamically
      const pdfOutputPath = path.join(
        "D:/crack_webd in summer 2023/wordToPdf/backend/uploads/",
        `${fileId}-${metadata?.name || 'output'}.pdf`
      );

      docxPdf(docPath, pdfOutputPath, (err, pdfPath) => {
        if (err) {
          console.error("Error during DOCX to PDF conversion:", err);
          return reject(new Error("Failed to convert DOCX to PDF"));
        }
        resolve(pdfPath); // Return the path to the converted PDF
      });
    } catch (error) {
      console.error("Unexpected error in conversion:", error);
      reject(new Error("Unexpected error during conversion"));
    }
  });
};

export default convertDocToPdf;
