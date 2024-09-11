import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import FilmPage from "./pages/filmPage/filmPage";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
