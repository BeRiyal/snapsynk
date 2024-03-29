import React, { useContext, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import FloatingButton from '../AddProject/FloatingButton'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
 
  const [projects, setProjects] = useState([])

  useEffect( () => {
    if(! localStorage.getItem("isSession")){
      navigate("/Login");
    }
    axios.get('/api/projects')
      .then( async (response) => {
        console.log(response.data.data)
        setProjects(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    ,[]);
   
  return (
    <>
        <h1 className='m-3 ml-10 text-3xl font-bold'>Projects</h1>
      <div className='grid grid-cols-3 gap-3'>
        {projects.map((project) => (
          <div key={project._id}>
            <div>{project.data}</div>
            <ProjectCard projectTitle={project.projectTitle} projectId={project._id} teamId={project.teamId} videoId={project.videoId}/>
          </div>
        ))}
      </div>
      <FloatingButton />
    </>
  )
}

export default Home