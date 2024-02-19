import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@material-tailwind/react"

const Project = () => {
    return(
        <div className="flex flex-col bg-white-800 w-[300px] h-[200px] rounded m-5 shadow-lg border rounded-md">
           <img src="123.jpg" className="justify-top h-[100%] w-[100%]"/>
            <div className="flex flex-row justify-between">
                <h2 className="">project</h2>
                <h3 className="">team</h3>
            </div>
        </div>
    )
} 
export default Project;