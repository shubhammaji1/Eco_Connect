import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
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
      } else {
        setCart(cart.filter(item => item.id !== product.id));
      }
    }
  };

  return (
    <div className="e-products">
      <h1>E-Products</h1>
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="cart-info">
        <ShoppingCart /> {cart.reduce((total, item) => total + item.quantity, 0)} items
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <div className="cart-actions">
              <button className="decrement-cart" onClick={() => decrementFromCart(product)}>
                -
              </button>
              <span className="product-quantity"> {cart.find(item => item.id === product.id)?.quantity || 0}</span>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="cart-details">
        <h2>Cart Details</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
