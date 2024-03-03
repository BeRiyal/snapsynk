import React from "react";
import SBreadcrumbs from "../Navbar/SBreadcrumbs";
import ReactPlayer from "react-player";
import Chatbox from "../Chatbox/Chatbox";
import Commenttool from "../Chatbox/Commenttool";

const Video = () => {
  return (
    <>
      <SBreadcrumbs />
      <div className="grid grid-cols-12 grid-flow-col" >
        <div className=" grid col-span-8 m-3 p-3 place-content-center bg-gray-100">
          <ReactPlayer url='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' controls />
          <Commenttool />
        </div>
        <div className="col-span-4 bg-blue-500 m-3 p-3 ">
           <Chatbox />
        </div>
      </div>
    </>
  );
};

export default Video;
