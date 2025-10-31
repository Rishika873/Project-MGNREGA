import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PersonalInfo from "./components/PersonalInfo";
import Settings from "./components/Settings";
import Help from "./components/Help";
import ForgetPassword from "./components/ForgetPassword";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;
