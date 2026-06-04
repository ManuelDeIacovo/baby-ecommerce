import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSEO } from "../hooks/useSEO";

const Auth = () => {
  useSEO({
    title: "Accedi / Registrati",
    description: "Accedi al tuo account o registrati per effettuare i tuoi acquisti."
  });

  const { isAuthenticated, user, login, register, logout } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, show account info
  if (isAuthenticated && user) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>Ciao, {user.name}! 👋</h1>
            <p>{user.email}</p>
          </div>
          <button onClick={() => { logout(); }} className="auth-submit" style={{ background: '#ef4444' }}>
            Esci
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError("Inserisci email e password");
          setSubmitting(false);
          return;
        }
        await login(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError("Compila tutti i campi");
          setSubmitting(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Le password non coincidono");
          setSubmitting(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("La password deve essere di almeno 6 caratteri");
          setSubmitting(false);
          return;
        }
        await register(formData.name, formData.email, formData.password);
      }
      // On success, redirect to shop
      navigate("/shop");
    } catch (err) {
      setError(err.message || "Si è verificato un errore");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{isLogin ? "Benvenuto!" : "Crea un account"}</h1>
          <p>{isLogin ? "Accedi al tuo account" : "Registrati per acquistare"}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Inserisci la password"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Conferma Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Conferma la password"
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting
              ? "Attendere..."
              : isLogin
              ? "Accedi"
              : "Registrati"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <>
              <span>Non hai un account? </span>
              <button onClick={() => { setIsLogin(false); setError(""); }} className="switch-btn">
                Registrati
              </button>
            </>
          ) : (
            <>
              <span>Hai già un account? </span>
              <button onClick={() => { setIsLogin(true); setError(""); }} className="switch-btn">
                Accedi
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;