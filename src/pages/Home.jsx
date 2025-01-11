import React from 'react';
import '../../public/css/styles.css';

const Home = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <span>EcoConnect</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/offerings">Offerings</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>
      <script src="../../public/js/script.js"></script>
      <div className="hero">
        <div className="hero-images">
          <img src="images/Hero-Section.jpg" alt="Slide 1" />
          <img src="images/download.jpeg" alt="Slide 2" />
          <img src="images/Heros.jpg" alt="Slide 3" />
          <img src="images/pic3.jpg" alt="Slide 4" />
          <img src="images/pic5.jpg" alt="Slide 5" />
        </div>
        <button className="prev EcoButton" onClick={() => moveSlide(-1)}>&#10094;</button>
        <button className="next EcoButton" onClick={() => moveSlide(1)}>&#10095;</button>
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
      <section className="offerings">
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
              <li><a href="#">About Us</a></li>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Sustainability Blog</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
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
      
    </div>
  );
};

export default Home;
