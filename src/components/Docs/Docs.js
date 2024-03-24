import React, { useState, useEffect } from 'react';

const Docs = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const fetchFiles = async (path) => {
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFolderClick = (folderName) => {
    const newPath = `${currentPath}/${folderName}`;
    setCurrentPath(newPath);
  };

  const handleBackClick = () => {
    const newPath = currentPath.split('/').slice(0, -1).join('/');
    setCurrentPath(newPath);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = (event) => {
    const filesToUpload = event.target.files;
    // Upload files to the server
  };

  const handleFileDownload = () => {
    if (selectedFile) {
      // Download the selected file
    }
  };

  const handleFileDelete = () => {
    if (selectedFile) {
      // Delete the selected file
    }
  };

  const handleFileRename = (newName) => {
    if (selectedFile) {
      // Rename the selected file to newName
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (type) => {
    if (type === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting files based on sortType and sortOrder

  return (
    <div>
      {/* Header with search, upload, sort, filter options */}
      <div>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleFileDownload}>Download</button>
        <button onClick={handleFileDelete}>Delete</button>
        <button onClick={() => handleFileRename('NewName')}>Rename</button>
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="date">Date</option>
        </select>
      </div>
      {/* File and folder listing */}
      <div>
        {filteredFiles.map((file) => (
          <div key={file.name} onClick={() => handleFileClick(file)}>
            {file.isDirectory ? (
              <strong>{file.name}</strong>
            ) : (
              <span>{file.name}</span>
            )}
          </div>
        ))}
      </div>
      {/* Selected file preview */}
      {selectedFile && (
        <div>
          {/* File preview component */}
        </div>
      )}
    </div>
  );
};

export default Docs;
