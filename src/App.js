import './App.css';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Story from './pages/Story';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/story" element={<Story/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
