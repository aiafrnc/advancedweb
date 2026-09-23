import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🛍</div>

      <h2>Your cart is empty</h2>

      <p>
        Discover something you like and add it to your cart.
      </p>

      <Link to="/" className="primary-btn">
        Browse products
      </Link>
    </div>
  );
}