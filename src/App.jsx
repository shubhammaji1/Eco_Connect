import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import { VendorVault } from "./pages/VendorVault";
import AboutUs from "./pages/AboutUs";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/offerings" element={<VendorVault />} />
            </Routes>
        </Router>
    );
};

export default App;
