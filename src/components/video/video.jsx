import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaShare } from 'react-icons/fa';
import "./video.css";

const Video = () => {
    const [reels, setReels] = useState([]);
    const [selectedReel, setSelectedReel] = useState(null); // Track which reel is being shared

    const userId = ""; // Replace this with actual user ID

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reels');
            setReels(response.data);
        } catch (error) {
            console.error('Error fetching reels:', error);
        }
    };

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/reel/like/${id}`, { userId });
            
            setReels((prevReels) => 
                prevReels.map((reel) => 
                    reel._id === id 
                        ? { ...reel, likes: response.data.likes, likedByUser: response.data.likedByUser } 
                        : reel
                )
            );
        } catch (error) {
            console.error('Error liking/unliking reel:', error);
        }
    };

    const handleShareClick = (reel) => {
        setSelectedReel(reel); // Open share modal for the selected reel
    };

    const closeShareModal = () => {
        setSelectedReel(null); // Close the share modal
    };

    const handleCopyLink = () => {
        const link = `http://localhost:3000/reel/${selectedReel._id}`;
        navigator.clipboard.writeText(link);
        alert("🔗 Link copied to clipboard!");
    };

    return (
        <div className="video-feed">
            {reels.map((reel) => (
                <div key={reel._id} className="video-card">
                    {reel.fileType === 'video' ? (
                        <video className="video-player" controls>
                            <source src={`http://localhost:5000${reel.files[0]}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={`http://localhost:5000${reel.files[0]}`} alt="Reel" className="reel-image" />
                    )}

                    {/* Caption under video (like Instagram) */}
                    <p className="caption">{reel.caption}</p>

                    <div className="actions">
                        <button onClick={() => handleLike(reel._id)} className="like-btn">
                            <FaHeart color={reel.likedByUser ? 'red' : 'white'} /> {reel.likes}
                        </button>

                        <button onClick={() => handleShareClick(reel)} className="share-btn">
                            <FaShare /> {reel.shares}
                        </button>
                    </div>
                </div>
            ))}

            {/* Share Options Modal (Instagram-style) */}
            {selectedReel && (
                <div className="share-modal-overlay" onClick={closeShareModal}>
                    <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="share-header">
                            <h3>Share Reel</h3>
                        </div>

                        <button onClick={() => window.open(`https://www.instagram.com/`, '_blank')}>
                            📸 Share to Instagram
                        </button>
                        <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/reel/${selectedReel._id}`, '_blank')}>
                            📘 Share to Facebook
                        </button>
                        <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/reel/${selectedReel._id}`, '_blank')}>
                            🐦 Share to Twitter
                        </button>
                        <button onClick={() => window.open(`https://api.whatsapp.com/send?text=http://localhost:3000/reel/${selectedReel._id}`, '_blank')}>
                            💬 Share to WhatsApp
                        </button>
                        <button onClick={handleCopyLink}>🔗 Copy Link</button>
                        <button className="close-btn" onClick={closeShareModal}>❌ Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Video;
