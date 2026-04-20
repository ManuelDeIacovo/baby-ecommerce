import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">�</div>
        <h2>Il tuo carrello è vuoto</h2>
        <p>Non hai ancora aggiunto prodotti al carrello.</p>
        <Link to="/shop" className="cta-button">Vai al Negozio</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Il tuo Carrello</h1>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-category">{item.category}</p>
              
              {item.selectedColor && (
                <p className="cart-item-option">
                  Colore: <span style={{ backgroundColor: item.selectedColor.value }} className="color-dot"></span>
                  {item.selectedColor.name}
                </p>
              )}
              
              {item.selectedAmigurumi && (
                <p className="cart-item-option">Amigurumi: {item.selectedAmigurumi}</p>
              )}
              
              {item.customName && (
                <p className="cart-item-option">Nome: {item.customName}</p>
              )}
            </div>
            
            <div className="cart-item-quantity">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="qty-btn"
              >
                −
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
            
            <div className="cart-item-price">
              <span className="price">€{(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Rimuovi
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Totale:</span>
          <span className="total-price">€{cartTotal.toFixed(2)}</span>
        </div>
        
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Svuota Carrello
          </button>
          <button className="checkout-btn">
            Procedi all'Acquisto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;