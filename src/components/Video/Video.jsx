import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import Chatbox from "../Chatbox/Chatbox";
import Commenttool from "../Chatbox/Commenttool";
import Loader from "../Loader";
import SBreadcrumbs from "../Navbar/SBreadcrumbs";
import { Button } from "@material-tailwind/react";

const customSort = (a, b) => {
  if (a.status === "pending" && b.status !== "pending") {
    return -1; // "pending" status comes before other statuses
  } else if (a.status !== "pending" && b.status === "pending") {
    return 1; // Other statuses come after "pending" status
  } else if (a.status === "true" && b.status !== "true") {
    return 1; // "true" status comes after other statuses
  } else if (a.status !== "true" && b.status === "true") {
    return -1; // Other statuses come before "true" status
  } else {
    return 0; // If statuses are the same or not recognized, maintain original order
  }
};

const Video = (props) => {
  const playerRef = useRef(null);
  // const playerRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoID = searchParams.get("vid");
  const [vid, setVid] = useState(videoID);
  const pid = searchParams.get("pid");
  const [played, setPlayed] = useState("00");
  const [currentPlayTime, setCurrentPlayTime] = useState(0.0);
  const [playing, setPlaying] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null); // State to store video URL
  const [chat, SetReview] = useState([]);

  const [loading, setLoading] = useState(false);
  //video handling

  const [selectedFile, setSelectedFile] = useState(null);
  const URL = "/api/projects/uploadvideo";

  const handleReviewClick = (tt) => {
    console.log("usereff", tt);
  };
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
    responseData: responseDataValue,
  } = useMutation({ url: URL, method: "PUT" });

  const handleFileChange = (event) => {
    // Access the file from event.target.files
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async (e) => { 
    // Handle uploading the selected file
    if (selectedFile) {
      const formData = new FormData();
      formData.append("projectId", pid); // Add project ID to the FormData
      formData.append("image", selectedFile);
      await uploadImage(formData, pid)
        .then((res) => {
          if(res?.success===true){
            window.history.back()
          }
        })
        .catch((e) => console.log("this is error", e)); // Pass id as projectId
    } else {
      alert("Please Select The File");
      console.log("No file selected");
    }
  };

  let videoComponent = null;
  function fetchReviews(pid) {
    axios
      .get(`../../api/reviews/getReview?projectId=${pid}`)
      .then(function (response) {
        console.log(`getReview response:`, response);
        SetReview(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    async function fetchVideo() {
      try {
        if (vid !== "undefined" && typeof pid !== undefined) {
          const response = await axios.get(`../../api/projects/getVideo`, {
            headers: {
              "x-project2-id": pid,
            },
          });

          if (response.status === 200) {
            const videoUrlFromRes = response.data.data; 
            if (response?.data?.data) {
              setVideoUrl(videoUrlFromRes[0]);
              fetchReviews(pid);
            }
            setTimeout(() => {
              setLoading(false);
            }, 200);
          } else {
            setTimeout(() => {
              setLoading(false);
            }, 200);
          }
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }

    fetchVideo();
  }, [responseDataValue]); // Fetch video when responseDataValue changes

  function addReview(data) {
    
    SetReview([...chat, data]);
  }

  function setPlayingx(ts) {
    setPlaying(!playing);
    return playing;
  }

  const handleProgress = (progress, event) => {
    const { playedSeconds, played } = progress;
    setPlayed(String(played));
    const minutes = Math.floor(playedSeconds / 60);
    const seconds = Math.floor(playedSeconds % 60);

    setCurrentPlayTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
  };
  // console.log("sorted array", chat);
  // console.log("sorted array",SortChat(chat))

  function SortChat(chat) {
    return chat.slice().sort((a, b) => {
      if (a.timeStamp && !b.timeStamp) {
        return 1;
      } else if (!a.timeStamp && b.timeStamp) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (vid === "undefined") {
    videoComponent = (
      <div>
        <input type="file" onChange={handleFileChange} />

        <Button
          onClick={handleUpload}
          style={{ padding: "10px" }}
          color={"green"}
        >
          Upload
        </Button>
        {/* <div>Post</div> */}
      </div>
    );
  } else {
    videoComponent = (
      <ReactPlayer
        ref={playerRef}
        url={videoUrl} // Use videoUrl state here
        playing={playing}
        key={videoUrl}
        onProgress={handleProgress}
        controls
        currentTime={played}
        stopOnUnmount={false}
      />
    );
  }

  if (loading) return <Loader />;

  return (
    <div style={{ height: "80dvh" }}>
      <SBreadcrumbs />
      <h1 className="m-3 ml-10 text-3xl font-bold">
        {vid !== "undefined" && vid ? "Video Review" : "Add video"}
        {}
      </h1>
      <div className="grid grid-cols-12 grid-flow-col">
        <div className=" grid col-span-8 m-3 p-3 place-content-center bg-gray-100 ">
          {videoComponent}

          {vid !== "undefined" && vid && (
            <Commenttool
              addReviewFunction={addReview}
              setPlaying={setPlayingx}
              TimeStamp={currentPlayTime}
              pid={pid}
            />
          )}
        </div>
        {vid !== "undefined" && vid && (
          <div className="col-span-4 m-3 p-3 border  ">
            <div>
              <div className="grid-cols-3">
                <span>uploaded by {localStorage.getItem("UserName")}</span>
                <span className="ml-2">{localStorage.getItem("UserType")}</span>
                {/* <span className="ml-2">1 month ago</span> */}
              </div>
              <hr />
              <div style={{ height: "40rem", overflow: "auto" }}>
                {chat.sort(customSort).map((obj) => (
                  <Chatbox
                    key={obj.id}
                    obj={obj}
                    setPlayed={(value) => {
                      const [minutes, seconds] = value
                        .split(":")
                        .map(parseFloat);
                      const totalTimeInSeconds = minutes * 60 + seconds;

                      if (playerRef.current) {
                        if (value === "") {
                          playerRef.current.seekTo(0, "seconds");
                          setPlaying(true);
                        } else {
                          playerRef.current.seekTo(
                            totalTimeInSeconds,
                            "seconds"
                          );
                          setPlaying(true);
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
