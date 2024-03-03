import React from 'react'
import ProjectCard from './ProjectCard'

const Home = () => {
  return (
    <>
    <div className='grid grid-cols-3 gap-3'>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
    </>
  )
}

export default Home