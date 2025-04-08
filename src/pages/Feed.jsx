import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import "../../public/css/feed.css";

const FeedSection = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MY_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight + 100 >= scrollHeight && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const queries = ['environment', 'recycled products', 'e-waste recycling'];
      const responses = await Promise.all(
        queries.map(query =>
          fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&page=${page}&client_id=${MY_API_KEY}`)
        )
      );
  
      const dataList = await Promise.all(responses.map(res => res.json()));
  
      const formatData = (items, type) =>
        items.map(item => ({
          id: `${item.id}-${Math.random().toString(36).substring(2, 7)}`,
          username: item.user.username || "unsplash_user",
          userAvatar: item.user.profile_image?.medium || '',
          image: item.urls?.regular || '',
          caption:
            item.alt_description ||
            (type === 'e-waste'
              ? "Recycle your old electronics responsibly ♻️"
              : type === 'recycle'
              ? "Recycled products that save our planet ♻️"
              : "Preserving the environment for future generations 🌱"),
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 100),
          isLiked: false,
          isBookmarked: false,
        }));
  
      const allPosts = [
        ...formatData(dataList[0].results, 'environment'),
        ...formatData(dataList[1].results, 'recycle'),
        ...formatData(dataList[2].results, 'e-waste')
      ].sort(() => 0.5 - Math.random());
  
      setPosts(prevPosts => [...prevPosts, ...allPosts]);
  
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  return (
    <div className="feed-section">
      <h2 className="feed-title">Eco & E-Waste Recycling Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img
              src={post.userAvatar}
              alt={post.username}
              className="user-avatar"
            />
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
      {isLoading && <p className="loading-text">Loading more posts...</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FeedSection;
