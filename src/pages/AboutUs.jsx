import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../public/css/about-us.css';

const teamMembers = [
  { 
    name: 'Pritam Roy Choudhury', 
    role: 'CEO', 
    image: 'https://imgs.search.brave.com/5_b9qs9zItl8B8BbUkDC1FbXMnnxkXocVNdOGKX3IvM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FhLzA2/L2I2L2FhMDZiNmZh/YjY3MWZmMzUzZTJh/ZjNkNjE4ZTgwMWY4/LmpwZw',
    bio: 'Pritam has over 15 years of experience in tech leadership.'
  },
  { 
    name: 'Bittu Pandey', 
    role: 'Front-End Developer', 
    image: 'https://imgs.search.brave.com/OHw8RQ9NPNqWsGzajtO6qD8GAujYijsYBYx6-guuuoE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU0/MjU2NjEwOC9mci9w/aG90by9qZXVuZS1o/b21tZS1kYWZmYWly/ZXMtc291cmlhbnQt/JUMzJUEwLWxhcHBh/cmVpbC1waG90by5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/T0hPVFAzaDE3Rjh0/U1E5RDd0UHlOV1Jq/RTdfb2dsSlJwSmFk/bmZseWpyYz0',
    bio: 'Bittu is a brilliant technologist solving complex problems.'
  },
  { 
    name: 'Shubham Maji', 
    role: 'Back-End Developer', 
    image: 'https://imgs.search.brave.com/MkYaJ28NgWpOf3z26ftGSJq1409IHVlCcqnf5hrcaLo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE2LzI0/Lzc1LzE2MjQ3NWY0/MmI4ZmZkZTJlMTJk/MDU4MTc2N2E0YmY5/LmpwZw',
    bio: 'Shubham\'s strategies have helped us reach new heights.'
  },
  { 
    name: 'Kumari Raj Shilpy Singh', 
    role: 'Designer', 
    image: 'https://imgs.search.brave.com/sAAbEMCdik-672iclUuMaYTPz4iI8NyTDnu0dUuAfDE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/b21hbi1ncmV5LWNs/b3RoZXMtc21pbGlu/Z18yMy0yMTQ3OTcw/NDc1LmpwZz9zZW10/PWFpc19oeWJyaWQ',
    bio: 'Shilpy brings creativity to every project he touches.'
  },
];

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-container">
      <header className="about-header" data-aos="fade-down">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Innovating for a better tomorrow</p>
      </header>

      {/* Team section */}
      <section className="team-section" data-aos="fade-up">
        <p className="about-definition">
          We are a team of dedicated professionals passionate about solving complex problems
          and making a meaningful impact through technology and innovation.
        </p>
        <h2 className="team-section-title">Our Amazing Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="team-card-inner" data-aos="flip-left">
                <div className="team-card-front">
                  <img src={member.image} alt={member.name} className="member-image" />
                </div>
                <div className="team-card-back">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section" data-aos="fade-up">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          We strive to create innovative solutions that make a positive impact on the world.
          Through collaboration, creativity, and cutting-edge technology, we aim to solve
          complex problems and improve people's lives.
        </p>
      </section>
      <section className="values-section">
  <h2 className="values-title">Our Core Values</h2>
  <div className="values-grid">
    <div className="value-card">
      <i className="fas fa-leaf"></i>
      <h3 className="value-title">Sustainability</h3>
      <p className="value-description">We strive to protect the environment by promoting green practices and conscious innovation.</p>
    </div>
    <div className="value-card">
      <i className="fas fa-lightbulb"></i>
      <h3 className="value-title">Innovation</h3>
      <p className="value-description">We believe in breaking boundaries through creative problem-solving and forward thinking.</p>
    </div>
    <div className="value-card">
      <i className="fas fa-users"></i>
      <h3 className="value-title">Collaboration</h3>
      <p className="value-description">We grow together by working as a united team, building on each other's strengths.</p>
    </div>
  </div>
</section>

<section className="impact-section">
  <h2 className="impact-title">Our Impact So Far</h2>
  <div className="impact-grid">
    <div className="impact-item">
      <div className="impact-number">5K+</div>
      <div className="impact-label">Plastic Bottles Saved</div>
    </div>
    <div className="impact-item">
      <div className="impact-number">10+</div>
      <div className="impact-label">Sustainability Projects</div>
    </div>
    <div className="impact-item">
      <div className="impact-number">100%</div>
      <div className="impact-label">Community Driven</div>
    </div>
  </div>
</section>

    </div>
  );
}
