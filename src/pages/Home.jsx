import { useState } from "react";
import FlightsContext from "./FlightsContext";
import axios from "axios";
import FlightTable from "./FlightTable";
import EditFlight from "./EditFlight";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home() {

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);


  //Get all flights
  const getFlights = function () {
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
  };

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
    axios.get("http://localhost:8080/flights/airports")
    .then(response => {
        console.log("airport data")
        // console.log(response.data.data);
        setAirports(response.data.data);
    })
    .catch((err) => {
        console.error("Fetch error:", err.message);
        setError(err.message);
      });
  }

  //Update Flights
  const updateFlight = (flight) => {
  axios.put("http://localhost:8080/flights", flight)
    .then(response => {
      console.log("Flight updated successfully:", response.data);
      // You can add logic to refresh data or show success message
    })
    .catch(error => {
      console.error("Error updating flight:", error);
      // Handle error, show message, etc.
    });
};

  //Delete flights
  const deleteFlight = (flightNumber) => {
    axios.delete("http://localhost:8080/flights?flightNumber = ", flightNumber)
    .then(response => {
      
    })
  }

  return (
    <FlightsContext.Provider
      value={{ flights, setFlights, getFlights, searchFlights, getAllAirports, airports, updateFlight }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlightTable />} />
          <Route path="/flight/:id" element={<EditFlight />} />
        </Routes>
      </BrowserRouter>
    </FlightsContext.Provider>
  );
}
