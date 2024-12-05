import React from 'react';
import '../../public/css/pitchHub.css';

const pitches = [
  { id: 1, title: 'Solar-Powered Urban Gardens', author: 'Green Thumb Inc.', votes: 120, description: 'Creating sustainable urban gardens powered by solar energy.' },
  { id: 2, title: 'Ocean Plastic Recycling Initiative', author: 'Blue Planet Solutions', votes: 95, description: 'Innovative solution to recycle ocean plastic into useful products.' },
  { id: 3, title: 'Community Composting Program', author: 'EarthWise Collective', votes: 78, description: 'Implementing a city-wide composting program to reduce waste.' },
];

export function PitchHub() {
  return (
    <div className="pitch-hub">
      <h1>PitchHub</h1>
      <div className="pitch-grid">
        {pitches.map((pitch) => (
          <div key={pitch.id} className="pitch-card">
            <h2>{pitch.title}</h2>
            <p className="author">By: {pitch.author}</p>
            <p className="description">{pitch.description}</p>
            <p className="votes">Votes: {pitch.votes}</p>
            <button className="support-pitch">Support This Pitch</button>
          </div>
        ))}
      </div>
    </div>
  );
}