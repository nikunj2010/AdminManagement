import axios from "axios";
import EditFlight from "./pages/EditFlight";
import FlightList from "./pages/FlightList";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCallback, useState } from "react";
import FlightsContext from "./pages/FlightsContext";
import BookingList from "./pages/BookingList";
import CreateFlight from "./pages/CreateFlight";

function App() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [airplanes, setAirplanes] = useState([]); // ✅ NEW
  const [error, setError] = useState(null);

  const getFlights = useCallback(() => {
    axios
      .get("http://localhost:8080/flights")
      .then((response) => {
        setFlights(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  }, []);

  const searchFlights = (flightNumber) => {
    const url = "http://localhost:8080/flights/" + flightNumber;
    axios
      .get(url)
      .then((response) => {
        setFlights(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };

const createNewFlight = (flight) => {
  axios
    .post("http://localhost:8080/flights", flight)
    .then((response) => {
      console.log("Flight created successfully:", response.data);
      // Optionally refresh flight list
      getFlights();
    })
    .catch((error) => {
      console.error("Error creating flight:", error);
      setError(error.message);
    });
};


  const getAllAirports = () => {
    axios
      .get("http://localhost:8080/flights/airports")
      .then((response) => {
        setAirports(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };

  const getAirplanes = () => { // ✅ NEW FUNCTION
    axios
      .get("http://localhost:8080/flights/airplanes")
      .then((response) => {
        setAirplanes(response.data.data);
        console.log(response.data.data);
        console.log(airplanes)
        console.log("get airplanes called")
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  };

  const updateFlight = (flight) => {
    axios
      .put("http://localhost:8080/flights", flight)
      .then((response) => {
        console.log("Flight updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating flight:", error);
      });
  };

  const getBookings = useCallback(() => {
    axios
      .get("http://localhost:8081/bookings")
      .then((response) => {
        setBookings(response.data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  }, []);

  const searchBookings = (userId) => {
    const url = "http://localhost:8081/bookings/" + userId;
    axios
      .get(url)
      .then((response) => {
        setBookings(response.data.data);
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
        createNewFlight,
        airports,
        updateFlight,
        getBookings,
        searchBookings,
        bookings,
        setBookings,
        airplanes,        // ✅ NEW
        getAirplanes,     // ✅ NEW
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flights/:id" element={<EditFlight />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/flights/new" element={<CreateFlight />} />
        </Routes>
      </BrowserRouter>
    </FlightsContext.Provider>
  );
}

export default App;
