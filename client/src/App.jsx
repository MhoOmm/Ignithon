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
import UuidCard from "../components/UuidCard";
import Footer from "../components/Footer";
import TestBooking from "../components/TestBooking";
import DoctorBooking from "../components/DoctorBooking";





function App() {
   useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <Router>
      <div className="h-screen w-full">
        <Routes>
          {/* Home route with Navbar */}
          
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Home />
                <ChatDesc/>
                <Footer/>
              </>
            }
          />

          {/* Signup route */}
          <Route path="/signup" element={<Register />} />

          {/* signin route */}
          <Route path="/" element={<Login />} />

          {/* Mindcare Chat route with Navbar */}
          <Route
            path="/mindcare"
            element={
              <>
                <Navbar />
                <ChatAi />
                <Footer/>
              </>
            }
          />

          <Route
            path="/riskform"
            element={
              <>
                <Navbar />
                <RiskPredictorForm />
                <Footer/>
              </>
            }
          />

          <Route
            path="/Uidcard"
            element={
              <>
                <UuidCard/>
                <Footer/>
              </>
            }
          />

           <Route path="/testbooking" element={<>
            <Navbar />
            <TestBooking />
            <Footer/>
           </>} />

           <Route path="/doctor" element={
            <>
               <Navbar />
              <DoctorBooking />
              <Footer/>
            </>
           } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
