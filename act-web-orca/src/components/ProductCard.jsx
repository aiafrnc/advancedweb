import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  addToCart,
}) {
  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-image-link"
      >
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
      </Link>

      <div className="product-card-content">
        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <p className="product-description">
          {product.shortDescription}
        </p>

        <div className="product-card-bottom">
          <strong className="product-price">
            ₱{product.price.toLocaleString()}
          </strong>

          <button
            type="button"
            className="add-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
          >
            {product.stock > 0
              ? "Add to bag"
              : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,

  addToCart: PropTypes.func.isRequired,
};