import { useCart } from "../context/Cartcontext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  function formatPrice(price) {
    return `₦${price.toLocaleString()}`;
  }

  if (cartItems.length === 0) {
    return (
      <section className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p className="empty-cart">Your cart is currently empty.</p>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-image" />

            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
              <p>{item.size}</p>
              <p className="cart-price">{formatPrice(item.price)}</p>
            </div>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <div className="item-total">
              {formatPrice(item.price * item.quantity)}
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <strong>Free</strong>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </section>
  );
}

export default Cart;