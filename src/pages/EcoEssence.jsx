import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../public/css/ecoEssence.css';

const products = [
  { id: 1, name: 'Organic Lavender Essential Oil', price: 15.99, description: 'Pure, organic lavender oil for aromatherapy.' },
  { id: 2, name: 'Natural Beeswax Candle', price: 12.99, description: 'Hand-poured candle made with 100% natural beeswax.' },
  { id: 3, name: 'Eco-friendly Incense Sticks', price: 8.99, description: 'Natural incense sticks made from sustainable materials.' },
];

export const EcoEssence = () => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('essenceCart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('essenceCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const decrementFromCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists.quantity > 1) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
      toast.success(`Decreased quantity of ${product.name}`);
    } else {
      setCart(cart.filter(item => item.id !== product.id));
      toast.error(`${product.name} removed from cart`);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
  
    // Simulate payment processing
    toast.loading("Processing payment...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Payment successful! 🎉");
  
      setCart([]);
      localStorage.removeItem('essenceCart');
      setIsCartVisible(false);
    }, 2000); // simulate 2s payment delay
  };
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="eco-essence">
      <Toaster />
      <h1>EcoEssence</h1>
      <div className="cart-info" onClick={() => setIsCartVisible(!isCartVisible)}>
        <ShoppingBag className="clickable-cart-icon" /> {totalItems} items
      </div>

      {isCartVisible && (
        <div className="cart-modal">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p>${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="cart-controls">
                      <button onClick={() => decrementFromCart(item)}>-</button>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-footer">
                <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          )}
          <div className="cart-footer">
            <button className="close-cart-btn" onClick={() => setIsCartVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="essence-grid">
        {products.map(product => (
          <div key={product.id} className="essence-card">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};
