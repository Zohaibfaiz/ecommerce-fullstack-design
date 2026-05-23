import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function ShopLayout() {
  return (
    <div className="app shop-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ShopLayout;
