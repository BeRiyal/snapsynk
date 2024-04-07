import React, { useState } from "react";
import avatar from "../../Assets/avatar.jpeg";
import { checkbox } from "@material-tailwind/react";
import axios from "axios";

const Chatbox = (props) => {
  console.log("this is check box", props);

  const [status, setStatus] = useState(props?.obj?.status == "true");
  function handleReviewClick(timeStamp) {
    props.setPlayed(timeStamp);
  }
  const dateString = "2024-03-27T12:00:00";
  const date = new Date(dateString);

  // Function to get ordinal suffix for day
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Function to get month abbreviation
  function getMonthAbbreviation(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  }

  function addLeadingZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  const checkboxOnchange =async (value) => {
    // await axios
    // .put(`../../api/reviews/${props?.obj?._id}/status`, { status: value.toString() })
    // .then((response) => {
    //   console.log("reviews response", response);

    // })
    // .catch((error) => {
    //   console.log("error ->", error);
    // });

    try {
      const response = await fetch(`../../api/reviews/${props?.obj?._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: value })
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
      }
  
      const updatedReview = await response.json();
      console.log('Updated Review:', updatedReview);
      return updatedReview;
    } catch (error) {
      console.error('Error updating review status:', error.message);
      // Handle error appropriately, e.g., show a notification to the user
    }
    // setStatus(value.target.checked);
  };

  return (
    <>
      <div>
        <div className="bg-gray-200	hover:bg-gray-100 m-0">
          <div onClick={() => handleReviewClick(props.obj.timeStamp)}>
            <div className="flex justify-between">
              <span className="flex">
                <img className="rounded-full  m-2 h-[30px] " src={avatar} />
                <span className="my-2 font-bold">
                  {props?.obj?.userName?.Name ?? ""}
                </span>
                <span className="my-2 font-bold ml-2">
                  {props?.obj?.userName?.Type ?? ""}
                </span>
              </span>
              <span className="p-2 ">{`${addLeadingZero(
                date.getHours()
              )}:${addLeadingZero(date.getMinutes())}`}</span>
            </div>
            <div>
              {props?.obj?.status == "true" ? (
                <span className="p-2 font-semibold text-blue-900 text-indigo-600 ">
                  {props?.obj?.timeStamp}
                </span>
              ) : props?.obj?.status == "pending" ? (
                <span className="p-2 font-semibold text-blue-900 text-indigo-600 invisible">
                  {" "}
                  {props?.obj?.timeStamp}
                </span>
              ) : (
                <span className="p-2 font-semibold text-blue-900 text-indigo-600 invisible">
                  {" "}
                  {props?.obj?.timeStamp}
                </span>
              )}
              <span>{props.obj.message}</span>
            </div>
          </div>

          <span className="px-2">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                checked={status}
                className="form-checkbox h-5 w-5 bg-green-800"
                style={{ backgroundColor: "#4CAF50" }}
                onChange={(e) =>  checkboxOnchange(e)}
              />
              <span className="m-2 text-gray-700 rounded-lg">Completed</span>
            </label>
          </span>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
