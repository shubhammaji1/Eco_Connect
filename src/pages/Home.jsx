import React, { useState, useEffect, useRef } from 'react';
import Chatbot from "../components/ChatBot/chatbot";
import Bot from "../components/ChatBot/Bot";
import { Link, Element } from "react-scroll";
import {useInView} from "framer-motion"; // Import framer-motion
import { TbMoodSearch } from "react-icons/tb";
import '../../public/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const [sliderItems, setSliderItems] = useState([1, 2, 3, 4]); // Example item IDs
  const [thumbnails, setThumbnails] = useState([1, 2, 3, 4]); // Example thumbnail IDs
  const carouselRef = useRef(null);

  const timeRunning = 3000; // Animation duration
  const timeAutoNext = 7000; // Auto-next slide duration
  const autoNextRef = useRef(null);


  // Function to handle slider transitions
  const showSlider = (type) => {
    if (!carouselRef.current) return;

    carouselRef.current.classList.remove('next', 'prev'); // Reset classes

    setTimeout(() => {
      const updatedSliderItems = [...sliderItems];
      const updatedThumbnails = [...thumbnails];

      if (type === 'next') {
        updatedSliderItems.push(updatedSliderItems.shift());
        updatedThumbnails.push(updatedThumbnails.shift());
        carouselRef.current.classList.add('next');
      } else if (type === 'prev') {
        updatedSliderItems.unshift(updatedSliderItems.pop());
        updatedThumbnails.unshift(updatedThumbnails.pop());
        carouselRef.current.classList.add('prev');
      }

      setSliderItems(updatedSliderItems);
      setThumbnails(updatedThumbnails);

      setTimeout(() => {
        carouselRef.current.classList.remove('next', 'prev');
      }, timeRunning); // Remove animation class after animation ends
    },50); // Small delay to ensure class re-addition triggers animation
  };

  // Auto slide logic
  useEffect(() => {
    const autoSlide = () => {
      showSlider('next');
    };

    autoNextRef.current = setInterval(autoSlide, timeAutoNext);

    return () => {
      clearInterval(autoNextRef.current);
    };
  }, [sliderItems]);


  return (
    <div>
      <header>
        <div className="logo">
          <span>Eco</span>
          <span>Connect</span>
          <img  src="images\roboticon.gif" alt="Chatbot"/>
        </div>
        <nav>
          <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
            <li><a href="/about">About</a></li>
            <Link to="offerings" smooth={true} duration={1000}>
              <li className='headerpointer'><a>Offerings</a></li>
            </Link>
            <li><a href="/blog">Blog</a></li>
            <Link to="footer" smooth={true} duration={1000}>
              <li className='headerpointer'><a>Contact</a></li>
            </Link>
          </ul>
          <div className="hamburger">
            <span><a href="#home" className="active">Home</a></span>
            <span><a href="#about">About</a></span>
            <span><Link to="offerings" smooth={true} duration={1000}>
              <li><a>Offerings</a></li>
            </Link>
            </span>
            <span><li><a href="/blog">Blog</a></li></span>
            <span>
            <Link to="footer" smooth={true} duration={1000}>
              <li><a>Contact</a></li>
            </Link></span>
          </div>
        </nav>
      </header>


      {/* Carousel */}
      <div className="carousel" ref={carouselRef}>
        {/* List Items */}
        <div className="list">
          {sliderItems.map((item, index) => (
            <div className="item" key={`slider-${index}`}>
              <img src={`images/img${item}.jpg`} alt={`Carousel ${item}`} />
              <div className="content">
                <div className="author">PRC  SM  BP  KRSS</div>
                <div className="title">Eco-Connect </div>
                <div className="topic">THE FUTURE HOME</div>
                <div className="des">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam
                  nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid
                  assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo,
                  laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum
                  aperiam illo illum laudantium?
                </div>
                <div className="homesearch">
                  <form action="/blog" method="get" class="search-bar">
                    <input type="text" placeholder="Search anything..." />
                    <button type='submit'><TbMoodSearch /></button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thumbnail */}
        <div className="thumbnail">
          {thumbnails.map((item, index) => (
            <div className="item" key={`thumbnail-${index}`}>
              <img src={`images/img${item}.jpg`} alt={`Thumbnail ${item}`} />
              <div className="content">
                <div className="title">Name Slider</div>
                <div className="description">Description</div>
              </div>
            </div>
          ))}
        </div>

        {/* Next and Previous Arrows */}
        <div className="carousel-arrows">
          <button id="prev" onClick={() => showSlider('prev')}> &lt;</button>
          <button id="next" onClick={() => showSlider('next')}> &gt;</button>
        </div>

        {/* Time Running */}
        <div className="time"></div>
      </div>



      {/* Solutions Section */}
      <section className="solutions">
        <p className="solutions-prefix">Empowering Sustainable Solutions for a Greener Future</p>
        <h2>Our Solutions for Sustainable Living</h2>
        <div className="solution-cards">
          <div className="solution-card">
            <h3><span>01.</span> Eco-Friendly Marketplace</h3>
            <p>Our platform enables you to buy and sell pre-loved items, reducing waste and promoting a circular economy that benefits both people and the planet.</p>
          </div>
          <div className="solution-card">
            <h3><span>02.</span> Educational Resources</h3>
            <p>We provide a hub for eco-conscious articles, blogs, and resources to raise awareness and spread knowledge on environmental issues and sustainable practices.</p>
          </div>
          <div className="solution-card">
            <h3><span>03.</span> Community Engagement</h3>
            <p>Join a community of like-minded individuals working together to drive positive environmental change and share innovative ideas for sustainability.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <div className="about-image">
            <img src="https://i.ibb.co/HhD70qG/earth-day-environment-green-globe-260nw-2285503199.webp" alt="Eco-friendly tree landscape" />
          </div>
          <div className="about-text">
            <p className="about-prefix">Promoting Eco-Conscious Values</p>
            <h2>Our Journey Towards a Sustainable Future</h2>
            <p>EcoConnect is dedicated to driving positive environmental impact through education, community, and sustainable practices. Join us on a journey where every step we take is geared towards building a greener, more responsible future.</p>
            <a href="#" className="about-button">Read More</a>
          </div>
        </div>
      </section>

      {/* Key Offerings Section */}
      <section className="offerings" id="offerings">
        <p className="offerings-prefix">Driving Impact Through Purposeful Engagement</p>
        <h2>Our Key Offerings</h2>
        <div className="offerings-container">
          <div className="offering-card">
            <img src="images/BuySell.png" alt="Eco-friendly Products" />
            <h3>Buy & Sell</h3>
            <p>Users can list their used products for sale, promoting the reuse of items and reducing their carbon footprint.</p>
            <a href="#" className="offerings-button">Read More</a>
          </div>
          <div className="offering-card">
            <img src="images/Shareideas.png" alt="Educational Resources" />
            <h3>Awareness Hub</h3>
            <p>A platform where users share articles, blogs, and tips to educate and inspire eco-friendly practices.</p>
            <a href="#" className="offerings-button">Read More</a>
          </div>
          <div className="offering-card">
            <img src="images/Deliverr.png" alt="Engagement Opportunities" />
            <h3>Reprocessing</h3>
            <p>All items are sent to the factory, where they undergo processing and recycling.</p>
            <a href="#" className="offerings-button">Read More</a>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-header">
          <h2>What Our Users Say</h2>
        </div>
        <div className="testimonials">
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>"EcoConnect has made it so easy for me to find second-hand items and contribute to a sustainable lifestyle. It's amazing to be part of a community that values responsible consumption and environmental awareness!"</p>
            <div className="author">
              <img src="images/p.jpg" alt="User 1" />
              <div>
                <h4>Pritam R.C.</h4>
                <p>Eco-conscious User</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="stars">★★★★</div>
            <p>"Using EcoConnect has changed the way I shop and interact with others. It's more than just an app; it's a movement towards a greener future. I love the educational content that helps me stay informed about environmental issues."</p>
            <div className="author">
              <img src="images/s.jpg" alt="User 2" />
              <div>
                <h4>Shubham M.</h4>
                <p>Environment Advocate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer" id="footer">
        <div className="footer-container">
          <div className="footer-about">
            <img src="images/EC.png" alt="EcoConnect Logo" className="logo" />
            <p>EcoConnect is dedicated to promoting sustainable living through a platform that encourages the reuse of items and raises awareness about environmental issues. Join us in making a positive impact!</p>
            <p><strong>Follow Us on:</strong></p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><a href="/feed">Sustainability Blog</a></li>
              <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/refund-policy">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><i className="fa fa-phone"></i> +919732290756</p>
            <p><i className="fa fa-envelope"></i> shubhammaji.21@nshm.edu.in</p>
            <p><i className="fa fa-map-marker"></i> 123 Sripur Road, Kulti</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Copyright 2023 EcoConnect. All Rights Reserved.</p>
        </div>
      </footer>
      <Bot/>
    </div>
  );
};

export default Home;