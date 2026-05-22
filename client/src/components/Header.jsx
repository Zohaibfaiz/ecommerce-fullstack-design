import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { assetPath } from "../data/products";

const navItems = [
  { label: "All category", to: "/products" },
  { label: "Hot offers", to: "/products?category=Electronics" },
  { label: "Gift boxes", to: "/products?category=Accessories" },
  { label: "Projects", to: "/products?category=Home%20and%20outdoor" },
  { label: "Cart", to: "/cart" },
];

function Header() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/products?search=${encodeURIComponent(search)}` : "/products");
  };

  return (
    <header className="site-header">
      <div className="header-main container">
        <Link className="brand-link" to="/" aria-label="Brand home">
          <img src={assetPath("Layout/Brand/logo-colored.png")} alt="Brand" />
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            aria-label="Search products"
            placeholder="Search products by name or category"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select aria-label="Search category" defaultValue="all">
            <option value="all">All category</option>
            <option value="Electronics">Electronics</option>
            <option value="Home and outdoor">Home and outdoor</option>
            <option value="Clothing">Clothing</option>
          </select>
          <button type="submit">Search</button>
        </form>

        <div className="header-actions" aria-label="Quick actions">
          <Link to="/products">Profile</Link>
          <Link to="/products">Message</Link>
          <Link to="/products">Orders</Link>
          <Link to="/cart">Cart ({itemCount})</Link>
        </div>
      </div>

      <div className="mobile-search container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            aria-label="Mobile search products"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      </div>

      <nav className="header-nav">
        <div className="container nav-inner">
          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="ship-info">
            <span>English, USD</span>
            <span className="ship-flag">
              Ship to <img src={assetPath("Layout1/Image/flags/US@2x.png")} alt="United States" />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
