import React, { useEffect, useState } from "react";
import useMutation from "../../hooks/useMutation";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AudioPlayer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // State to store video URL
  const A_URL = "/api/projects/uploadaudio";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const pid = searchParams.get("pid");
  const audioID = searchParams.get("aid");
  const [aid, setVid] = useState(audioID);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    responseData: responseDataValue,
  } = useMutation({ url: A_URL, method: "PUT" });

  useEffect(() => {
    async function fetchAudio() {
      try {
        // Check if the video ID and project ID are defined
        if (aid !== "undefined" && typeof pid !== undefined) {
          // Send a GET request to fetch audio data
          const response = await axios.get(`../../api/projects/getAudio`, {
            headers: {
              "x-project2-id": aid,
            },
          });
  
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // Extract audio URL from the response data
            const audioUrlFromRes = response.data.data;
            
            // Check if audio URL is available
            if (response?.data?.data) {
              // Set the audio URL state
              setAudioUrl(audioUrlFromRes[0]);
            }
  
            // Set loading to false after a short delay
            setTimeout(() => {
              setLoading(false);
            }, 200);
          } else {
            // Set loading to false after a short delay if response status is not OK
            setTimeout(() => {
              setLoading(false);
            }, 200);
          }
        }
      } catch (error) {
        // Log error if fetching audio data fails
        console.error("Error fetching audio:", error);
      }
    }
  
    // Call the fetchAudio function when responseDataValue changes
    fetchAudio();
  }, [responseDataValue]); // Fetch audio when responseDataValue changes
  
  const handleUpload = async (e) => {
    // Handle uploading the selected audio file
    if (audioFile) {
      const formData = new FormData();
      formData.append("projectId", pid); // Add project ID to the FormData
      formData.append("audio", audioFile); // Change "image" to "audio"

      try {
        const res = await uploadImage(formData, pid); // Assuming you have a function called uploadAudio for audio uploads
        if (res && res.success === true) {
          window.history.back();
        } else {
          console.error("Error uploading audio:", res.error);
        }
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    } else {
      alert("Please Select The File");
      console.log("No audio file selected");
    }
  };


  const handleDownload = () => {
    // You can add logic to download the audio file here
    alert("Downloading audio file");
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

      <div className="flex justify-center mt-20">
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
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleUpload}
                disabled={!audioFile || uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
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
              className="bg-White-500 hover:bg-gray-200 text-black m-3 font-bold py-2 px-4 rounded"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
