import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">A</span>

          <span>
            <strong>AVÉRA</strong>
            <small>ACCESSORIES</small>
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Shop</Link>
          <Link to="/cart">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};