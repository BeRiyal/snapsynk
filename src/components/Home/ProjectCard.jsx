import React from "react";

const ProjectCard = () => {
  return (
    <div className="flex flex-col bg-white-800 w-[400px] h-[300px] rounded m-5 shadow-lg rounded-md p-3">
      <img src="123.jpg" className="justify-top h-[100%] w-[100%]" />
      <div className="flex flex-row justify-between">
        <strong className="">Project</strong>
        <div className="flex items-center">
          <img src="path/to/image.jpg" />
          <span>Team lead +</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
