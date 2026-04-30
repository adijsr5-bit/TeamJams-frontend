import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './About.css';

const About = () => {
  const { settings } = useContext(ThemeContext);
  return (
    <div className="about-page-container">
      <div className="about-page-header">
        <div className="overlay"></div>
        <motion.div 
          className="header-content text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Small Beginnings</h1>
          <div className="divider"></div>
          <h2>Our Philosophy</h2>
        </motion.div>
      </div>

      <div className="container about-content-wrapper">
        <motion.div 
          className="about-section text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="section-subtitle">Mediterranean & International Cuisine</h3>
          <div className="lead-text" style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.8' }}>
            {settings.aboutUsText}
          </div>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            className="about-grid-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" alt="Mediterranean Cuisine" />
            </div>
          </motion.div>
          <motion.div 
            className="about-grid-item text-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {settings.aboutUsSection1}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="about-section text-center aim-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="section-subtitle">We aim to please everyone</h3>
          <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            {settings.aboutUsSection2}
          </div>
          <div className="mt-4" style={{ marginTop: '30px' }}>
             <Link to="/book" className="btn-primary">Book your table</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
