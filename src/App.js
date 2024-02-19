import './App.css';
import '../src/index.css'
import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  return (
    <div className="App">
      <ProjectDashboard />
      <Navbar/>
    </div>
  );
}

export default App;
