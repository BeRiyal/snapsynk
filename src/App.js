import './App.css';
import '../src/index.css'
import Navbar from './components/Navbar/Navbar';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ProjectDashboard />
    </div>
  );
}

export default App;
