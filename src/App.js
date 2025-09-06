import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import RiderListing from "./screen/RiderManagment/RiderListing";
import AddNewRider from "./screen/RiderManagment/AddNewRider";
import RiderDetails from "./screen/RiderManagment/RiderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/rider-listing" element={<RiderListing />} />
        <Route path="/add-new-rider" element={<AddNewRider />} />
        <Route path="/rider-details/:id" element={<RiderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
