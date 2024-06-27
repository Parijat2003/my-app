import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AstronomyStuff from './Pages/AstronomyStuff';
import AstronomyStuff1 from './Pages/AstronomyStuff1';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AstronomyStuff2 from './Pages/AstronomyStuff2';
import CMEData from './Pages/CMEData';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<AstronomyStuff />} />
              <Route path="/astronomy-stuff-of-the-day" element={<AstronomyStuff1 />} />
              <Route path="/Asteroids" element={<AstronomyStuff2 />} />
              <Route path="/CMEData" element={<CMEData/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
