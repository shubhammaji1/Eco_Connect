import React from 'react';
import '../../public/css/ecoEssence.css';

const products = [
  { id: 1, name: 'Organic Lavender Essential Oil', price: 15.99, description: 'Pure, organic lavender oil for aromatherapy.' },
  { id: 2, name: 'Natural Beeswax Candle', price: 12.99, description: 'Hand-poured candle made with 100% natural beeswax.' },
  { id: 3, name: 'Eco-friendly Incense Sticks', price: 8.99, description: 'Natural incense sticks made from sustainable materials.' },
];

export const EcoEssence=()=> {
  return (
    <div className="eco-essence">
      <h1>EcoEssence</h1>
      <div className="essence-grid">
        {products.map((product) => (
          <div key={product.id} className="essence-card">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}