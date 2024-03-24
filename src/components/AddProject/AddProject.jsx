import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {

  //___states for Session,Error,Loading START
  const [ifError,setError] = useState(false)
  const [ifLoading,setLoading] = useState(false)
  const navigate = useNavigate();

  //___states for Session,Error,Loading END

  //___states for API START 
  const [team,setTeam] = useState({
    "leader":[],
    "editor":[],
    "client":[]
  })

  const [project,setProject] = useState({
    "projectTitle":"",
    "dueDate":"",
    "teamId":""
  })
  // ___states for API END

  const handleAddProjInput = (e) => {
    setError(false);
    const name = e.target.name;
    const value = e.target.value;
    if(team.hasOwnProperty(name)){
    setTeam({
        ...team,
        [name]:value
      })
    }
    if(project.hasOwnProperty(name))
    setProject({
      ...project,
      [name]:value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      await axios.post("api/teams/add", team)
      .then(async(teamResponse)=>{
        console.log("team Response", teamResponse.data.data._id);
          const newBody = {
            ...project,
            teamId: teamResponse.data.data._id
          };
        await axios.post("api/projects/add", newBody)
        .then((response)=>{
          if("dsds",response.data.success){navigate("/");}
        })
      })
      .catch(error=>{
        setLoading(false);     
        setError(true); 
      })
      setLoading(false);
  }

  return (
    <div>
      <div className="max-w-md mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Project Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter project title"
              name="projectTitle"
              onChange={handleAddProjInput}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectLead"
              >
                Project Leader
              </label>
              <span className="ml-3">
                
              </span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leader"
              type="text"
              placeholder="Enter project Leader"
              name="leader"
              onChange={handleAddProjInput}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Client"
              >
                Editor
              </label>
              <span className="ml-3">
                
              </span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="projectLead"
              type="text"
              placeholder="Editor"
              name="editor"
              onChange={handleAddProjInput}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectLead"
              >
                Client
              </label>
              <span className="ml-3">
                
              </span>
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="client"
              type="text"
              placeholder="Client"
              name="client"
              onChange={handleAddProjInput}
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dueDate"
            type="date"
            name="dueDate"
            min={new Date().toISOString().split(',')[0]} // Ensure due date is in the future
            onChange={handleAddProjInput}
            required
          />
        </div>
        <div className="flex flex-row justify-center">

          <button className="bg-blue-500 text-white p-3 m-3 rounded-lg font-bold" type="submit">Submit</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
