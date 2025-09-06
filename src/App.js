import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import RiderListing from "./screen/RiderManagment/RiderListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/rider-listing" element={<RiderListing />} />
        {/* {/* <Route path="/rider-management" element={<RiderManagement />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
