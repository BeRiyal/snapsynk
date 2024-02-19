import React from "react";
import '../index.css';


function Navbar(){
    return (
            <div className=" flex flex-row fixed w-[100%] justify-between bg-sky-50 py-6 navbar">
                <div className="justify-start bg-red px-3">
                    <img src="hello.jpg" />
                </div>
                <nav className="text-lg font-semibold">
                    <a className="mx-6" href="#">Home</a>
                    <a className="mx-3" href="#">Video</a>
                    <a className="mx-6" href="#">Audio</a>
                </nav>
            </div>
    );
}
export default Navbar;