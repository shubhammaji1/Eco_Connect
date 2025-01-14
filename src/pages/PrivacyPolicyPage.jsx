import React from "react";
import { motion } from "framer-motion";
import "../../public/css/privacyPolicy.css";


const PrivacyPolicyAdvanced = () => {
  
  return (
    <div className="privacy-policy-container">
      {/* Page Header with Animation */}
      <motion.header
        className="privacyPolicy-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <h1>Privacy Policy</h1>
        <p>We value your privacy and are committed to safeguarding it.</p>
      </motion.header>

      {/* Privacy Policy Content with Advanced Animations */}
      <motion.section
        className="policy-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        <motion.div
          className="content-card"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h2>1. Information We Collect</h2>
          <p>
            We collect basic information such as your name, email, and usage
            data to personalize your experience on our platform.
          </p>
        </motion.div>

        <motion.div
          className="content-card"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <h2>2. How We Use Your Information</h2>
          <p>
            Your data helps us enhance your experience, make recommendations, and
            improve the services we offer.
          </p>
        </motion.div>

        <motion.div
          className="content-card"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          <h2>3. Data Security</h2>
          <p>
            We use state-of-the-art encryption to protect your information, ensuring
            it remains secure and private.
          </p>
        </motion.div>

        <motion.div
          className="content-card"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your data at any time.
          </p>
        </motion.div>
      </motion.section>

      {/* Footer with Animation */}
      <motion.footer
        className="privacy-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1.5 }}
      >
        <p>&copy; 2025 My Company. All Rights Reserved.</p>
      </motion.footer>
    </div>
  );
};

export default PrivacyPolicyAdvanced;
