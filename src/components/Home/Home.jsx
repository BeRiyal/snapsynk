import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../AddProject/FloatingButton";
import ProjectCard from "./ProjectCard";
const Home = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("isSession")) {
      navigate("/Login");
    }
    axios
      .get(`/api/projects/projbyEmail/${localStorage.getItem("UserEmail")}`)
      .then(async (response) => {
        console.log(response.data.data);
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="m-2 ml-5 text-xl font-bold">Projects</h1>
      <hr />
      <div className="grid grid-cols-3 gap-3">
        {projects.map((project) => (
          <div key={project._id}>
            <div>{project.data}</div>
            <ProjectCard
              projectTitle={project.projectTitle}
              projectId={project._id}
              teamId={project.teamId}
              videoId={project.videoId}
            />
          </div>
        ))}
      </div>
      <FloatingButton />
    </>
  );
};

export default Home;
