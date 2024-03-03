import { Checkbox, Input } from '@material-tailwind/react'
import React from 'react'

const Commenttool = () => {
  return (
        <div className='grid grid-rows-4 w-full'>
            <div className='grid-rows-1 flex flex-row'>
                <img src="user.jpg" className='m-2' />
                <input className='bg-gray-100 width text-sm rounded-lg focus:ring-blue-500 block w-full ps-10 p-2.5' />
            </div>
            <div className='grid-rows-1 flex flex-row justify-between'>
                <div className='bg-gray-100 p-1 rounded-lg'>
                    <Checkbox className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                    <label className='p-3 text-blue-600'>00:00</label>
                </div>

                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> Send </button>
            </div>
        </div>
  )
}

export default Commenttool