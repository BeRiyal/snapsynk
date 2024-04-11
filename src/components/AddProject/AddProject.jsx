import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useEffect } from "react";

const AddProject = () => {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState({});

  // Function to handle suggestion selection
  const handleSuggestionClick = (type, suggestion) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      [type]: suggestion,
    }));
    // Clear suggestions for the clicked type only
    setSuggestions((prevSuggestions) => ({
      ...prevSuggestions,
      [type]: [],
    }));
  };

  //___states for Session,Error,Loading START
  const [loading, setLoading] = useState(true);

  //___states for Session,Error,Loading END

  //___states for API START
  const [team, setTeam] = useState({
    Leader: localStorage.getItem("UserEmail"),
    Editor: [],
    Client: [],
  });

  const [project, setProject] = useState({
    projectTitle: "",
    dueDate: "",
    teamId: "",
  });
  // ___states for API END

  const handleAddProjInput = (e) => {
    fetchSuggestions(e.target.value, e.target.name);

    const name = e.target.name;
    const value = e.target.value;
    if (team.hasOwnProperty(name)) {
      setTeam({
        ...team,
        [name]: value,
      });
    }
    if (project.hasOwnProperty(name))
      setProject({
        ...project,
        [name]: value,
      });
  };
  const fetchSuggestions = async (searchString, type) => {
    try {
      const data = {
        searchString: searchString,
        type: type,
      };
      // Make a POST request to the endpoint with the search string and type as query parameters
      const response = await axios.post("/api/users/search", data);
      const suggestion = response.data.data;

      // Merge the new suggestions with the existing state
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        [type]: suggestion,
      }));
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      setSuggestions({}); // Return an empty object if an error occurs
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("api/teams/add", team)
      .then(async (teamResponse) => {
        const newBody = {
          ...project,
          teamId: teamResponse.data.data._id,
        };
        await axios.post("api/projects/add", newBody).then((response) => {
          if (response.data.success) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage?.getItem("UserType") !== "Admin") {
      window.location.replace("Contact");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mt-9 max-w-md mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Add Project</h2>
          <div className="mb-4">
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
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
              <span className="ml-3"></span>
            </div>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              id="leader"
              type="text"
              name="Leader"
              disabled
              value={localStorage.getItem("UserEmail")}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Editor"
              >
                Editor
              </label>
              <span className="ml-3"></span>
            </div>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              id="projectLead"
              type="text"
              value={team?.Editor}
              placeholder="Editor"
              name="Editor"
              onChange={handleAddProjInput}
              required
            />
            {suggestions?.hasOwnProperty("Editor") &&
              suggestions?.Editor?.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-3/12 mt-1 py-1 shadow-md">
                  {suggestions?.Editor?.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick("Editor", suggestion)
                      }
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="mb-4">
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectLead"
              >
                Client
              </label>
              <span className="ml-3"></span>
            </div>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              id="client"
              type="text"
              placeholder="Client"
              name="Client"
              value={team?.Client || null}
              onChange={handleAddProjInput}
              required
            />
            {suggestions.hasOwnProperty("Client") &&
              suggestions?.Client?.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-3/12 mt-1 py-1 shadow-md">
                  {suggestions?.Client?.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick("Client", suggestion)
                      }
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              id="dueDate"
              type="date"
              name="dueDate"
              min={new Date().toISOString().split(",")[0]} // Ensure due date is in the future
              onChange={handleAddProjInput}
              required
            />
          </div>
          <div className="flex flex-row justify-center">
            <button
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
