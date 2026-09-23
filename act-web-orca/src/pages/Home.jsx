import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 6;

const heroImages = {
  first:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",

  second:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",

  third:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
};

export default function Home({
  products,
  categories,
  search,
  setSearch,
  category,
  setCategory,
  addToCart,
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shownProducts = useMemo(
    () => products.slice(0, visible),
    [products, visible]
  );

  const changeCategory = (value) => {
    setCategory(value);
    setVisible(PAGE_SIZE);
  };

  const changeSearch = (value) => {
    setSearch(value);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            CURATED ACCESSORIES
          </span>

          <h1>
            Small details,{" "}
            <em>big style.</em>
          </h1>

          <p>
            Discover timeless jewelry, bags, watches,
            sunglasses, and everyday accessories
            designed to complete your look.
          </p>

          <a href="#products" className="primary-btn">
            Explore collection
          </a>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-card art-card-one">
            <img src={heroImages.first} alt="" />
          </div>

          <div className="art-card art-card-two">
            <img src={heroImages.second} alt="" />
          </div>

          <div className="art-card art-card-three">
            <img src={heroImages.third} alt="" />
          </div>
        </div>
      </section>

      <section id="products" className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              THE ACCESSORY EDIT
            </span>

            <h2>
              Find your signature piece.
            </h2>
          </div>

          <span className="result-count">
            {products.length} products
          </span>
        </div>

        <div className="filters">
          <label className="search-box">
            <span>Search</span>

            <input
              value={search}
              onChange={(e) =>
                changeSearch(e.target.value)
              }
              placeholder="Search accessories..."
              aria-label="Search accessories"
            />
          </label>

          <div
            className="category-pills"
            aria-label="Accessory categories"
          >
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? "pill active"
                    : "pill"
                }
                onClick={() =>
                  changeCategory(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {shownProducts.length > 0 ? (
          <>
            <div className="product-grid">
              {shownProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {visible < products.length && (
              <div className="view-more-wrap">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setVisible(
                      (current) =>
                        current + PAGE_SIZE
                    )
                  }
                >
                  View more accessories
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <h3>No accessories found</h3>

            <p>
              Try another search term or choose
              another category.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  categories: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,

  search: PropTypes.string.isRequired,

  setSearch: PropTypes.func.isRequired,

  category: PropTypes.string.isRequired,

  setCategory: PropTypes.func.isRequired,

  addToCart: PropTypes.func.isRequired,
};