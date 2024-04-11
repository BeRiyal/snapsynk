import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';

import Layout from "./Layout";
import AddProject from "./components/AddProject/AddProject.jsx";
import ContactForm from "./components/Contact/ContactForm.jsx";
import Docs from "./components/Docs/Docs.js";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login.jsx";
import MoodBoard from "./components/MoodBoard/MoodBoard.jsx";
import PDFViewer from "./components/PDFViewer/PDFViewer.js";
import ProjectBoard from "./components/ProjectBoard/Projectboard.jsx";
import Register from "./components/Register/Register.jsx";
import Chat from "./components/Teams/Chat.js";
import Video from "./components/Video/Video.jsx";
import reportWebVitals from "./reportWebVitals";
import Sedules from "./components/Sedules/Sedules.jsx";
import AudioPlayer from "./components/Audio/AudioPlayer.jsx";
import { AuthProvider, ProtectedRoute } from "./AuthContext.js";
import App from "./App.js";
import RouteIndex from "./route.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

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

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<Home />} />

//       <Route path="Project/:id" element={<ProjectBoard />} />
//       <Route path="Project/Video" element={<Video />} />
//       <Route path="Project/Moodboard/:id" element={<MoodBoard />} />
//       <Route path="Project/Voiceover" element={<AudioPlayer/>} />
//       <Route path="Project/Script" element={<PDFViewer />} />
//       <Route path="Project/Teams/:id" element={<Chat />} />
//       <Route path="Project/Socialsedules" element={<Sedules />} />
//       <Route path="Project/Deadlines" element={<h1>Deadlines</h1>} />
//       <Route path="Project/Otherdocs" element={<Docs />} />
//       <Route path="Login" element={<Login />} />
//       <Route path="Register" element={<Register />} />
//       <Route path="AddProject" element={<AddProject />} />
//       <Route path="Contact" element={<ContactForm />} />
//     </Route>
//   )
// );

root.render(
  <AuthProvider>
    <RouteIndex />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
