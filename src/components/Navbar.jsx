import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">Baby Shop</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Negozio</Link>
          <Link to="/auth" className="auth-link">
            <span className="auth-icon">👤</span>
            <span className="auth-text">Accedi</span>
          </Link>
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛍️</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;