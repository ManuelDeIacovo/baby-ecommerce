import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ onClose, onReviewAdded }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isAuthenticated) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <button className="modal-close" onClick={onClose}>&times;</button>
          <h3 style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-primary)' }}>Accedi per lasciare una recensione</h3>
          <p style={{ margin: '1rem 0' }}>Devi essere registrato e aver effettuato l'accesso per poter lasciare una recensione sul nostro sito.</p>
          <button 
            className="btn-review" 
            onClick={() => {
              onClose();
              navigate('/auth');
            }}
          >
            Vai al Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('userId', user.id || 'user_id');
    formData.append('userName', user.name || user.email.split('@')[0]);
    formData.append('rating', rating);
    formData.append('text', text);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        body: formData, // fetch sets the correct multipart/form-data boundary automatically
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante il salvataggio');
      }

      const newReview = await response.json();
      onReviewAdded(newReview);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Lascia una recensione</h3>
          
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Valutazione</label>
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${rating >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="review-text">La tua esperienza</label>
            <textarea
              id="review-text"
              required
              placeholder="Raccontaci cosa ne pensi dei nostri prodotti..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-photo">Aggiungi una foto (Opzionale)</label>
            <input
              type="file"
              id="review-photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading || !text}>
            {loading ? 'Invio in corso...' : 'Pubblica Recensione'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
