import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import '../../public/css/eProducts.css';

const products = [
  { id: 1, name: "Eco-friendly Water Bottle", price: 15.99, category: "Kitchen", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Bamboo Toothbrush Set", price: 9.99, category: "Bathroom", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Reusable Produce Bags", price: 12.99, category: "Kitchen", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Solar-powered Charger", price: 29.99, category: "Electronics", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Recycled Paper Notebook", price: 7.99, category: "Stationery", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Organic Cotton T-shirt", price: 19.99, category: "Clothing", image: "/placeholder.svg?height=200&width=200" },
];

export function EProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
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
        <ShoppingCart /> {cart.length} items
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}