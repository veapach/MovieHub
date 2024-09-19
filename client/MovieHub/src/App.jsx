import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import FilmPage from "./pages/filmPage/filmPage";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import AllFilmsPage from "./pages/allFilmsPage/AllFilmsPage"

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/films" element={<AllFilmsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
