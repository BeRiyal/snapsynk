import React from 'react'
import { Outlet,Link } from 'react-router-dom'

const Projectboard = () => {

    
  return (
    <>
    <div className='grid grid-cols-12 gap-4 m-3'>
        <Link to='Video' className='col-span-3 m-3 p-3 card bg-white rounded shadow flex flex-col justify-between'>
            <img src='abc.jpg' />
            <span className=''>
                Video Review
            </span>
        </Link>
        <div className='col-span-9'>
            <div className='grid grid-cols-3 gap-3'>
                <Link to='Moodboard' className='m-3 p-3 card bg-white rounded shadow flex flex-row'>Moodboard</Link>
                <Link to='Voiceover' className='m-3 p-3 card bg-white rounded shadow'>Voice Over</Link>
                <div className='m-3 p-3 card bg-white rounded shadow'>Script</div>
                <div className='m-3 p-3 card bg-white rounded shadow'>Teams</div>
                <div className='m-3 p-3 card bg-white rounded shadow'>Social Sedules</div>
                <div className='m-3 p-3 card bg-white rounded shadow'>Deadlines</div>
                <div className='m-3 p-3 card bg-white rounded shadow'>Other Docs</div>
            </div>
        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Projectboard