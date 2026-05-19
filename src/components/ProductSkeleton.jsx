import './ProductSkeleton.css';

const ProductSkeleton = ({ count = 4 }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image skeleton-pulse" />
          <div className="skeleton-info">
            <div className="skeleton-line skeleton-category skeleton-pulse" />
            <div className="skeleton-line skeleton-title skeleton-pulse" />
            <div className="skeleton-line skeleton-desc skeleton-pulse" />
            <div className="skeleton-line skeleton-desc-short skeleton-pulse" />
            <div className="skeleton-footer">
              <div className="skeleton-line skeleton-price skeleton-pulse" />
              <div className="skeleton-line skeleton-btn skeleton-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
