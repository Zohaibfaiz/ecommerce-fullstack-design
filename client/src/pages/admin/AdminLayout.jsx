import { NavLink, Outlet, Link } from "react-router-dom";
import { assetPath } from "../../data/assets";
import { useAuth } from "../../context/AuthContext";

const adminLinks = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/products", label: "Products" },
];

function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-app">
      <aside className="admin-sidebar section-card">
        <Link className="admin-brand" to="/admin">
          <img src={assetPath("Layout/Brand/logo-colored.png")} alt="Brand admin" />
          <span>Admin Console</span>
        </Link>
        <nav className="admin-nav">
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-user">
          <img src={assetPath("Image/tech/image 33.png")} alt="" />
          <div>
            <strong>{user?.name}</strong>
            <span className="muted">{user?.email}</span>
          </div>
        </div>
        <Link className="ghost-button full" to="/">
          View store
        </Link>
        <button type="button" className="ghost-button full" onClick={logout}>
          Sign out
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
