import React from "react";
import '../../index.css';
import { Link } from "react-router-dom";

function Navbar(){
    return (
            <div className="flex flex-row w-[100%] justify-between bg-sky-50 py-6 navbar">
                <div className="justify-start bg-red px-3">
                    <img src="hello.jpg" />
                </div>
                <div className="flex items-center">

                    <nav className="text-lg font-semibold">
                        <Link to="" className="mx-6" href="#">Login</Link>
                        <Link to="Project" className="mx-3" href="#">Register</Link>
                        <Link className="mx-6" href="#">Logout</Link>
                    </nav>
                    <div className="flex items-center">
                        <img src="path/to/image.jpg" />
                        <div>
                            <strong className="block">Andrew Alfred</strong>
                            <span>Technical advisor</span>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Navbar;