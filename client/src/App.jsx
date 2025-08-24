import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Register from "../components/Register";
import ChatAi from "../components/ChatAi";
import RiskPredictorForm from "../components/RiskForm";
import DashboardChat from "../components/DashboardChat";
import ChatDesc from "../components/ChatDesc";
import Login from "../components/Login"
import { useEffect } from "react";




function App() {
   useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
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
                <ChatDesc/>
              </>
            }
          />

          {/* Signup route */}
          <Route path="/signup" element={<Register />} />

          {/* signin route */}
          <Route path="/signin" element={<Login />} />

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
}

export default App;
