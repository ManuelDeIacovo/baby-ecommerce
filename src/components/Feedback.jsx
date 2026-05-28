import { useState, useEffect } from 'react';
import './Feedback.css';
import ReviewForm from './ReviewForm';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Errore nel recupero delle recensioni:', error);
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
  };

  // If we have few reviews, we duplicate them so the marquee looks continuous
  const displayReviews = reviews.length > 0 && reviews.length < 5 
    ? [...reviews, ...reviews, ...reviews] 
    : reviews;

  return (
    <section className="feedback-section">
      <h2>Dicono di noi</h2>
      <p className="feedback-subtitle">Scopri cosa pensano le mamme e i papà delle nostre creazioni</p>
      
      {reviews.length > 0 ? (
        <div className="marquee-container">
          <div className="marquee-content">
            {displayReviews.map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="review-meta">
                    <h4>{review.userName}</h4>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                
                <p className="review-text">"{review.text}"</p>
                
                {review.imageUrl && (
                  <img 
                    src={review.imageUrl.startsWith('http') ? review.imageUrl : `http://localhost:5000${review.imageUrl}`} 
                    alt="Foto recensione" 
                    className="review-image" 
                  />
                )}
              </div>
            ))}
            
            {/* Duplicate again for seamless scrolling if enough items */}
            {displayReviews.map((review, idx) => (
              <div key={`dup-${review.id}-${idx}`} className="review-card" aria-hidden="true">
                <div className="review-header">
                  <div className="review-avatar">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="review-meta">
                    <h4>{review.userName}</h4>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
                {review.imageUrl && (
                  <img 
                    src={review.imageUrl.startsWith('http') ? review.imageUrl : `http://localhost:5000${review.imageUrl}`} 
                    alt="Foto recensione" 
                    className="review-image" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Non ci sono ancora recensioni. Sii il primo a lasciarne una!</p>
      )}

      <div className="add-review-container">
        <button className="btn-review" onClick={() => setIsModalOpen(true)}>
          Lascia una recensione
        </button>
      </div>

      {isModalOpen && (
        <ReviewForm 
          onClose={() => setIsModalOpen(false)} 
          onReviewAdded={handleReviewAdded} 
        />
      )}
    </section>
  );
};

export default Feedback;
