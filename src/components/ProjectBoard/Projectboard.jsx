import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet,Link, useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'

const Projectboard = () => {

    const [data, setData] = useState({
        videoId: '',
        moodBoardId: '',
        voId: '',
        script:'',
        teams:'',
        SocSed:'',
        cal:'',
        docs:''
    });

    let { id } = useParams();
  
    const location = useLocation();

    const navigate = useNavigate();

    function handleClick(type) {
        switch (type) {
            case 'video':
                console.log("Video Id:", data.videoId);
                navigate(`../project/Video/${data.videoId}`);
                break;
            case 'moodboard':
                console.log("Mood Board Id:", data.moodBoardId);
                navigate(`../project/MoodBoard/${data.moodBoardId}`);
                break;
            case 'voiceover':
                console.log("Voice Over Id:", data.voId);
                navigate(`../project/VoiceOver/${data.voId}`);
                break;
            case 'script':
                console.log("Script Id:", data.script);
                navigate(`../project/Script/${data.script}`);
                break;
            case 'teams':
                console.log("Teams Id:", data.teams);
                navigate(`../project/Teams/${data.teams}`);
                break;
            case 'socsed':
                console.log("Social Schedules Id:", data.SocSed);
                navigate(`../project/SocialSedules/${data.SocSed}`);
                break;
            case 'cal':
                console.log("Cal Id:", data.cal);
                navigate(`../project/Calander/${data.cal}`);
                break;
            case 'docs':
                console.log("Docs Id:", data.docs);
                navigate(`../project/Otherdocs/${data.docs}`);
                break;
            default:
                break;
        }
    }
    


    useEffect( () => {
        console.log("Project id",id)
       
        if(! id){
           navigate("/home");
         }
         else{
            
            
            axios.get(`/api/projects/projectById/${id}`)
             .then( async (response) => {
                console.log(response);
                 setData(prevState => ({
                        ...prevState,
                        videoId:response.data.data.videoId
                        
                    }));
                })
                .catch((error) => {
                    console.log(error)
                })
            }
           }
           ,[]);

  return (
    <>
        <div>
            <h1 className='px-3 text-2xl font-bold'>
            </h1>
        </div>
    <div className='grid grid-cols-12 gap-4 m-3'>
        <div onClick={() => handleClick('video')} className='col-span-3 m-3 p-3 card bg-white rounded shadow flex flex-col justify-between'>
            <img src='abc.jpg' />
            <span className=''>
                Video Review
            </span>
        </div>
        <div className='col-span-9'>
            <div className='grid grid-cols-3 gap-3'>
                <div onClick={() => handleClick('moodboard')} className='m-3 p-3 card bg-white rounded shadow flex flex-row'>Moodboard</div>
                <div onClick={() => handleClick('voiceover')} className='m-3 p-3 card bg-white rounded shadow'>Voice Over</div>
                <div onClick={() => handleClick('script')} className='m-3 p-3 card bg-white rounded shadow'>Script</div>
                <div onClick={() => handleClick('teams')} className='m-3 p-3 card bg-white rounded shadow'>Teams</div>
                <div onClick={() => handleClick('socsed')} className='m-3 p-3 card bg-white rounded shadow'>Social Sedules</div>
                <div onClick={() => handleClick('cal')} className='m-3 p-3 card bg-white rounded shadow'>Deadlines</div>
                <div onClick={() => handleClick('docs')} className='m-3 p-3 card bg-white rounded shadow'>Other Docs</div>
            </div>
        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Projectboard