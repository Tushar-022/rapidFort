// import React from "react";

// function Download({ downloadLink }) {
//   if (!downloadLink) return null;


//   <a href="path_to_file" download="proposed_file_name">Download</a>
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-sm text-center">
//       <h2 className="text-xl font-bold text-gray-700">Download PDF</h2>
//       <a
//         href={downloadLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700"
//       >
//         Download PDF
//       </a>
//     </div>
//   );
// }

// export default Download;


import React from "react";
import Metadata from "./metaData";

function Download({ downloadLink, metadata }) {
  if (!downloadLink) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-sm text-center">
      <h2 className="text-xl font-bold text-gray-700">Download PDF</h2>
      <a href={downloadLink}  download={metadata?.name}>
        Download PDF
      </a>
    </div>
  );
}

export default Download;
