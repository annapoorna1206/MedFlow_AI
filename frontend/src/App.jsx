import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import Queue from "./pages/Queue";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Doctor from "./pages/Doctor";
import Recommend from "./pages/Recommend";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/queue" element={<Queue />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/analytics" element={<Analytics />} />

    </Routes>

  );

}

export default App;