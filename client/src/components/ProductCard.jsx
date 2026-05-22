import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Rating({ value, orders }) {
  return (
    <div className="rating" aria-label={`Rating ${value} out of 5`}>
      <span className="stars">*****</span>
      <span>{value}</span>
      {orders ? <span className="muted">{orders} orders</span> : null}
    </div>
  );
}

export function ProductCard({ product, variant = "grid" }) {
  const { addToCart } = useCart();

  return (
    <article className={`product-card ${variant === "list" ? "product-card-list" : ""}`}>
      <Link className="product-image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          {product.oldPrice ? <span>${product.oldPrice.toFixed(2)}</span> : null}
        </div>
        <Link className="product-title" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        {variant === "list" ? <Rating value={product.rating} orders={product.orders} /> : null}
        {variant === "list" ? <p>{product.description}</p> : null}
        {variant === "list" ? <Link className="learn-link" to={`/products/${product.id}`}>View details</Link> : null}
      </div>
      <button
        className="wishlist"
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => addToCart(product.id, 1)}
      >
        Add
      </button>
    </article>
  );
}

export function MiniProduct({ item }) {
  return (
    <div className="mini-product">
      <div>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
      </div>
      <img src={item.image} alt={item.name} />
    </div>
  );
}

export { Rating };
