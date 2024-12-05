import React from 'react';
import '../../public/css/eCycleHub.css';

const recyclingItems = [
  { id: 1, name: 'Electronics', points: 50, description: 'Recycle old electronics and earn eco-points!' },
  { id: 2, name: 'Plastic Bottles', points: 10, description: 'Collect and recycle plastic bottles for points.' },
  { id: 3, name: 'Paper', points: 5, description: 'Bring in your used paper for recycling and earn points.' },
];

export const ECycleHub=()=> {
  return (
    <div className="e-cycle-hub">
      <h1>E-Cycle Hub</h1>
      <div className="recycling-grid">
        {recyclingItems.map((item) => (
          <div key={item.id} className="recycling-card">
            <h2>{item.name}</h2>
            <p className="description">{item.description}</p>
            <p className="points">Earn {item.points} points</p>
            <button className="recycle-now">Recycle Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}