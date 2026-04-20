import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import ImageZoom from "../components/ImageZoom";

const Shop = ({ category = "All" }) => {
  const { addToCart, cart } = useCart();
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedAmigurumi, setSelectedAmigurumi] = useState({});
  const [customNames, setCustomNames] = useState({});
  const [openSections, setOpenSections] = useState({});
  const [errors, setErrors] = useState({});

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color
    }));
  };

  const handleAmigurumiSelect = (productId, amigurumi) => {
    setSelectedAmigurumi((prev) => ({
      ...prev,
      [productId]: amigurumi
    }));
  };

  const handleNameChange = (productId, name) => {
    setCustomNames((prev) => ({
      ...prev,
      [productId]: name
    }));
  };

  const toggleSection = (productId, section) => {
    setOpenSections((prev) => ({
      ...prev,
      [`${productId}-${section}`]: !prev[`${productId}-${section}`]
    }));
  };

  const handleAddToCart = (product) => {
    // Clear previous errors for this product
    setErrors((prev) => ({ ...prev, [product.id]: null }));
    
    const newErrors = [];
    
    // Validate color selection
    if (product.colors && !selectedColors[product.id]) {
      newErrors.push("Seleziona un colore");
    }
    
    // Validate amigurumi selection for customizable products
    if (product.customizable && !selectedAmigurumi[product.id]) {
      newErrors.push("Seleziona un amigurumi");
    }
    
    // Validate custom name for products 1, 2, 5 and customizable products
    if ((product.id === 1 || product.id === 2 || product.id === 5 || product.customizable) && 
        !customNames[product.id]?.trim()) {
      newErrors.push("Inserisci un nome");
    }
    
    if (newErrors.length > 0) {
      setErrors((prev) => ({ ...prev, [product.id]: newErrors }));
      return;
    }
    
    const customization = {};
    
    if (product.colors) {
      customization.selectedColor = selectedColors[product.id];
    }
    if (product.customizable) {
      customization.selectedAmigurumi = selectedAmigurumi[product.id];
    }
    // Add name for products 1, 2, 5 and product 4
    if (product.id === 1 || product.id === 2 || product.id === 5 || product.customizable) {
      customization.customName = customNames[product.id];
    }
    
    addToCart({
      ...product,
      ...customization
    });
  };

  return (
    <div className="shop">
      <h1>Negozio</h1>

        <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`product-card ${product.id === 4 ? 'product-id-4' : ''}`}>
            <ImageZoom 
              src={product.image} 
              alt={product.name}
            />
            <div className="product-info">
              <span className="category">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              
              {/* Color selector - collapsible for products 1, 2, 5 */}
              {product.colors && !product.customizable && (
                <div className="option-group">
                  <button 
                    className="option-toggle"
                    onClick={() => toggleSection(product.id, 'color')}
                  >
                    <span>Colore: {selectedColors[product.id]?.name || "Seleziona"}</span>
                    <span className={`arrow ${openSections[`${product.id}-color`] ? 'open' : ''}`}>▼</span>
                  </button>
                  {openSections[`${product.id}-color`] && (
                    <div className="option-content">
                      <div className="color-options">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            className={`color-circle ${selectedColors[product.id]?.name === color.name ? "selected" : ""}`}
                            onClick={() => handleColorSelect(product.id, color)}
                            title={color.name}
                            style={{ backgroundColor: color.value }}
                          >
                            {selectedColors[product.id]?.name === color.name && <span className="color-check">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Name input for products 1, 2, 5 - always visible */}
              {product.id === 1 || product.id === 2 || product.id === 5 ? (
                <div className="name-field">
                  <label className="name-label">Nome da ricamare:</label>
                  <input
                    type="text"
                    className="name-input"
                    placeholder="Inserisci il nome"
                    value={customNames[product.id] || ""}
                    onChange={(e) => handleNameChange(product.id, e.target.value)}
                    maxLength={20}
                  />
                </div>
              ) : null}

              {/* Customization for product ID 4 */}
              {product.customizable && (
                <div className="customization">
                  {/* Colors */}
                  <div className="option-group">
                    <button 
                      className="option-toggle"
                      onClick={() => toggleSection(product.id, 'color')}
                    >
                      <span>Colore: {selectedColors[product.id]?.name || "Seleziona"}</span>
                      <span className={`arrow ${openSections[`${product.id}-color`] ? 'open' : ''}`}>▼</span>
                    </button>
                    {openSections[`${product.id}-color`] && (
                      <div className="option-content">
                        <div className="color-options">
                          {product.colors.map((color) => (
                            <button
                              key={color.name}
                              className={`color-circle ${selectedColors[product.id]?.name === color.name ? "selected" : ""}`}
                              onClick={() => handleColorSelect(product.id, color)}
                              title={color.name}
                              style={{ backgroundColor: color.value }}
                            >
                              {selectedColors[product.id]?.name === color.name && <span className="color-check">✓</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amigurumi */}
                  {product.amigurumiOptions && (
                    <div className="option-group">
                      <button 
                        className="option-toggle"
                        onClick={() => toggleSection(product.id, 'amigurumi')}
                      >
                        <span>Amigurumi: {selectedAmigurumi[product.id] || "Seleziona"}</span>
                        <span className={`arrow ${openSections[`${product.id}-amigurumi`] ? 'open' : ''}`}>▼</span>
                      </button>
                      {openSections[`${product.id}-amigurumi`] && (
                        <div className="option-content">
                          <div className="color-options">
                            {product.amigurumiOptions.map((amigurumi) => (
                              <button
                                key={amigurumi}
                                className={`option-btn ${selectedAmigurumi[product.id] === amigurumi ? "selected" : ""}`}
                                onClick={() => handleAmigurumiSelect(product.id, amigurumi)}
                              >
                                {amigurumi}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Name input */}
                  <div className="option-group">
                    <button 
                      className="option-toggle"
                      onClick={() => toggleSection(product.id, 'name')}
                    >
                      <span>Nome: {customNames[product.id] || "Inserisci"}</span>
                      <span className={`arrow ${openSections[`${product.id}-name`] ? 'open' : ''}`}>▼</span>
                    </button>
                    {openSections[`${product.id}-name`] && (
                      <div className="option-content">
                        <input
                          type="text"
                          className="name-input"
                          placeholder="Inserisci il nome"
                          value={customNames[product.id] || ""}
                          onChange={(e) => handleNameChange(product.id, e.target.value)}
                          maxLength={20}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {errors[product.id] && (
                <div className="product-error">
                  {errors[product.id].map((err, idx) => (
                    <p key={idx}>{err}</p>
                  ))}
                </div>
              )}
              
              <div className="product-footer">
                <span className="price">€{product.price.toFixed(2)}</span>
                <button
                  className={`add-btn ${isInCart(product.id) ? "in-cart" : ""}`}
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart(product.id) ? "Aggiunto ✓" : "Aggiungi al Carrello"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;