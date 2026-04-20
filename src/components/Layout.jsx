import { useState } from "react";
import { products } from "../data/products";

const Layout = ({ children, currentPage, onCategoryChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleCategoryClick = (cat) => {
    onCategoryChange(cat);
    setIsMenuOpen(false);
  };

  return (
    <div className="layout">
      {/* Mobile menu toggle */}
      <button 
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="menu-icon">☰</span>
        <span className="menu-text">Categorie</span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Categorie</h2>
        </div>
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${currentPage === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <span className="cat-icon">
                {cat === "All" ? "📦" : cat === "Abbigliamento" ? "👕" : cat === "Camera" ? "🛏️" : cat === "Amigurumi" ? "🧸" : "🧵"}
              </span>
              <span className="cat-name">{cat === "All" ? "Tutti i prodotti" : cat}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Overlay */}
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)} />}

      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;