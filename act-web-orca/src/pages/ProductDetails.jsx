import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails({
  products,
  addToCart,
}) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="page-section">
        <div className="no-results">
          <h2>Accessory not found</h2>

          <p>
            The accessory you're looking for
            doesn't exist.
          </p>

          <Link to="/" className="primary-btn">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  };

  return (
    <section className="product-details">

      {/* PRODUCT IMAGE */}
      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* ALL PRODUCT INFORMATION MUST STAY INSIDE THIS DIV */}
      <div className="details-content">

        <span className="eyebrow">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₱{product.price.toLocaleString()}
        </p>

        <p className="details-description">
          {product.description}
        </p>

        <div className="details-info">

          <div>
            <span>Color</span>
            <strong>{product.colors}</strong>
          </div>

          <div>
            <span>Availability</span>
            <strong>
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Sold out"}
            </strong>
          </div>

        </div>

        {product.stock > 0 && (
          <>

            <div className="quantity-control">

              <button
                type="button"
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
              >
                +
              </button>

            </div>

            <button
              type="button"
              className="primary-btn full-btn"
              onClick={() =>
                addToCart(product, quantity)
              }
            >
              Add to bag
            </button>

          </>
        )}

        <Link
          to="/"
          className="back-link"
        >
          Continue shopping
        </Link>

      </div>
    </section>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  addToCart: PropTypes.func.isRequired,
};