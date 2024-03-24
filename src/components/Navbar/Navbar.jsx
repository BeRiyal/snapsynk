import React, { useState } from "react";
import '../../index.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Logo_SnapSynk.png"

function Navbar(){

    const [profilecardVisible,setPCVisible] = useState();
    const navigate = useNavigate();

    function handleLogOut(){
        localStorage.removeItem("isSession")
        if(! localStorage.getItem("isSession")){
            navigate("/Login");
        }
    }

    function HendleProfileClick(){
        setPCVisible((prev)=>!prev)
    }

    return (
      <div className="flex flex-row w-[100%] justify-between bg-sky-50 py-2 px-3 navbar">
        <div className="justify-start bg-red px-3">
          <Link to="" className="flex row font-extrabold text-lg">
            <img src={logo} className="w-[50px]" />
            <span>Snap Synk</span>
          </Link>
        </div>
        <div className="flex items-center">
          <nav className="text-lg font-semibold">
            {!localStorage.getItem("isSession") ? (
              <>
                <Link to="Login" className="mx-6" href="#">
                  Login
                </Link>
                <Link to="Register" className="mx-3" href="#">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogOut} className="mx-6" href="#">
                Logout
              </button>
            )}
          </nav>
          
          <div className="flex items-center">
            <img src="path/to/image.jpg" />
            <div>
              <strong className="block">
                {localStorage.getItem("UserName")}
              </strong>
              <span>{localStorage.getItem("UserType")}</span>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Navbar;