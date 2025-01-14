// src/RefundPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import '../../public/css/refundPolicy.css';  // Import external CSS file for styling

const RefundPolicy = () => {
  return (
    <div className="refund-policy-wrapper">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="refund-policy-header"
      >
        <h1>Refund Policy</h1>
        {/* <p>Your satisfaction is our priority. Please read our refund policy carefully.</p> */}
      </motion.header>

      <div className="refund-policy-content">
        <motion.section
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="refund-policy-section"
        >
          <h2>1. Refund Eligibility</h2>
          <p>To qualify for a refund, the product must be unused and in its original condition, including packaging.</p>
        </motion.section>

        <motion.section
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="refund-policy-section"
        >
          <h2>2. Requesting a Refund</h2>
          <p>To request a refund, contact our support team within 30 days of your purchase.</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="refund-policy-section"
        >
          <h2>3. Refund Process</h2>
          <p>Once your refund is approved, the payment will be returned to the original method of payment within 7-10 business days.</p>
        </motion.section>
      </div>
    </div>
  );
};

export default RefundPolicy;
