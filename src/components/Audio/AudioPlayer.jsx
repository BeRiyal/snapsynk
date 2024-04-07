import React, { useState } from 'react';

const AudioPlayer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate uploading process (you would replace this with your actual upload logic)
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  const handleDownload = () => {
    // You can add logic to download the audio file here
    alert('Downloading audio file');
  };

  const handleDelete = () => {
    setAudioFile(null);
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

      <div>
        {audioFile ? (
          <div>
            <audio controls>
              <source src={URL.createObjectURL(audioFile)} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleDownload}
              >
                Download
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="mb-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpload}
              disabled={!audioFile || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
