import React, { useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import '../../public/css/ecoNest.css';

const products = [
  { id: 1, name: 'Bamboo Picture Frame', price: 24.99, description: 'Eco-friendly frame made from sustainable bamboo.', rating: 4.5, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: 'Recycled Glass Vase', price: 39.99, description: 'Beautiful vase crafted from recycled glass.', rating: 4.2, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: 'Organic Cotton Throw Pillow', price: 29.99, description: 'Soft and comfortable pillow made with organic cotton.', rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
];

export function EcoNestDecor() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="eco-nest-decor">
      <h1>EcoNest Decor</h1>
      <div className="cart-info">
        <ShoppingBag /> {cart.length} items
      </div>
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