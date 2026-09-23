import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 0;

  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Please enter your full name.";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (
      !/^[0-9+\-\s()]{7,}$/.test(form.phone)
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Please enter your delivery address.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    clearCart();

    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1>Your bag is empty</h1>

        <p>
          Add some accessories to your bag
          before checking out.
        </p>

        <Link
          to="/"
          className="primary-btn"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section">

      {/* PAGE HEADER */}

      <div className="checkout-header">
        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1>Complete your order</h1>

        <p>
          Enter your delivery details.
          Payment is Cash on Delivery.
        </p>
      </div>


      {/* CHECKOUT LAYOUT */}

      <div className="checkout-layout">

        {/* CUSTOMER FORM */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Customer details</h2>

          {/* FULL NAME */}

          <div className="form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
            />

            {errors.fullName && (
              <span className="form-error">
                {errors.fullName}
              </span>
            )}

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan@example.com"
            />

            {errors.email && (
              <span className="form-error">
                {errors.email}
              </span>
            )}

          </div>


          {/* PHONE */}

          <div className="form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="09171234567"
            />

            {errors.phone && (
              <span className="form-error">
                {errors.phone}
              </span>
            )}

          </div>


          {/* ADDRESS */}

          <div className="form-group">

            <label htmlFor="address">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={
                "House/Unit, Street,\nBarangay, City,\nProvince"
              }
            />

            {errors.address && (
              <span className="form-error">
                {errors.address}
              </span>
            )}

          </div>


          {/* PAYMENT */}

          <div className="payment-section">

            <h2>Payment method</h2>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  form.payment ===
                  "Cash on Delivery"
                }
                onChange={handleChange}
              />

              <span>
                <strong>
                  Cash on Delivery
                </strong>

                <small>
                  Pay when your order arrives.
                </small>
              </span>

            </label>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="primary-btn checkout-btn"
          >
            Place order • ₱
            {total.toLocaleString()}
          </button>

        </form>


        {/* ORDER SUMMARY */}

        <aside className="checkout-summary">

          <h2>Your order</h2>

          <div className="checkout-items">

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <div>
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    × {item.quantity}
                  </span>
                </div>

                <strong>
                  ₱
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </strong>

              </div>
            ))}

          </div>


          <div className="summary-row">
            <span>Delivery</span>
            <strong>
              {deliveryFee === 0
                ? "FREE"
                : `₱${deliveryFee.toLocaleString()}`}
            </strong>
          </div>


          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₱{total.toLocaleString()}
            </strong>
          </div>

        </aside>

      </div>

    </section>
  );
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  clearCart: PropTypes.func.isRequired,
};