<<<<<<< HEAD
import './App.css'
import UuidCard from '../components/UuidCard'

function App() {
  return (
    <>
    <div>
      <UuidCard></UuidCard>
    </div>
    </>
  )
=======
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Register from "../components/Register";
import ChatAi from "../components/ChatAi";
import RiskPredictorForm from "../components/RiskForm";


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

          {/* Signup route */}
          <Route path="/signup" element={<Register />} />

          {/* Mindcare Chat route with Navbar */}
          <Route
            path="/mindcare"
            element={
              <>
                <Navbar />
                <ChatAi />
              </>
            }
          />

          <Route
            path="/riskform"
            element={
              <>
                <Navbar />
                <RiskPredictorForm />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
>>>>>>> 7355a5d46173ca8c1c0b27b443f70a696a69b717
}

export default App;
