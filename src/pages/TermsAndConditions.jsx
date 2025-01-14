import React, { useState } from "react";
import "../../public/css/termsAndConditions.css";

const termsData = [
  {
    title: "Introduction",
    content:
      "Welcome to our platform! By accessing or using our service, you agree to be bound by these terms and conditions.",
  },
  {
    title: "Eligibility",
    content:
      "You must be at least 18 years old to use this service. By using our service, you represent and warrant that you meet these eligibility requirements.",
  },
  {
    title: "User Conduct",
    content:
      "Users are expected to use the platform responsibly. Any misuse, including illegal activities, is strictly prohibited and may result in termination of your account.",
  },
  {
    title: "Privacy Policy",
    content:
      "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and share information about you.",
  },
];

const TermsAndConditions = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p className="terms-subtitle">
        Please read these terms carefully before using our platform.
      </p>
      <div className="terms-list">
        {termsData.map((term, index) => (
          <div
            className={`terms-item ${
              expandedSection === index ? "active" : ""
            }`}
            key={index}
          >
            <div
              className="terms-header"
              onClick={() => toggleSection(index)}
            >
              <h2>{term.title}</h2>
              <span className="toggle-icon">
                {expandedSection === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`terms-content ${
                expandedSection === index ? "expanded" : ""
              }`}
            >
              <p>{term.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
