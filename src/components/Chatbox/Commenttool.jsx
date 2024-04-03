import axios from "axios";
import React, { useState } from "react";
import avatar from "../../Assets/avatar.jpeg";

const Commenttool = ({ addReviewFunction, setPlaying, TimeStamp, pid }) => {
  let [Message, setMessage] = useState();
  let [ifChecked, setCheckbox] = useState("pending");

  function handelCheckbox(e) {
    setCheckbox(e.target.checked);
  }
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFocus = (e) => {
    console.log("roewihtio");
    setPlaying(true);
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if necessary
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
    return `${hours}:${minutes}`;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (Message) {
      const newobj = {
        projectId: pid,
        message: Message,
        msgTime: getCurrentTime(),
        timeStamp: TimeStamp,
        userName: localStorage.getItem("UserId"),
        status: ifChecked.toString(),
      };
      addReviewFunction(newobj);
      await axios
        .post("../../api/reviews/add", newobj)
        .then((response) => {
          console.log("reviews response", response);
          setTimeout(() => {
            setMessage("");
          }, 500);
        })
        .catch((error) => {
          console.log("error ->", error);
        });
    }
  };

  return (
    <div className="mt-5 ">
      <form onSubmit={handleClick}>
        <div className="flex flex-row">
          <img className="rounded-full  m-2 h-[50px] " src={avatar} alt="img" />
          <input
            onChange={handleChange}
            placeholder="Add Your Review"
            className="border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300 w-full text-xl font-medium"
          />
        </div>
        <div className="flex flex-row justify-between items-center mt-5">
          <span className="px-2">
            <label className="inline-flex items-center ">
              <input
                onChange={handelCheckbox}
                type="checkbox"
                onClick={handleFocus}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="m-2 text-indigo-700 font-semibold rounded-lg">
                {TimeStamp ? TimeStamp : "0:00"}
              </span>
            </label>
          </span>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Commenttool;
