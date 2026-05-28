import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageZoom from "../components/ImageZoom";
import ProductSkeleton from "../components/ProductSkeleton";
import Feedback from "../components/Feedback";
import { useSEO } from "../hooks/useSEO";

const Home = () => {
  useSEO({
    title: "Home",
    description: "Creazioni uniche artigianali per il tuo bambino. Fatto a mano con materiali naturali."
  });

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento");
        return res.json();
      })
      .then((data) => {
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured products:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Animated Hero */}
      <section className="hero hero-animated">
        <div className="hero-decorations">
          <span className="hero-float hero-float-1">🧸</span>
          <span className="hero-float hero-float-2">🧶</span>
          <span className="hero-float hero-float-3">⭐</span>
          <span className="hero-float hero-float-4">🌸</span>
          <span className="hero-float hero-float-5">✨</span>
        </div>
        <div className="hero-content">
          <span className="hero-badge">Fatto a mano con amore ❤️</span>
          <h1 className="hero-title-animated">
            Creazioni uniche<br />
            <span className="hero-highlight">per il tuo piccolo</span>
          </h1>
          <p className="hero-subtitle">
            Ogni prodotto è realizzato a mano con materiali naturali e personalizzabile con il nome del tuo bambino.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="cta-button">Scopri i Prodotti</Link>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>100%</strong>
                <span>Artigianale</span>
              </div>
              <div className="hero-stat">
                <strong>9+</strong>
                <span>Creazioni</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Prodotti in Evidenza</h2>
        {loading ? (
          <ProductSkeleton count={4} />
        ) : error ? (
          <div className="error-state">
            <span className="error-icon">😕</span>
            <h2>Impossibile caricare i prodotti</h2>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchProducts}>Riprova</button>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
                <div className="product-card">
                  <ImageZoom src={product.image} alt={product.name} />
                  <div className="product-info">
                    <span className="category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p className="price">€{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Link to="/shop" className="view-all">Vedi Tutti i Prodotti →</Link>
      </section>

      {/* User Feedback */}
      <Feedback />
    </div>
  );
};

export default Home;