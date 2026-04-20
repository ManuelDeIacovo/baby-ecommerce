import { Link } from "react-router-dom";
import { products } from "../data/products";
import ImageZoom from "../components/ImageZoom";

const Home = () => {
  const featuredProducts = products.slice(0, 4);

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
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ImageZoom src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">€{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Link to="/shop" className="view-all">Vedi Tutti i Prodotti →</Link>
      </section>
    </div>
  );
};

export default Home;