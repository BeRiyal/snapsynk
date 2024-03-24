import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import ProjectBoard from './components/ProjectBoard/Projectboard.jsx';
import Video from './components/Video/Video.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AddProject from './components/AddProject/AddProject.jsx';
import MoodBoard from './components/MoodBoard/MoodBoard.jsx';
import PDFViewer from './components/PDFViewer/PDFViewer.js';
import Chat from './components/Teams/Chat.js';
import Docs from './components/Docs/Docs.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// route for navigation simulation
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children:[
//       {
//         path:'',
//         element:<Project/>
//       },
//       {
//         path:'/project',
//         element:<ProjectDashboard/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    
    
    <Route path='/' element={<Layout />}>

    <Route path='' element={<Home />} />
    
    <Route path='Project/:id' element={<ProjectBoard/>} />
    <Route path='Project/Video/:id' element={<Video/>} />
    <Route path='Project/Moodboard' element={<MoodBoard />} />
    <Route path='Project/Voiceover' element={<h1>VoiceOver</h1>} />
    <Route path='Project/Script' element={<PDFViewer />} />
    <Route path='Project/Teams' element={<Chat />} />
    <Route path='Project/Socialsedules' element={<h1>Social Sedules</h1>} />
    <Route path='Project/Deadlines' element={<h1>Deadlines</h1>} />
    <Route path='Project/Otherdocs' element={<Docs />} />
    <Route path='Login' element={<Login />} />
    <Route path='Register' element={<Register />} />
    <Route path='AddProject' element={<AddProject />} />
    </Route>
  )
)


root.render(
      <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
