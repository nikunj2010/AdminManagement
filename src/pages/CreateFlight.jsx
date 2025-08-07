import { useContext, useEffect, useState } from "react";
import FlightsContext from "./FlightsContext";
import { useNavigate } from "react-router-dom";

export default function CreateFlight() {
  const ctx = useContext(FlightsContext);
  useEffect(() => {
  console.log("Updated airplanes from context:", ctx.airplanes);
}, [ctx.airplanes]);

  const navigate = useNavigate();

  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleDepartureChange = (e) => {
    const value = e.target.value;
    setDepartureTime(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const departureAirportId = parseInt(e.target.departureAirportId.value);
    const arrivalAirportId = parseInt(e.target.arrivalAirportId.value);
    const airplaneId = parseInt(e.target.airplaneId.value);
    const totalSeats = parseInt(e.target.totalSeats.value);
    const availableSeats = parseInt(e.target.availableSeats.value);
    const price = parseFloat(e.target.price.value);

    // Validation: Arrival must be after departure
    if (new Date(arrivalTime) <= new Date(departureTime)) {
      alert("Arrival time must be after departure time.");
      return;
    }

    // Validation: Departure and arrival airport must be different
    if (departureAirportId === arrivalAirportId) {
      alert("Departure and arrival airports must be different.");
      return;
    }

    // Validation: totalSeats ≥ availableSeats
    if (totalSeats < availableSeats) {
      alert("Available seats cannot exceed total seats.");
      return;
    }

    // Validation: price > 0
    if (price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    const newFlight = {
      flightNumber: e.target.flightNumber.value,
      departureAirport: { id: departureAirportId },
      arrivalAirport: { id: arrivalAirportId },
      airplane: { id: airplaneId },
      departureTime: new Date(departureTime).toISOString(),
      arrivalTime: new Date(arrivalTime).toISOString(),
      boardingGate: e.target.boardingGate.value,
      totalSeats: totalSeats,
      availableSeats: availableSeats,
      price: price,
      cancelled: false,
    };

    ctx.createNewFlight(newFlight);
    navigate("/flights");
  };

  const handleCancel = () => {
    navigate("/flights");
  };

  // Fetch airports and airplanes
  useEffect(() => {
    if (ctx.airports.length === 0) ctx.getAllAirports();
    if (ctx.airplanes.length === 0) ctx.getAirplanes();
  }, []);

  if (ctx.airports.length === 0 || ctx.airplanes.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Flight Number:</strong></label><br />
          <input type="text" name="flightNumber" required />
        </div>

        <div>
          <label><strong>Departure Airport:</strong></label><br />
          <select name="departureAirportId" required>
            <option value="" disabled>-- Select Airport --</option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Arrival Airport:</strong></label><br />
          <select name="arrivalAirportId" required>
            <option value="" disabled>-- Select Airport --</option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Airplane:</strong></label><br />
          <select name="airplaneId" required>
            <option value="" disabled>-- Select Airplane --</option>
            {ctx.airplanes.map((airplane) => (
              <option key={airplane.id} value={airplane.id}>{airplane.modelNumber}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Departure Time:</strong></label><br />
          <input
            type="datetime-local"
            name="departureTime"
            value={departureTime}
            onChange={handleDepartureChange}
            min={getMinDateTime()}
            required
          />
        </div>

        <div>
          <label><strong>Arrival Time:</strong></label><br />
          <input
            type="datetime-local"
            name="arrivalTime"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            min={getMinDateTime()} // Still requires valid time, logic checked in submit
            required
          />
        </div>

        <div>
          <label><strong>Boarding Gate:</strong></label><br />
          <input type="text" name="boardingGate" required />
        </div>

        <div>
          <label><strong>Total Seats:</strong></label><br />
          <input type="number" name="totalSeats" required min={1} />
        </div>

        <div>
          <label><strong>Available Seats:</strong></label><br />
          <input type="number" name="availableSeats" required min={0} />
        </div>

        <div>
          <label><strong>Price:</strong></label><br />
          <input type="number" name="price" step="0.01" required min={1} />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Create Flight
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: "10px", marginTop: "15px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
