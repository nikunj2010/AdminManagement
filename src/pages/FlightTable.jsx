import { useContext, useState } from "react";
import FlightsContext from "./FlightsContext";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function FlightTable() {
  const ctx = useContext(FlightsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
      console.log("fetching all");
      ctx.getFlights();
    } else {
      console.log("value = " + flightNumber);
      console.log("searching...");
      ctx.searchFlights(flightNumber);
    }
  };

  const handleEdit = (id) => {
    navigate(`/flight/${id}`);
  };

  const flights = ctx.flights;

  return (
    <>
      <input
        type="text"
        placeholder="Search by Flight Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "10px 0", padding: "6px", width: "250px" }}
        id="search-btn"
      />
      <button onClick={handleClick}>Search</button>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
