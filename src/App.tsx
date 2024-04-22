import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subscribe from "./pages/SubscribePage";
import WishlistPage from "./pages/WishlistPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Subscribe/>} />
        <Route path="/wishlist" element={<WishlistPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
