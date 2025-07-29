import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import FlightsContext from "./FlightsContext";
import { useNavigate } from "react-router-dom";

export default function EditFlight() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(FlightsContext);

  useEffect(() => {
    if (!ctx.airports || ctx.airports.length === 0) {
      ctx.getAllAirports();
    }
    if (!ctx.flights || ctx.flights.length === 0) {
      ctx.getAllFlights?.();
    }
  }, [ctx]);

  const flight = ctx.flights.find((f) => f.id === parseInt(id));

  if (!flight || ctx.airports.length === 0) {
    return <div>Loading...</div>;
  }

  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFlight = {
      ...flight,
      flightNumber: e.target.flightNumber.value,
      departureAirport: {
        id: parseInt(e.target.departureAirportId.value),
      },
      arrivalAirport: {
        id: parseInt(e.target.arrivalAirportId.value),
      },
      departureTime: new Date(e.target.departureTime.value).toISOString(),
      arrivalTime: new Date(e.target.arrivalTime.value).toISOString(),
      boardingGate: e.target.boardingGate.value,
      totalSeats: parseInt(e.target.totalSeats.value),
      availableSeats: parseInt(e.target.availableSeats.value),
      price: parseFloat(e.target.price.value),
      cancelled: e.target.cancelled.value,
    };

    ctx.updateFlight(updatedFlight);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Flight Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Flight Number:</strong>
          </label>
          <br />
          <input
            type="text"
            name="flightNumber"
            defaultValue={flight.flightNumber}
            required
          />
        </div>

        <div>
          <label>
            <strong>Departure Airport:</strong>
          </label>
          <br />
          <select
            name="departureAirportId"
            defaultValue={flight.departureAirport?.id}
            required
          >
            <option value="" disabled>
              -- Select Airport --
            </option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <strong>Arrival Airport:</strong>
          </label>
          <br />
          <select
            name="arrivalAirportId"
            defaultValue={flight.arrivalAirport?.id}
            required
          >
            <option value="" disabled>
              -- Select Airport --
            </option>
            {ctx.airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <strong>Departure Time:</strong>
          </label>
          <br />
          <input
            type="datetime-local"
            name="departureTime"
            defaultValue={formatDateTimeLocal(flight.departureTime)}
            required
          />
        </div>

        <div>
          <label>
            <strong>Arrival Time:</strong>
          </label>
          <br />
          <input
            type="datetime-local"
            name="arrivalTime"
            defaultValue={formatDateTimeLocal(flight.arrivalTime)}
            required
          />
        </div>

        <div>
          <label>
            <strong>Boarding Gate:</strong>
          </label>
          <br />
          <input
            type="text"
            name="boardingGate"
            defaultValue={flight.boardingGate}
            required
          />
        </div>

        <div>
          <label>
            <strong>Total Seats:</strong>
          </label>
          <br />
          <input
            type="number"
            name="totalSeats"
            defaultValue={flight.totalSeats}
            required
          />
        </div>

        <div>
          <label>
            <strong>Available Seats:</strong>
          </label>
          <br />
          <input
            type="number"
            name="availableSeats"
            defaultValue={flight.availableSeats}
            required
          />
        </div>

        <div>
          <label>
            <strong>Price:</strong>
          </label>
          <br />
          <input
            type="number"
            name="price"
            step="0.01"
            defaultValue={flight.price}
            required
          />
        </div>

        <div>
          <label>
            <strong>Status:</strong>
          </label>
          <br />
          <select
            name="cancelled"
            defaultValue={flight.cancelled ? "true" : "false"}
            disabled
          >
            <option value="false">Scheduled</option>
            <option value="true">Cancelled</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#ccc", color: "#000", marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
