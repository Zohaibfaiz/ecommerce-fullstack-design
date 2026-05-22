import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
