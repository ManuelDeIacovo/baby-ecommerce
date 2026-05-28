import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">✨</span>
            <span className="footer-logo-text">Nido di Cotone</span>
          </Link>
          <p className="footer-description">
            Creazioni artigianali uniche, realizzate a mano con materiali naturali 
            e tanto amore per il tuo bambino.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-link" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="22" x2="12" y2="10"></line><line x1="12" y1="10" x2="12" y2="2"></line><line x1="12" y1="10" x2="22" y2="10"></line><line x1="12" y1="10" x2="2" y2="10"></line></svg>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-column">
            <h3>Negozio</h3>
            <Link to="/shop" className="footer-link">Tutti i prodotti</Link>
            <Link to="/shop" className="footer-link">Abbigliamento</Link>
            <Link to="/shop" className="footer-link">Camera</Link>
            <Link to="/shop" className="footer-link">Personalizzabili</Link>
          </div>
          
          <div className="footer-column">
            <h3>Informazioni</h3>
            <Link to="#" className="footer-link">Chi siamo</Link>
            <Link to="#" className="footer-link">Spedizioni e Resi</Link>
            <Link to="#" className="footer-link">FAQ</Link>
            <Link to="#" className="footer-link">Contattaci</Link>
          </div>
          
          <div className="footer-column">
            <h3>Legal</h3>
            <Link to="#" className="footer-link">Privacy Policy</Link>
            <Link to="#" className="footer-link">Termini di Servizio</Link>
            <Link to="#" className="footer-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nido di Cotone. Tutti i diritti riservati.</p>
        <div className="payment-methods">
          <span title="Visa">💳</span>
          <span title="Mastercard">💳</span>
          <span title="PayPal">🅿️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
