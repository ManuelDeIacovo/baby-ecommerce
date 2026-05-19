import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { useSEO } from "../hooks/useSEO";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: product ? product.name : "Prodotto",
    description: product ? product.description : "Dettagli prodotto."
  });

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAmigurumi, setSelectedAmigurumi] = useState(null);
  const [customName, setCustomName] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Prodotto non trovato");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const isInCart = product ? cart.some((item) => item.id === product.id) : false;

  const handleAddToCart = () => {
    setFormErrors([]);
    const newErrors = [];

    if (product.colors && !selectedColor) {
      newErrors.push("Seleziona un colore");
    }
    if (product.customizable && !selectedAmigurumi) {
      newErrors.push("Seleziona un amigurumi");
    }
    if ((product.id === 1 || product.id === 2 || product.id === 5 || product.customizable) &&
        !customName.trim()) {
      newErrors.push("Inserisci un nome");
    }

    if (newErrors.length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const customization = {};
    if (product.colors) customization.selectedColor = selectedColor;
    if (product.customizable) customization.selectedAmigurumi = selectedAmigurumi;
    if (product.id === 1 || product.id === 2 || product.id === 5 || product.customizable) {
      customization.customName = customName;
    }

    addToCart({ ...product, ...customization });
    addToast(`${product.name} aggiunto al carrello!`);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="detail-skeleton">
          <div className="skeleton-pulse" style={{ width: '100%', height: 400, borderRadius: 'var(--radius)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
            <div className="skeleton-pulse" style={{ width: '30%', height: 14, borderRadius: 6 }} />
            <div className="skeleton-pulse" style={{ width: '70%', height: 28, borderRadius: 6 }} />
            <div className="skeleton-pulse" style={{ width: '100%', height: 16, borderRadius: 6 }} />
            <div className="skeleton-pulse" style={{ width: '20%', height: 28, borderRadius: 6, marginTop: 'auto' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page">
        <div className="error-state">
          <span className="error-icon">😕</span>
          <h2>{error}</h2>
          <p>Il prodotto che cerchi non è disponibile.</p>
          <Link to="/shop" className="cta-button">Torna al Negozio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Link to="/shop" className="back-link">← Torna al Negozio</Link>

      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>

          {/* Color selector */}
          {product.colors && (
            <div className="detail-option">
              <label className="detail-label">Colore</label>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-circle ${selectedColor?.name === color.name ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor?.name === color.name && <span className="color-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Amigurumi selector */}
          {product.customizable && product.amigurumiOptions && (
            <div className="detail-option">
              <label className="detail-label">Amigurumi</label>
              <div className="detail-options-row">
                {product.amigurumiOptions.map((opt) => (
                  <button
                    key={opt}
                    className={`option-btn ${selectedAmigurumi === opt ? "selected" : ""}`}
                    onClick={() => setSelectedAmigurumi(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Name input */}
          {(product.id === 1 || product.id === 2 || product.id === 5 || product.customizable) && (
            <div className="detail-option">
              <label className="detail-label">Nome da ricamare</label>
              <input
                type="text"
                className="name-input"
                placeholder="Inserisci il nome"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={20}
              />
            </div>
          )}

          {formErrors.length > 0 && (
            <div className="product-error">
              {formErrors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <div className="detail-footer">
            <span className="detail-price">€{product.price.toFixed(2)}</span>
            <button
              className={`detail-add-btn ${isInCart ? "in-cart" : ""}`}
              onClick={handleAddToCart}
            >
              {isInCart ? "Aggiunto ✓" : "Aggiungi al Carrello"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
