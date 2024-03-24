import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const [user,setUser] = React.useState("riyal")
    return (
            <>
                <Navbar  />
                
                <Outlet />

            </>
        )
}

export default Layout