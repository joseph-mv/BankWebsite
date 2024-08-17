// components/ServicesContact.js
import React from 'react';
import './Services.css';

function ServicesContact() {
  return (
    <section className="services-contact-section">
      <div className="services-section">
        <h3>Our Services</h3>
        <hr/>
        <div className="services">
          <div className="service-item">
            <h4>Personal Banking</h4>
            <p>Manage your personal accounts, savings, and more.</p>
          </div>
          <div className="service-item">
            <h4>Business Banking</h4>
            <p>Solutions tailored for your business needs.</p>
          </div>
          <div className="service-item">
            <h4>Loans</h4>
            <p>Get loans with flexible terms and conditions.</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h3>Contact Us</h3>
        <hr/>
        <p>Reach out to us for any queries or support.</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Your Message" className="form-textarea"></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      <footer className="footer">
        <p>&copy; 2024 XYZ Bank. All Rights Reserved.</p>
      </footer>
    </section>
  );
}

export default ServicesContact;
