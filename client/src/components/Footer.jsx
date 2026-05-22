import { Link } from "react-router-dom";
import { assetPath } from "../data/products";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assetPath("Layout/Brand/logo-colored.png")} alt="Brand" />
          <p>Best information about the company goes here but now lorem ipsum is used.</p>
          <div className="social-row" aria-label="Social links">
            <span>f</span>
            <span>t</span>
            <span>in</span>
            <span>ig</span>
          </div>
        </div>
        <div>
          <h3>About</h3>
          <Link to="/products">About us</Link>
          <Link to="/products">Find store</Link>
          <Link to="/products">Categories</Link>
          <Link to="/products">Blogs</Link>
        </div>
        <div>
          <h3>Partnership</h3>
          <Link to="/products">About us</Link>
          <Link to="/products">Find store</Link>
          <Link to="/products">Categories</Link>
          <Link to="/products">Blogs</Link>
        </div>
        <div>
          <h3>Information</h3>
          <Link to="/products">Help Center</Link>
          <Link to="/products">Money Refund</Link>
          <Link to="/products">Shipping</Link>
          <Link to="/products">Contact us</Link>
        </div>
        <div>
          <h3>For users</h3>
          <Link to="/products">Login</Link>
          <Link to="/products">Register</Link>
          <Link to="/products">Settings</Link>
          <Link to="/cart">My Orders</Link>
        </div>
        <div>
          <h3>Get app</h3>
          <img className="store-badge" src={assetPath("Layout/Misc/Group.png")} alt="Google Play" />
          <img className="store-badge" src={assetPath("Layout/Misc/market-button.png")} alt="App Store" />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>Copyright 2026 Brand Ecommerce.</span>
          <span>English</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
