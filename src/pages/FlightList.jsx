import { useContext, useEffect, useState } from "react";
import FlightsContext from "./FlightsContext";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function FlightList() {
  const ctx = useContext(FlightsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ctx.getFlights();
  }, [ctx.getFlights]);

  const headerStyle = {
    border: "1px solid black",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  const handleClick = () => {
    const flightNumber = searchTerm.trim();
    if (flightNumber === "") {
      ctx.getFlights();
    } else {
      ctx.searchFlights(flightNumber);
    }
  };

  const handleEdit = (id) => {
    navigate(`/flights/${id}`);
  };

  const handleCreate = () => {
    navigate("/flights/new");
  };

  const handleCancel = async (flightId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this flight?"
    );
    if (!confirmed) return;

    const url = "http://localhost:8080/flights?flightId=" + flightId;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Flight cancelled successfully");
        ctx.getFlights(); // refresh list
      } else {
        alert("Failed to cancel the flight");
      }
    } catch (error) {
      console.error("Error cancelling flight:", error);
      alert("Something went wrong");
    }
  };

  const flights = ctx.flights;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search by Flight Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ margin: "10px 0", padding: "6px", width: "250px" }}
        />
        <div>
          <button onClick={handleClick} className="btn btn-secondary me-2">
            Search
          </button>
          <button
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          Go to Home
        </button>
          <button onClick={handleCreate} className="btn btn-success">
            Create Flight
          </button>
        </div>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={headerStyle}>Flight Number</th>
            <th style={headerStyle}>Departure Airport Name</th>
            <th style={headerStyle}>Arrival Airport Name</th>
            <th style={headerStyle}>Departure Time</th>
            <th style={headerStyle}>Arrival Time</th>
            <th style={headerStyle}>Boarding Gate</th>
            <th style={headerStyle}>Available Seats</th>
            <th style={headerStyle}>Price</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td style={cellStyle}>{flight.flightNumber}</td>
              <td style={cellStyle}>{flight.departureAirport.name}</td>
              <td style={cellStyle}>{flight.arrivalAirport.name}</td>
              <td style={cellStyle}>
                {new Date(flight.departureTime).toLocaleString()}
              </td>
              <td style={cellStyle}>
                {new Date(flight.arrivalTime).toLocaleString()}
              </td>
              <td style={cellStyle}>{flight.boardingGate}</td>
              <td style={cellStyle}>{flight.availableSeats}</td>
              <td style={cellStyle}>₹{flight.price}</td>
              <td style={cellStyle}>
                {flight.cancelled ? "Cancelled" : "Scheduled"}
              </td>
              <td style={cellStyle}>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(flight.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(flight.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
