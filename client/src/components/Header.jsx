import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { assetPath, uiAssets } from "../data/assets";

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
  const { user, isAdmin, logout } = useAuth();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/products?search=${encodeURIComponent(search)}` : "/products");
  };

  const searchButton = (
    <button type="submit" className="search-submit">
      <img src={assetPath(uiAssets.searchIcon)} alt="" aria-hidden="true" />
      <span>Search</span>
    </button>
  );

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
          {searchButton}
        </form>

        <div className="header-actions" aria-label="Quick actions">
          {uiAssets.headerActions.map((action) => (
            <Link key={action.label} className="header-action-link" to={action.to}>
              <img src={assetPath(action.icon)} alt="" aria-hidden="true" />
              <span>
                {action.label}
                {action.showCount ? ` (${itemCount})` : ""}
              </span>
            </Link>
          ))}
          {user ? (
            <>
              {isAdmin ? (
                <Link className="header-action-link admin-link" to="/admin">
                  <img src={assetPath("Layout/Form/input-group/Icon/control/Vector2.png")} alt="" />
                  <span>Admin</span>
                </Link>
              ) : null}
              <button type="button" className="header-action-link header-logout" onClick={logout}>
                <img src={assetPath("Layout1/Image/flags/icon.png")} alt="" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link className="header-action-link" to="/login">
              <img src={assetPath("Layout1/Image/flags/icon.png")} alt="" />
              <span>Login</span>
            </Link>
          )}
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
          <button type="submit" className="search-submit">
            <img src={assetPath(uiAssets.searchIcon)} alt="" aria-hidden="true" />
            <span>Go</span>
          </button>
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
