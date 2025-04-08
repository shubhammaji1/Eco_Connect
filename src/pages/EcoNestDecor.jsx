import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../public/css/ecoNest.css';

const products = [
  { id: 1, name: 'Bamboo Picture Frame', price: 24.99, description: 'Eco-friendly frame made from sustainable bamboo.', rating: 4.5, image: "/images/image7.webp?height=200&width=200" },
  { id: 2, name: 'Recycled Glass Vase', price: 39.99, description: 'Beautiful vase crafted from recycled glass.', rating: 4.2, image: "/images/image8.webp?height=200&width=200" },
  { id: 3, name: 'Organic Cotton Throw Pillow', price: 29.99, description: 'Soft and comfortable pillow made with organic cotton.', rating: 4.7, image: "/images/image9.webp?height=200&width=200" },
];

export function EcoNestDecor() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('decorCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('decorCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
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
    const existing = cart.find(item => item.id === product.id);
    if (existing.quantity > 1) {
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
  

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="eco-nest-decor">
      <Toaster />
      <h1>EcoNest Decor</h1>
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
                    <img src={item.image} alt={item.name} width={50} height={50} />
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
          {/* Close button always visible */}
          <div className="cart-footer">
            <button className="close-cart-btn" onClick={() => setIsCartVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="decor-grid">
        {products.map((product) => (
          <div key={product.id} className="decor-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
              ))}
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="buy-now" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
