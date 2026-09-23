import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";

export default function Cart({
  cart,
  updateQuantity,
  removeFromCart,
}) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length ? 0 : 0;

  const total = subtotal + shipping;

  if (!cart.length) {
    return (
      <section className="page-section">
        <EmptyCart />
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-title">
        <span className="eyebrow">
          YOUR BAG
        </span>

        <h1>Shopping cart</h1>

        <p>
          {cart.length} unique item
          {cart.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="cart-layout">
        {/* CART ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <article
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">
                <span className="product-category">
                  {item.category}
                </span>

                <h3>{item.name}</h3>

                <p>
                  ₱{item.price.toLocaleString()} each
                </p>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.min(
                          item.stock,
                          item.quantity + 1
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <strong>
                  ₱
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </strong>
              </div>
            </article>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <aside className="summary-card">
          <h2>Order summary</h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>
              ₱{subtotal.toLocaleString()}
            </strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <strong>FREE</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₱{total.toLocaleString()}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="primary-btn wide"
          >
            Proceed to checkout
          </Link>

          <Link
            to="/"
            className="continue-link"
          >
            Continue shopping →
          </Link>
        </aside>
      </div>
    </section>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,

  updateQuantity: PropTypes.func.isRequired,

  removeFromCart: PropTypes.func.isRequired,
};