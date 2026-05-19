import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageZoom from "../components/ImageZoom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Benvenuto su Baby Shop</h1>
          <p>Trova i migliori prodotti per il tuo piccolo</p>
          <Link to="/shop" className="cta-button">Acquista Ora</Link>
        </div>
      </section>

      <section className="featured">
        <h2>Prodotti in Evidenza</h2>
        {loading ? (
          <p className="loading-text">Caricamento...</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <ImageZoom src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">€{product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link to="/shop" className="view-all">Vedi Tutti i Prodotti →</Link>
      </section>
    </div>
  );
};

export default Home;