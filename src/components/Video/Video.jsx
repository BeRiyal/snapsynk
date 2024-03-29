import React, { useEffect, useRef, useState } from "react";
import SBreadcrumbs from "../Navbar/SBreadcrumbs";
import ReactPlayer from "react-player";
import Chatbox from "../Chatbox/Chatbox";
import Commenttool from "../Chatbox/Commenttool";
import { useLocation, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import axios from "axios";

const Video = (props) => {
  // const playerRef = useRef();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoID = searchParams.get("vid");
  const [vid,setVid] = useState(videoID);
  const pid = searchParams.get("pid");


  const [playing, setPlaying] = useState(true);
  const [timeStamp, settimeStamp] = useState();
  const [videoUrl, setVideoUrl] = useState(null); // State to store video URL
  const [chat,SetReview] = useState([] );
//video handling 

const [selectedFile, setSelectedFile] = useState(null);
const URL = "/api/projects/uploadvideo"

const handleReviewClick = (tt) => {
  console.log("usereff",tt)

}
const {mutate:uploadImage,isLoading:uploading,error:uploadError,responseData:responseDataValue} = useMutation({url:URL ,method:"PUT"});

const handleFileChange = (event) => {
  // Access the file from event.target.files
  const file = event.target.files[0];
  setSelectedFile(file);
};

const handleUpload = async e => {
  // Handle uploading the selected file
  if (selectedFile) {
    
    const formData = new FormData();
    formData.append('projectId',pid); // Add project ID to the FormData
    formData.append('image', selectedFile);
    await uploadImage(formData, pid); // Pass id as projectId


  } else {
    console.log("No file selected");
  }
};

  let videoComponent = null;
 function fetchReviews(pid){
  console.log("Project",pid);
  axios.get(`../../api/reviews/getReview?projectId=${pid}`).then(function(response){
    SetReview(response.data.data)
  });
 }
 
  useEffect(() => {
    async function fetchVideo() {
      try {
        if (vid !== "undefined" && typeof pid !== undefined) {
          console.log("1 Project id during getVideo ", pid);
          console.log("2 video id during getVideo ", vid);
          const response = await axios.get(`../../api/projects/getVideo`, {
            headers: {
              "x-project2-id": pid,
            },
          });
  
          if (response.status === 200) {
            console.log("presignedUrl", response.data.data);
            const videoUrlFromRes = response.data.data;
            setVideoUrl(videoUrlFromRes[videoUrlFromRes.length - 1]);
            fetchReviews(pid)
          } else {
            console.error("Error fetching video:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
  
    fetchVideo();
  
  }, [responseDataValue]); // Fetch video when responseDataValue changes
  


  function addReview(data){
    
    SetReview([
      ...chat,
      data
    ])
    console.log(chat)
  }

  function setPlayingx(ts){
    setPlaying(! playing)
    return playing
  }

  const handleProgress = (progress) => {
    const { played } = progress;
    settimeStamp(played);
    
  }

  if (vid === 'undefined') {
    videoComponent =  (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <div>Post</div>
       
      </div>
      
      )
      
  }  
  else {
    
    videoComponent = 
    (
      <ReactPlayer 
      url={videoUrl} // Use videoUrl state here
      playing={playing}
      key={videoUrl}
      onProgress={handleProgress}
      controls 
      stopOnUnmount={false}
      />
    )
  }
  return (
    <>
      <SBreadcrumbs />
      <h1 className='m-3 ml-10 text-3xl font-bold'>Video Review {}</h1>
      <div className="grid grid-cols-12 grid-flow-col" >
        <div className=" grid col-span-8 m-3 p-3 place-content-center bg-gray-100">
          {
            
          }
            {videoComponent}
  
            <Commenttool addReviewFunction={addReview} setPlaying={setPlayingx} TimeStamp={timeStamp} pid={pid} />
        </div>
        <div className="col-span-4 m-3 p-3 border ">
        <div>
        <div className='grid-cols-3'>
            <span>
                uploaded by riyal 
            </span>
            <span>
                1 month ago 
            </span>
        </div>
        <hr />
          {chat.map((obj)=>(
            <Chatbox key={obj.id} obj={obj}   />
          ))}
        </div>
        
    </div>
      </div>
    </>
  );
};

export default Video;
