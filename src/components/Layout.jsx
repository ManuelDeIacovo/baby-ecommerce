import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../data/products";

const Layout = ({ children, currentPage, onCategoryChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
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
          <h2>Menu</h2>
        </div>
        <div className="category-list">
          <Link 
            to="/" 
            className={`category-btn ${location.pathname === '/' ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="cat-icon">🏠</span>
            <span className="cat-name">Home</span>
          </Link>
          <div style={{ height: '1px', background: 'var(--border)', margin: '0.25rem 0' }}></div>
          <div style={{ padding: '0 0.5rem', fontSize: '0.8rem', color: 'var(--text)', opacity: 0.7, fontWeight: 600 }}>CATEGORIE</div>
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
        
        <div className="sidebar-footer">
          <Link to="/auth" className="sidebar-auth-btn">
            <span className="sidebar-auth-icon">👤</span>
            <span>Accedi / Registrati</span>
          </Link>
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