// App.jsx
import axios from "axios";
import EditFlight from "./pages/EditFlight";
import FlightList from "./pages/FlightList";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useCallback, useState } from "react";
import FlightsContext from "./pages/FlightsContext";
import BookingList from "./pages/BookingList";

function App() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);
  const [bookings, setBookings] = useState([]);

  const getFlights = useCallback(() => {
    axios
      .get("http://localhost:8080/flights")
      .then((response) => {
        const flightsResponse = response.data;
        console.log("Response:", flightsResponse);
        setFlights(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  }, []);

  //Search flights using flight number
  const searchFlights = function (flightNumber) {
    const url = "http://localhost:8080/flights/" + flightNumber;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        const flightsResponse = response.data;
        console.log("Response:", flightsResponse);
        setFlights(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };

  //Get all airports
  const getAllAirports = () => {
    axios
      .get("http://localhost:8080/flights/airports")
      .then((response) => {
        console.log("airport data");
        // console.log(response.data.data);
        setAirports(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };

  //Update Flights
  const updateFlight = (flight) => {
    axios
      .put("http://localhost:8080/flights", flight)
      .then((response) => {
        console.log("Flight updated successfully:", response.data);
        // You can add logic to refresh data or show success message
      })
      .catch((error) => {
        console.error("Error updating flight:", error);
        // Handle error, show message, etc.
      });
  };

  //Get all bookings
  const getBookings = useCallback(() => {
    axios
      .get("http://localhost:8081/bookings")
      .then((response) => {
        const flightsResponse = response.data;
        console.log("Response:", flightsResponse);
        setBookings(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  }, []);

  //Search bookings by user id
  const searchBookings = function (userId) {
    const url = "http://localhost:8081/bookings/" + userId;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        const flightsResponse = response.data;
        console.log("Response:", flightsResponse);
        setFlights(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };
  return (
    <FlightsContext.Provider
      value={{
        flights,
        setFlights,
        getFlights,
        searchFlights,
        getAllAirports,
        airports,
        updateFlight,
        getBookings,
        searchBookings,
        bookings,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flights/:id" element={<EditFlight />} />
          <Route path="/bookings" element={<BookingList />} />
        </Routes>
      </BrowserRouter>
    </FlightsContext.Provider>
  );
}

export default App;
