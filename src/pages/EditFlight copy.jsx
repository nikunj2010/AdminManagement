import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import FlightsContext from "./FlightsContext";

export default function EditFlight() {
useEffect(() => {
    if (!ctx.airports || ctx.airports.length === 0) {
      ctx.getAllAirports();
    }
  });

  const { id } = useParams();
  const ctx = useContext(FlightsContext);
  const flight = ctx.flights.find((f) => f.id === parseInt(id));

  if (!flight) {
    return <div>Flight not found.</div>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Flight Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // You can write save logic here using e.target.elements

          console.log("Saving changes...");
        }}
      >
        <div>
          <label>
            <strong>Flight Number:</strong>
          </label>
          <br />
          <input
            type="text"
            name="flightNumber"
            defaultValue={flight.flightNumber}
          />
        </div>

        <div>
          <label>
            <strong>Departure:</strong>
          </label>
          <br />
          <input
            type="text"
            name="departureAirportName"
            defaultValue={flight.departureAirport.id}
          />
        </div>

        <div>
          <label>
            <strong>Arrival:</strong>
          </label>
          <br />
          <input
            type="text"
            name="arrivalAirportName"
            defaultValue={flight.arrivalAirport.id}
          />
        </div>

        <div>
          <label>
            <strong>Departure Time:</strong>
          </label>
          <br />
          <input
            type="datetime-local"
            name="departureTime"
            defaultValue={new Date(flight.departureTime)
              .toISOString()
              .slice(0, 16)}
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
            defaultValue={new Date(flight.arrivalTime)
              .toISOString()
              .slice(0, 16)}
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
          />
        </div>

        <div>
          <label>
            <strong>Price:</strong>
          </label>
          <br />
          <input type="number" name="price" defaultValue={flight.price} />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
