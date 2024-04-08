import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal";

const Sedules = () => {
  const [projects, setProjects] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteModel = async (title) => {
    const filteredProjects = projects.filter(
      (project) => project._id === deleteId
    );
    const matchTitle = filteredProjects[0].projectTitle;

    if (matchTitle === title) {
      await axios
        .delete(`/api/projects/delete/${deleteId}`)
        .then(async (response) => {
          setProjects(projects.filter((project) => project._id !== deleteId));
          closeModal();
        });
    } else {
      alert("Title doesn't match");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditToggle = (id) => {
    setProjects((pre) =>
      pre.map((project) =>
        project._id === id
          ? { ...project, isEditing: !project.isEditing }
          : { ...project, isEditing: false }
      )
    );
  };

  const handleSave = async (id) => {
    setProjects((pre) =>
      pre.map((project) =>
        project._id === id ? { ...project, isEditing: false } : project
      )
    );
    const filterData = projects.filter((project) => project._id === id);
    const projectsData = filterData[0];
    await axios
      .put(`/api/projects/update/${id}`, projectsData)
      .then(async (response) => {});

    // await axios
    //   .then(async (response) => {
    //   .put(`/api/projects/delete/${id}`, projects)
    //   });
    // Here you can perform save operation to update the due date
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    openModal();

    // Here you can perform delete operation
  };

  function toCamelCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    axios
      .get(`/api/projects/projbyEmail/${localStorage.getItem("UserEmail")}`)
      .then(async (response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="m-3 ml-5 text-3xl font-bold">
          Sedules : {toCamelCase("data.projectTitle")}
        </h1>
        <hr />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Remove</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              projects.map((project) => (
                <tr key={project._id}>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full bg-gray-100 disabled:opacity-50"
                      value={project.projectTitle}
                      disabled={!project.isEditing}
                      onChange={(e) =>
                        setProjects(
                          projects.map((p) =>
                            p._id === project._id
                              ? { ...p, projectTitle: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full bg-gray-100 disabled:opacity-50"
                      value={project?.description || "-"}
                      disabled={!project.isEditing}
                      onChange={(e) =>
                        setProjects(
                          projects.map((p) =>
                            p._id === project._id
                              ? { ...p, description: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      value={project?.dueDate}
                      className="w-full bg-gray-100 disabled:opacity-50"
                      id="birthday"
                      name="birthday"
                      min={project?.dueDate}
                      disabled={!project.isEditing}
                      onChange={(e) =>
                        setProjects(
                          projects.map((p) =>
                            p._id === project._id
                              ? { ...p, dueDate: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      disabled={project.isEditing}
                      className={`${
                        project.isEditing ? "bg-gray-200" : "bg-red-500"
                      }  hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                      onClick={() =>
                        !project.isEditing && handleDelete(project._id)
                      }
                    >
                      Remove
                    </button>
                  </td>

                  <td className="border px-4 py-2">
                    {project.isEditing ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleSave(project._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEditToggle(project._id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DeleteModal onDelete={handleDeleteModel} onClose={closeModal} />
      )}
    </>
  );
};

export default Sedules;
