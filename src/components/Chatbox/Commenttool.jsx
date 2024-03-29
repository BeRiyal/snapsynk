import { Checkbox, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import avatar from '../../Assets/avatar.jpeg';
import axios from 'axios';

const Commenttool = ({addReviewFunction, setPlaying,TimeStamp,pid}) => {

    let [Message, setMessage] = useState();
    let [timeStamp,setTimeStamp] = useState();

    const handleChange = (e) =>{
        setMessage(e.target.value)
        setTimeStamp(String(TimeStamp).substring(0,4))
        console.log(Message)        
    }

    const handleFocus = (e) => {
            setPlaying(true)
    }

    function getCurrentTime(){
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if necessary
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if necessary
        return `${hours}:${minutes}`;
    }
    
    const handleClick = async(e) =>{
        e.preventDefault();
        setPlaying(true)
        const newobj=({
                projectId:pid,
                message:Message,
                msgTime:getCurrentTime(),
                timeStamp:timeStamp,
                userName:localStorage.getItem("UserId"),
                status:"pending",
        })
        addReviewFunction(newobj)
        console.log("new obj",newobj)
        axios.post("../../api/reviews/add",newobj)
        .then((response)=>{
          console.log("hii",response);
        })
        .catch((error)=>{
          console.log("error ->",error)
        })
    }
    
    return (
      <div className="grid grid-rows-4 w-full">
        <form onSubmit={handleClick}>
          <div className="grid-rows-1 flex flex-row">
          <img className="rounded-full  m-2 h-[50px] " src={avatar}/>
            <input
              onChange={handleChange}
              onBlur={handleFocus}
              onFocus={handleFocus}
              className="border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300 w-full text-xl font-medium"
            />
          </div>
          <div className="grid-rows-1 flex flex-row justify-between">
            <span className="px-2">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500" 
                />
                <span className="m-2 text-indigo-700 font-semibold rounded-lg">{String(TimeStamp).substring(0,4)}</span>
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
}

export default Commenttool