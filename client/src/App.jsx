import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Register from "../components/Register";

function App() {
  return (
    <Router>
      <div className="h-screen w-full">
        <Routes>
          {/* Home route with Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/signup" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
