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

import mic from "../../Assets/svg/mic.svg";
import video from "../../Assets/svg/video.svg";
import moodboard from "../../Assets/svg/moodboard.svg";
import scrpit from "../../Assets/svg/script.svg";
import sedules from "../../Assets/svg/sedules.svg";
import teams from "../../Assets/svg/teams.svg";
import docs from "../../Assets/svg/docs.svg";
import Loader from "../Loader";

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
        navigate(`../project/VoiceOver/?pid=${id}&aid=${data.audioId}`);
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("isSession")) {
      window.location.replace("/Login");
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={video} />
          </span>
        </div>
        <div
          onClick={() => handleClick("moodboard")}
          className="m-3 p-16 card bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Moodboard
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={moodboard} />
          </span>
        </div>
        <div
          onClick={() => handleClick("voiceover")}
          className="m-3 p-16 card bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Voice Over
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={mic} />
          </span>
        </div>
        <div
          onClick={() => handleClick("script")}
          className="m-3 p-16 card bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Script
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={scrpit} />
          </span>
        </div>
        <div
          onClick={() => handleClick("teams")}
          className="m-3 p-16 card bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Teams
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={teams} />
          </span>
        </div>
        <div
          onClick={() => handleClick("socsed")}
          className="m-3 p-16 card bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Social Sedules
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={sedules} />
          </span>
        </div>
        <div
          onClick={() => handleClick("docs")}
          className="m-3 p-16 card bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-xl relative"
        >
          <span className="text-white font-bold text-xl absolute bottom-5 right-5">
            Other Docs
          </span>
          <span className="w-20 text-white absolute top-5 left-5">
            <img src={docs} />
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
