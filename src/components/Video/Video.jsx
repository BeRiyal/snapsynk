import React, { useState } from "react";
import SBreadcrumbs from "../Navbar/SBreadcrumbs";
import ReactPlayer from "react-player";
import Chatbox from "../Chatbox/Chatbox";
import Commenttool from "../Chatbox/Commenttool";
import { useLocation, useParams } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import useMutation from "../../hooks/useMutation";

const Video = (props) => {
  let { id } = useParams();

  const [playing, setPlaying] = useState(false);

  function addReview(data){
    console.log("chat",chat);
    console.log("data",data);
    SetReview([
      ...chat,
      data
    ])
    console.log(chat)
  }

  function setPlayingx(ts){
    console.log("tsssssssss passed from tool",ts);
    setPlaying(! playing)
    console.log("tsssssssss from state",playing);
  }

  const [chat,SetReview] = useState(
    [{
      id:"as",
      Message:"dsd",
      msgTime:"sds",
      timeStamp:"sds",
      userName:"ddsd",
      status:"sds",
      replyOf:"s"
    },]
  );


  let videoComponent = null;

  console.log("vid",id)


//video handling 

  const [selectedFile, setSelectedFile] = useState(null);
  const URL = "/api/projects/uploadvideo"
  const {mutate:uploadImage,isLoading:uploading,error:uploadError} = useMutation({url:URL });

  const handleFileChange = (event) => {
    // Access the file from event.target.files
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async e => {
    // Handle uploading the selected file
    if (selectedFile) {
      
      const formData = new FormData();
      formData.append('projectId', "65d59292e924c821263bb090"); // Add project ID to the FormData

      formData.append('image', selectedFile);
     

      await uploadImage(formData);

      console.log("File uploaded:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  if (typeof id !== 'undefined') {
    videoComponent =  (
      <div>
         <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

        <div>Post</div>
      </div>
      
      )
    console.log("Video ID is undefined");
  }  
  else {
    // code to load video
    console.log("Video ID is defined");
    videoComponent = 
    (
      <ReactPlayer  url='https://www.youtube.com/watch?v=JQVBGtZMqgU' 
      playing={playing}
      controls />
    )
  }
  return (
    <>
      <SBreadcrumbs />
      <div className="grid grid-cols-12 grid-flow-col" >
        <div className=" grid col-span-8 m-3 p-3 place-content-center bg-gray-100">
          {
            
          }
            {videoComponent}
  
            <Commenttool addReviewFunction={addReview} setPlaying={setPlayingx}/>
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
            <Chatbox key={obj.id} Msg={obj.Message} />
          ))}
        </div>
        
    </div>
      </div>
    </>
  );
};

export default Video;
