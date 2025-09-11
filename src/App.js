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
import DebtManagement from "./screen/RiderManagment/DebtManagement";
import PaidHistoryList from "./screen/RiderManagment/PaidHistoryList";
import ExpanseProfitList from "./screen/ExpanceManagment/ExpanseProfitList";
import AddExpenseProfit from "./screen/ExpanceManagment/AddExpenseProfit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/rider-listing" element={<RiderListing />} />
        <Route path="/add-new-rider" element={<AddNewRider />} />
        <Route path="/rider-details/:id" element={<RiderDetails />} />
        <Route path="/update-details/:id" element={<UpdateRider />} />
        <Route path="/delhivery-history/:riderId" element={<DeliveryHistoryList />}  />
        <Route path="/add-delhivery-history/:riderId" element={<AddDelhiveryHistory />}/>
        <Route path="/debt-management/:riderId" element={<DebtManagement />} />
        <Route path="/paid-history/:riderId" element={<PaidHistoryList />} />
        <Route path="/expence-profit" element={<ExpanseProfitList />} />
        <Route path="/add-expence-profit" element={<AddExpenseProfit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
