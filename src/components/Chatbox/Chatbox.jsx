import { Checkbox } from '@material-tailwind/react'
import React from 'react'
import avatar from '../../Assets/avatar.jpeg';

const Chatbox = (props) => {
    console.log(props.obj);
    function handleReviewClick(timeStamp){
    }
  const dateString = "2024-03-27T12:00:00";
  const date = new Date(dateString);

// Function to get ordinal suffix for day
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Function to get month abbreviation
function getMonthAbbreviation(month) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month];
}

function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

  return (
    <>
      <div>
        <div
          onClick={handleReviewClick(props.obj.msgTime)}
          className="bg-gray-200	hover:bg-gray-100 m-0"
        >
          <div className="flex justify-between">
            <span className="flex">
              <img className="rounded-full  m-2 h-[30px] " src={avatar}/>
              <span className="my-2 font-bold">Roy Patel</span>
            </span>
            <span className="p-2 ">{`${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`}</span>
          </div>
          <div>
            <span className="p-2 font-semibold text-blue-900 text-indigo-600 ">
              {props.obj.timeStamp}
            </span>
            <span>{props.obj.message}</span>
          </div>
          <span className='px-2'>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                
              />
              <span className="m-2 text-gray-700 rounded-lg">Completed</span>
            </label>
          </span>
        </div>
      </div>
    </>
  );
}

export default Chatbox