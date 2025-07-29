import { useState } from "react";
import FlightsContext from "./FlightsContext";
import axios from "axios";
import FlightList from "./FlightList";
import EditFlight from "./EditFlight";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  
  const handleFlightClick = () => {
    navigate("/flights");
  };

  const handleBookingClick = () => {
    navigate("/bookings");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Flight Management</h2>
      <button onClick={handleFlightClick} style={{ marginRight: "10px" }}>
        Flight
      </button>
      <button onClick={handleBookingClick}>Booking</button>
    </div>
  );
}
