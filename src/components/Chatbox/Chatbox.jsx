import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const Chatbox = (props) => {
  return (
        <>
        <div>
            <div className='bg-gray-200	hover:bg-gray-100 m-0'>
                <div className='flex'>
                    <img src="abc.jpg" className='m-2'/> 
                    <div className='m-2'>
                        Roy Patel
                    </div>
                </div>
                <div>
                    {props.Msg}
                </div>
                <Checkbox className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                <label className='py-3 text-blue-600'>completed</label>
            </div>
        </div>
        </>

  )
}

export default Chatbox