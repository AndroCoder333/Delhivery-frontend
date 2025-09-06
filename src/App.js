import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/rider-management" element={<RiderManagement />} />
        <Route path="/expense-management" element={<ExpenseManagement />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
