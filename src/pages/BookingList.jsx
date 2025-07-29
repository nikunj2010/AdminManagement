import { useContext, useEffect } from "react";
import FlightsContext from "./FlightsContext";

export default function BookingList() {
  const { bookings, getBookings } = useContext(FlightsContext);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bookings</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Seats</th>
            <th>Total Cost</th>
            <th>Flight No</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.status}</td>
                <td>{booking.noOfSeats}</td>
                <td>{booking.totalCost}</td>
                <td>{booking.flight?.flightNumber}</td>
                <td>{booking.flight?.departureTime}</td>
                <td>{booking.flight?.arrivalTime}</td>
                <td>{booking.flight?.boardingGate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
