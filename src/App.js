import "../src/index.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProjectDashboard from "./components/ProjectBoard/Projectboard";
function App() {
  return (
    <div className="App">
      <Navbar />
      <ProjectDashboard />
    </div>
  );
}

export default App;
