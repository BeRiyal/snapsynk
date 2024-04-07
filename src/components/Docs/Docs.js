import React, { useState } from 'react';

const DummyFiles = [
  { id: 1, fileTitle: 'File 1', fileDescription: 'File Description 1', uploadedBy: 'User 1', uploadDate: '2024-04-10' },
  { id: 2, fileTitle: 'File 2', fileDescription: 'File Description 2', uploadedBy: 'User 2', uploadDate: '2024-04-15' },
  { id: 3, fileTitle: 'File 3', fileDescription: 'File Description 3', uploadedBy: 'User 3', uploadDate: '2024-04-20' }
];

const Docs = () => {
  const [files, setFiles] = useState(DummyFiles);

  const handleDeleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
    // Here you can perform delete operation
  };
  function toCamelCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  return (
    <>
      <div>
        <h1 className="m-3 ml-5 text-3xl font-bold">
          VoiceOver : {toCamelCase("data.projectTitle")}
        </h1>
        <hr />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="px-4 py-2">File Title</th>
              <th className="px-4 py-2">File Description</th>
              <th className="px-4 py-2">Uploaded By</th>
              <th className="px-4 py-2">Upload Date</th>
              <th className="px-4 py-2">Download File</th>
              <th className="px-4 py-2">Delete File</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td className="border px-4 py-2">{file.fileTitle}</td>
                <td className="border px-4 py-2">{file.fileDescription}</td>
                <td className="border px-4 py-2">{file.uploadedBy}</td>
                <td className="border px-4 py-2">{file.uploadDate}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Docs;
