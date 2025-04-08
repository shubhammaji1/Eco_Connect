import React, { useState, useEffect, useCallback } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import debounce from 'lodash.debounce';
import toast, { Toaster } from 'react-hot-toast';
import '../../public/css/eProducts.css';

const products = [
  { id: 1, name: "Eco-friendly Water Bottle", price: 15.99, category: "Kitchen", image: "/images/image1.webp?height=200&width=200" },
  { id: 2, name: "Bamboo Toothbrush Set", price: 9.99, category: "Bathroom", image: "/images/image2.webp?height=200&width=200" },
  { id: 3, name: "Reusable Produce Bags", price: 12.99, category: "Kitchen", image: "/images/image3.webp?height=200&width=200" },
  { id: 4, name: "Solar-powered Charger", price: 29.99, category: "Electronics", image: "/images/image4.webp?height=200&width=200" },
  { id: 5, name: "Recycled Paper Notebook", price: 7.99, category: "Stationery", image: "/images/image5.webp?height=200&width=200" },
  { id: 6, name: "Organic Cotton T-shirt", price: 19.99, category: "Clothing", image: "/images/image6.webp?height=200&width=200" },
];

export function EProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
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
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
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
    <div className="e-products">
      <Toaster />
      <h1>E-Products</h1>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="cart-info" onClick={() => setIsCartVisible(!isCartVisible)}>
        <ShoppingCart className="clickable-cart-icon" />
        {totalItems} item(s) - ${totalPrice.toFixed(2)}
      </div>

      {isCartVisible && (
        <div className="cart-modal">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
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
          )}

          <div className="cart-footer">
            <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <button onClick={() => setIsCartVisible(false)} className="close-cart-btn">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                {cart.find(item => item.id === product.id) && (
                  <span className="in-cart-badge">
                    {cart.find(item => item.id === product.id)?.quantity}
                  </span>
                )}
              </div>
              <h2>{product.name}</h2>
              <p className="category">{product.category}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="cart-actions">
                <button className="decrement-cart" onClick={() => decrementFromCart(product)}>
                  -
                </button>
                <span className="product-quantity">{cart.find(item => item.id === product.id)?.quantity || 0}</span>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
