import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";

function AppContent() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate("/shop");
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Layout 
          currentPage={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop category={selectedCategory} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Layout>
      </main>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;