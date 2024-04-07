import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import Alert from "../alert";

const Projectboard = () => {
  if (!localStorage.getItem("isSession")) {
    navigate("/Login");
  }

  const [data, setData] = useState({
    projectTitle: "",
    videoId: "",
    moodBoardId: "",
    voId: "",
    script: "",
    teams: "",
    SocSed: "",
    cal: "",
    docs: "",
  });

  let { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();
  function toCamelCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  function handleClick(type) {
    switch (type) {
      case "video":
        if (data.videoId) {
          navigate(`../project/Video/?pid=${id}&vid=${data.videoId}`);
        } else {
          if (localStorage.getItem("UserType") === "Editor") {
            navigate(`../project/Video/?pid=${id}&vid=${data.videoId}`);

          } else {

            openModal("No Video Found");
          }
        }
        break;
      case "moodboard":
        navigate(`../project/MoodBoard/${id}`);
        break;
      case "voiceover":
        navigate(`../project/VoiceOver/${data.voId}`);
        break;
      case "script":
        navigate(`../project/Script/${data.script}`);
        break;
      case "teams":
        navigate(`../project/Teams/${id}`);
        break;
      case "socsed":
        navigate(`../project/SocialSedules/${data.SocSed}`);
        break;
      case "cal":
        navigate(`../project/Calander/${data.cal}`);
        break;
      case "docs":
        navigate(`../project/Otherdocs/${data.docs}`);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    console.log("Project id", id);

    if (!id) {
      navigate("/home");
    } else {
      axios
        .get(`/api/projects/projectById/${id}`)
        .then(async (response) => {
          setData((prevState) => ({
            ...prevState,
            videoId: response.data.data.videoId,
            projectTitle: response.data.data.projectTitle,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <h1 className="m-3 ml-5 text-3xl font-bold">
          Project Board : {toCamelCase(data.projectTitle)}
        </h1>
        <hr />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
        <div
          onClick={() => handleClick("video")}
          className="m-3 p-16 card bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Video Review
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white absolute top-5 left-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div
          onClick={() => handleClick("moodboard")}
          className="m-3 p-16 card bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Moodboard
          </span>
        </div>
        <div
          onClick={() => handleClick("voiceover")}
          className="m-3 p-16 card bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Voice Over
          </span>
        </div>
        <div
          onClick={() => handleClick("script")}
          className="m-3 p-16 card bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Script
          </span>
        </div>
        <div
          onClick={() => handleClick("teams")}
          className="m-3 p-16 card bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Teams
          </span>
        </div>
        <div
          onClick={() => handleClick("socsed")}
          className="m-3 p-16 card bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Social Sedules
          </span>
        </div>
        <div
          onClick={() => handleClick("cal")}
          className="m-3 p-16 card bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Deadlines
          </span>
        </div>
        <div
          onClick={() => handleClick("docs")}
          className="m-3 p-16 card bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Other Docs
          </span>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Alert
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={closeModal}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Projectboard;
