import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <section className="success-page">
      <div className="success-card">
        <div className="success-icon">
          ✓
        </div>

        <span className="eyebrow">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank you for your order!
        </h1>

        <p>
          Your order has been placed
          successfully. Please prepare your
          payment for Cash on Delivery.
        </p>

        <Link
          to="/"
          className="primary-btn"
        >
          Back to shopping
        </Link>
      </div>
    </section>
  );
}