import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import avatar from "../../Assets/avatar.jpeg";
import useMutation from "../../hooks/useMutation";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const MoodBoard = () => {
  let { id } = useParams();

  const [selectedColors, setSelectedColors] = useState([
    "#000000",
    "#000000",
    "#000000",
  ]);
  const [colorLocked, setColorLocked] = useState([false, false, false]);
  const [colorPickerOpen, setColorPickerOpen] = useState([false, false, false]);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const URL = "/api/moodBoards/uploadImage";
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    responseData: responseDataValue,
  } = useMutation({ url: URL, method: "PUT" });
  let [fileDataURL, setFileDataURL] = useState(null); // State to hold the file data URL

  useEffect(() => {
    async function fetchImage() {
      try {
        if (id !== "undefined" && typeof id !== undefined) {
          console.log("1 Project id during getImage ", id);
          const response = await axios.get(`../../api/moodboards/getImage`, {
            headers: {
              "x-project2-id": id,
            },
          });

          if (response.status === 200) {
            console.log("presignedUrl", response.data.data);
            const videoUrlFromRes = response.data.data;
            console.log(
              "Image url value",
              videoUrlFromRes[videoUrlFromRes.length - 1]
            );
            setFileDataURL(videoUrlFromRes[videoUrlFromRes.length - 1]);
          } else {
            console.error("Error fetching image:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, [responseDataValue]); // Fetch video when responseDataValue changes

  const handleFileUpload = async (event) => {
    const file = selectedFile;
    console.log("File uploaded:", file);
    setFileName(file.name);
    setSelectedFile(file); // Set selected file here
    const mid = "65d5905c7cbf260d083bea21";
    // Handle file upload logic here
    console.log("File uploaded:", file);

    console.log("Project id", id);
    console.log("Moodboard id", mid);
    // Handle uploading the selected file
    if (file && id && mid) {
      // Use the 'file' variable instead of 'selectedFile' here
      const formData = new FormData();

      formData.append("projectId", id);
      formData.append("moodboardId", mid);
      formData.append("image", file); // Use 'file' variable instead of 'selectedFile'
      await uploadImage(formData, id, mid);
    } else {
      console.log("No file selected");
    }
  };

  const discardFile = () => {
    setFileName(""); // Reset the file name
    setSelectedFile(null); // Reset the selected file
  };

  const uploadFile = async (e) => {
    const files = e.target.files; // Access the files array from the event
    if (files && files.length > 0) {
      // Check if files array exists and is not empty
      const file = files[0]; // Get the first file from the files array
      console.log("Selected file data", file);
      setFileName(file.name);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFileDataURL(e.target.result);
        console.log("fileDataURL", fileDataURL);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...selectedColors];
    newColors[index] = color.hex;
    setSelectedColors(newColors);
  };

  const handleLockColor = (index) => {
    const newLockState = [...colorLocked];
    newLockState[index] = !newLockState[index];
    setColorLocked(newLockState);
  };

  const handleToggleColorPicker = (index) => {
    if (!colorLocked[index]) {
      const newPickerState = colorPickerOpen.map((value, idx) =>
        idx === index ? !value : false
      );
      setColorPickerOpen(newPickerState);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".chrome-picker")) {
        setColorPickerOpen([false, false, false]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyColorCode = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Color code "${color}" copied to clipboard!`);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto text-white flex">
        <div className="p-4 flex flex-col ">
          <h1 className="text-2xl w-full text-black font-bold p-2 ">
            Color Pellet
          </h1>
          <div className="flex">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <div
                  className="bg-gray-300 h-[400px] w-[200px] cursor-pointer"
                  style={{ backgroundColor: selectedColors[index] }}
                  onClick={() => {
                    if (colorLocked[index]) {
                      handleCopyColorCode(selectedColors[index]);
                    } else {
                      handleToggleColorPicker(index);
                    }
                  }}
                ></div>
                {colorPickerOpen[index] && (
                  <div className="z-50 absolute top-0 left-10 mt-8] z">
                    <frame>
                      <ChromePicker
                        color={selectedColors[index]}
                        onChange={(color) => handleColorChange(index, color)}
                      />
                    </frame>
                  </div>
                )}
                <button
                  onClick={() => handleLockColor(index)}
                  className={`absolute bottom-0 left-0 bg-${
                    colorLocked[index] ? "red-900" : "green"
                  }-500 text-white px-2 py-1 rounded-lg`}
                >
                  {colorLocked[index] ? "🔒" : "🔓"}
                </button>
              </div>
            ))}
          </div>
          <div className="m-2 grid justify-items-end">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg p-2 m-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              save
            </button>
          </div>
        </div>
        <div className="w-full flex-row">

        <div className="p-4 flex flex-col ">
          <h1 className="text-2xl w-full text-black font-bold p-2 ">Images</h1>
        </div>
        <div className="flex flex-row justify-between">

        <div className="flex items-center justify-center">
          {selectedFile ? (
            <div>
              <img
                src={fileDataURL}
                alt="Uploaded"
                className="w-[250px]"
              />
              <div className="flex mt-4">
                <button
                  onClick={discardFile}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Discard
                </button>
                <button
                  onClick={handleFileUpload}
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 011 1v7h6a1 1 0 110 2h-6v7a1 1 0 01-2 0v-7H4a1 1 0 110-2h6V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upload
                </button>
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <label
                htmlFor="file-upload-1"
                className="cursor-pointer text-black py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <span className="mr-2">+</span> Add Photo
              </label>
              <input
                id="file-upload-1"
                type="file"
                className="hidden"
                onChange={uploadFile}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {selectedFile ? (
            <div>
              <img
                src={fileDataURL}
                alt="Uploaded"
                className="w-[250px]"
              />
              <div className="flex mt-4">
                <button
                  onClick={discardFile}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Discard
                </button>
                <button
                  onClick={handleFileUpload}
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 011 1v7h6a1 1 0 110 2h-6v7a1 1 0 01-2 0v-7H4a1 1 0 110-2h6V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upload
                </button>
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <label
                htmlFor="file-upload-2"
                className="cursor-pointer text-black py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <span className="mr-2">+</span> Add Photo
              </label>
              <input
                id="file-upload-2"
                type="file"
                className="hidden"
                onChange={uploadFile}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {selectedFile ? (
            <div>
              <img
                src={fileDataURL}
                alt="Uploaded"
                className="w-[250px]"
              />
              <div className="flex mt-4">
                <button
                  onClick={discardFile}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Discard
                </button>
                <button
                  onClick={handleFileUpload}
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 011 1v7h6a1 1 0 110 2h-6v7a1 1 0 01-2 0v-7H4a1 1 0 110-2h6V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upload
                </button>
              </div>
            </div>
          ) : (
            <div className="relative inline-block">
              <label
                htmlFor="file-upload-3"
                className="cursor-pointer text-black py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <span className="mr-2">+</span> Add Photo
              </label>
              <input
                id="file-upload-3"
                type="file"
                className="hidden"
                onChange={uploadFile}
              />
            </div>
          )}
        </div>

        </div>

        </div>
      </div>
    </div>
  );
};

export default MoodBoard;
