import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import './Contact.css';
import { ThemeContext } from '../context/ThemeContext';

const Contact = () => {
  const { settings } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="contact-page-container">
      <div className="contact-page-header">
        <div className="overlay"></div>
        <motion.div 
          className="header-content text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Contact Us</h1>
          <div className="divider"></div>
          <p>We would love to hear from you.</p>
        </motion.div>
      </div>

      <div className="container contact-content-wrapper">
        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2>Get in Touch</h2>
            <div className="divider-left"></div>
            <p className="contact-desc">
              {settings.contactText}
            </p>
            
            <div className="info-block">
              <h3>Address</h3>
              <p style={{whiteSpace: 'pre-line'}}>{settings.address}</p>
            </div>
            
            <div className="info-block">
              <h3>Contact Info</h3>
              <p>Phone: {settings.contactPhone}<br/>Email: {settings.contactEmail}</p>
            </div>
            
            <div className="info-block">
              <h3>Opening Hours</h3>
              <p>{settings.openingHours}</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  className="input-field luxury-input" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="input-field luxury-input" 
                  required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  className="input-field luxury-input" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary mt-4" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
