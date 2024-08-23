import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="wrapper">
      <div>
        <Header />
        <HomePage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
