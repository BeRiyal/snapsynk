import React, { useState } from 'react';

const DummyData = [
  { id: 1, title: 'Project 1', description: 'Description 1', dueDate: '2024-04-10' },
  { id: 2, title: 'Project 2', description: 'Description 2', dueDate: '2024-04-15' },
  { id: 3, title: 'Project 3', description: 'Description 3', dueDate: '2024-04-20' }
];

const Sedules = () => {
  const [projects, setProjects] = useState(DummyData);

  const handleEditToggle = (id) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, isEditing: !project.isEditing } : project
    ));
  };

  const handleSave = (id) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, isEditing: false } : project
    ));
    // Here you can perform save operation to update the due date
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(project => project.id !== id));
    // Here you can perform delete operation
  };

    function toCamelCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

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
          {projects.map(project => (
            <tr key={project.id}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full bg-gray-100 disabled:opacity-50"
                  value={project.title}
                  disabled={!project.isEditing}
                  onChange={(e) => setProjects(projects.map(p =>
                    p.id === project.id ? { ...p, title: e.target.value } : p
                  ))}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full bg-gray-100 disabled:opacity-50"
                  value={project.description}
                  disabled={!project.isEditing}
                  onChange={(e) => setProjects(projects.map(p =>
                    p.id === project.id ? { ...p, description: e.target.value } : p
                  ))}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full bg-gray-100 disabled:opacity-50"
                  value={project.dueDate}
                  disabled={!project.isEditing}
                  onChange={(e) => setProjects(projects.map(p =>
                    p.id === project.id ? { ...p, dueDate: e.target.value } : p
                  ))}
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(project.id)}
                >
                  Remove
                </button>
              </td>
              <td className="border px-4 py-2">
                {project.isEditing ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSave(project.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditToggle(project.id)}
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
    </>

  );
};

export default Sedules;
