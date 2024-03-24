import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const ProjectCard = (prop) => {
    const navigate = useNavigate();
    const toProjectBoard =()=>{
      navigate(`project/${prop.projectId}`);
    }
  return (
    <>
      <div onClick={toProjectBoard} className="flex divide-gray-200 divide-y flex-col w-[400px] h-[300px] rounded m-5 shadow-lg rounded-md p-3">
        <img src="123.jpg" className="justify-top h-[100%] w-[100%]" />
        <div className="flex flex-row justify-between">
          <strong className="">{prop.projectTitle}</strong>
        </div>
      </div>
    </>
  );
};
export default ProjectCard;