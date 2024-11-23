import React, { useEffect, useState } from "react";
import FileUpload from "./components/fileUpload";
import Metadata from "./components/metaData";
import Download from "./components/download";
import { uploadFile, downloadPDF } from "./services/api";

function App() {
  const [metadata, setMetadata] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

//  useEffect(()=>{
// console.log(downloadLink);

//  },[downloadLink])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-12">
        Convert WORD to PDF
      </h1>
      <p className="text-gray-600 mb-6">
        Make DOC and DOCX files easy to read by converting them to PDF.
      </p>

      <FileUpload downloadLink={downloadLink} setDownloadLink={setDownloadLink} />

      {metadata && <Metadata metadata={metadata} />}
      {downloadLink && <Download downloadLink={downloadLink} />}
    </div>
  );
}

export default App;
