import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "../../Assets/Logo_SnapSynk.png"
import { avatar } from "@material-tailwind/react";

const ProjectCard = (prop) => {
    const navigate = useNavigate();
    const toProjectBoard =()=>{
      navigate(`project/${prop.projectId}`);
    }
    function toCamelCase(str) {
      return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    
  return (
    <>
          <div
      onClick={toProjectBoard}
      className="relative flex flex-col w-[400px] h-[300px] m-5 rounded-md overflow-hidden shadow-lg"
      style={{ backgroundImage:`url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute top-3 right-3">
      </div>
      <div className="absolute bottom-5 left-5 text-white">
        <strong className="text-2xl text-semibold">{toCamelCase(prop.projectTitle)}</strong>
      </div>
    </div>
    </>
  );
};
export default ProjectCard;