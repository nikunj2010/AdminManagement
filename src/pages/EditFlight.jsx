import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import FlightsContext from "./FlightsContext";

export default function EditFlight() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(FlightsContext);

  useEffect(() => {
    if (!ctx.airports || ctx.airports.length === 0) ctx.getAllAirports();
    if (!ctx.flights || ctx.flights.length === 0) ctx.getFlights();
  }, []);

  const flight = ctx.flights.find((f) => f.id === parseInt(id));

  if (!flight || ctx.airports.length === 0) return <div>Loading...</div>;

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFlight = {
      ...flight,
      flightNumber: e.target.flightNumber.value,
      departureAirport: { id: parseInt(e.target.departureAirportId.value) },
      arrivalAirport: { id: parseInt(e.target.arrivalAirportId.value) },
      departureTime: new Date(e.target.departureTime.value).toISOString(),
      arrivalTime: new Date(e.target.arrivalTime.value).toISOString(),
      boardingGate: e.target.boardingGate.value,
      totalSeats: parseInt(e.target.totalSeats.value),
      availableSeats: parseInt(e.target.availableSeats.value),
      price: parseFloat(e.target.price.value),
    };

    ctx.updateFlight(updatedFlight);
    navigate("/flights");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Flight Number:</strong></label><br />
          <input type="text" name="flightNumber" defaultValue={flight.flightNumber} required />
        </div>

        <div>
          <label><strong>Departure Airport:</strong></label><br />
          <select name="departureAirportId" defaultValue={flight.departureAirport?.id} required>
            <option value="" disabled>-- Select Airport --</option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Arrival Airport:</strong></label><br />
          <select name="arrivalAirportId" defaultValue={flight.arrivalAirport?.id} required>
            <option value="" disabled>-- Select Airport --</option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Departure Time:</strong></label><br />
          <input
            type="datetime-local"
            name="departureTime"
            defaultValue={formatDateTimeLocal(flight.departureTime)}
            min={getMinDateTime()}
            required
          />
        </div>

        <div>
          <label><strong>Arrival Time:</strong></label><br />
          <input
            type="datetime-local"
            name="arrivalTime"
            defaultValue={formatDateTimeLocal(flight.arrivalTime)}
            min={getMinDateTime()}
            required
          />
        </div>

        <div>
          <label><strong>Boarding Gate:</strong></label><br />
          <input type="text" name="boardingGate" defaultValue={flight.boardingGate} required />
        </div>

        <div>
          <label><strong>Total Seats:</strong></label><br />
          <input type="number" name="totalSeats" defaultValue={flight.totalSeats} required />
        </div>

        <div>
          <label><strong>Available Seats:</strong></label><br />
          <input type="number" name="availableSeats" defaultValue={flight.availableSeats} required />
        </div>

        <div>
          <label><strong>Price:</strong></label><br />
          <input type="number" name="price" step="0.01" defaultValue={flight.price} required />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>Save Changes</button>
        <button type="button" onClick={() => navigate("/flights")} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
}
