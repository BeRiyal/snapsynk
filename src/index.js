import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import ProjectBoard from './components/ProjectBoard/Projectboard.jsx';
import Video from './components/Video/Video.jsx';


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

      <Route path='' element={<Home/>}/>

      <Route path='Project' element={<ProjectBoard/>} />
        <Route path='Project/Video' element={<Video />} />
        <Route path='Project/Moodboard' element={<h1>MoodBoard</h1>} />
        <Route path='Project/Voiceover' element={<h1>VoiceOver</h1>} />
        <Route path='Project/Script' element={<h1>Script</h1>} />
        <Route path='Project/Teams' element={<h1>Teams</h1>} />
        <Route path='Project/Socialsedules' element={<h1>Social Sedules</h1>} />
        <Route path='Project/Deadlines' element={<h1>Deadlines</h1>} />
        <Route path='Project/Otherdocs' element={<h1>Other Docs</h1>} />
    </Route>
  )
)


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
