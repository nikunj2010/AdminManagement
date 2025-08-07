import { useContext, useEffect, useState } from "react";
import FlightsContext from "./FlightsContext";
import { useNavigate } from "react-router-dom"; // <-- import this

export default function BookingList() {
  const ctx = useContext(FlightsContext);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); // <-- initialize

  useEffect(() => {
    ctx.getBookings();
  }, [ctx.getBookings]);

  const handleSearch = () => {
    if (userId.trim() === "") {
      ctx.getBookings(); // If input is empty, fetch all
    } else {
      ctx.searchBookings(userId);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8081/bookings/${bookingId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Cancel Booking Response", result);

      if (response.ok) {
        alert("Booking cancelled successfully");
        ctx.getBookings();
      } else {
        alert("Failed to cancel the booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bookings</h2>

      {/* 🔍 Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleSearch}>Search</button>
        <button
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          Go to Home
        </button>
      </div>

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ctx.bookings && ctx.bookings.length > 0 ? (
            ctx.bookings.map((booking) => (
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
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
