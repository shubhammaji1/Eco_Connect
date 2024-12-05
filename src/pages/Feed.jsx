import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import "../../public/css/feed.css";

const FeedSection = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Simulating an API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              username: "john",
              userAvatar: "https://avatar.iran.liara.run/public/33",
              image: "https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
              caption: "Enjoying a beautiful day at the beach! 🏖️",
              likes: 1234,
              comments: 56,
              isLiked: false,
              isBookmarked: false
            },
            {
              id: 2,
              username: "janedoe",
              userAvatar: "https://avatar.iran.liara.run/public/30",
              image: "https://via.assets.so/game.jpg?w=1280&h=720",
              caption: "Just finished my latest painting. What do you think? 🎨",
              likes: 987,
              comments: 43,
              isLiked: false,
              isBookmarked: false
            },
            {
              id: 3,
              username: "artlover",
              userAvatar: "https://avatar.iran.liara.run/public/73",
              image: "https://placebear.com/1280/720",
              caption: "Visited the new art exhibition downtown. Absolutely stunning! 🖼️",
              likes: 2345,
              comments: 78,
              isLiked: false,
              isBookmarked: false
            }
          ]);
        }, 1000);
      });
      setPosts(response);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  if (isLoading) {
    return <div className="feed-section">Loading...</div>;
  }

  if (error) {
    return <div className="feed-section">{error}</div>;
  }

  return (
    <div className="feed-section">
      <h2 className="feed-title">Your Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img src={post.userAvatar} alt={post.username} className="user-avatar" />
            <span className="username">{post.username}</span>
          </div>
          <img src={post.image} alt="Post content" className="post-image" />
          <div className="post-actions">
            <button onClick={() => handleLike(post.id)} aria-label={post.isLiked ? "Unlike" : "Like"}>
              {post.isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
              <span>{post.likes}</span>
            </button>
            <button aria-label="Comment">
              <FaComment />
              <span>{post.comments}</span>
            </button>
            <button aria-label="Share">
              <FaShare />
            </button>
            <button onClick={() => handleBookmark(post.id)} aria-label={post.isBookmarked ? "Remove Bookmark" : "Bookmark"}>
              {post.isBookmarked ? <FaBookmark className="bookmarked" /> : <FaRegBookmark />}
            </button>
          </div>
          <p className="post-caption">
            <strong>{post.username}</strong> {post.caption}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;