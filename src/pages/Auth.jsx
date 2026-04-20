import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login validation
      if (!formData.email || !formData.password) {
        setError("Inserisci email e password");
        return;
      }
      // Simulate login
      alert("Login effettuato con successo!");
    } else {
      // Register validation
      if (!formData.name || !formData.email || !formData.password) {
        setError("Compila tutti i campi");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Le password non coincidono");
        return;
      }
      if (formData.password.length < 6) {
        setError("La password deve essere di almeno 6 caratteri");
        return;
      }
      // Simulate registration
      alert("Registrazione effettuata con successo!");
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

          <button type="submit" className="auth-submit">
            {isLogin ? "Accedi" : "Registrati"}
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