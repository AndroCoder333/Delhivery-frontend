import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import RiderListing from "./screen/RiderManagment/RiderListing";
import AddNewRider from "./screen/RiderManagment/AddNewRider";
import RiderDetails from "./screen/RiderManagment/RiderDetails";
import UpdateRider from "./screen/RiderManagment/UpdateRider";
import DeliveryHistoryList from "./screen/RiderManagment/DelhiveryHistoryList";
import AddDelhiveryHistory from "./screen/RiderManagment/AddDelhiveryHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/rider-listing" element={<RiderListing />} />
        <Route path="/add-new-rider" element={<AddNewRider />} />
        <Route path="/rider-details/:id" element={<RiderDetails />} />
        <Route path="/update-details/:id" element={<UpdateRider />} />
        <Route path="/delhivery-history/:riderId" element={<DeliveryHistoryList />} />
        <Route path="/add-delhivery-history/:riderId" element={<AddDelhiveryHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
