import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkStyle = {
    color: '#888',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/BorzAman",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      color: "#ffffff"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aman-sayyad-4022a632b/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      color: "#00d4ff" // Cyan accent
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      color: "#7cff67" // Foodingo Green accent
    }
  ];

  return (
    <footer 
    id="contact"
    style={{
      backgroundColor: '#000508', // Ultra-dark base to finish the page
      padding: isMobile ? '60px 20px 30px' : '100px 40px 40px',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    }}>
      
      {/* Subtle Background Glow */}
      <div
      // id="contact"
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
        opacity: 0.5,
        boxShadow: '0 0 20px 2px rgba(0, 212, 255, 0.3)'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* TOP SECTION: CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <h2 style={{ 
            fontSize: isMobile ? '2rem' : '3.5rem', 
            fontWeight: '800', 
            margin: 0,
            letterSpacing: '-1px'
          }}>
            Let's build something <br />
            <span style={{ 
              background: 'linear-gradient(to right, #7cff67, #00d4ff)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              amazing together.
            </span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '500px', margin: '0 0 10px 0' }}>
            Currently seeking new opportunities and open to exciting projects. If you're looking for a MERN stack developer, my inbox is open!
          </p>
          <motion.a 
            href="mailto:your.email@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 32px',
              backgroundColor: '#ffffff',
              color: '#000000',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            Say Hello 👋
          </motion.a>
        </motion.div>

        {/* MIDDLE SECTION: Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '60px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '1.2rem' }}>
              <span style={{ color: '#7cff67' }}>⚛</span> 
              <span>Aman.</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px', margin: 0 }}>
              B.Tech student & Full Stack Developer specializing in MERN applications. Exploring Data Science.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 4px 0', fontWeight: '600' }}>Navigation</h4>
            {['Home', 'About', 'Projects', 'Resume'].map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                whileHover={{ x: 5, color: '#fff' }}
                style={linkStyle}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 4px 0', fontWeight: '600' }}>Connect</h4>
            {socialLinks.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5, color: link.color }}
                style={linkStyle}
              >
                <span style={{ opacity: 0.8 }}>{link.icon}</span>
                {link.name}
              </motion.a>
            ))}
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Scroll to Top */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          paddingTop: '30px',
          gap: '20px'
        }}>
          <div style={{ color: '#555', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>© {new Date().getFullYear()} Aman. All rights reserved.</span>
            {!isMobile && (
              <>
                <span style={{ width: '4px', height: '4px', backgroundColor: '#555', borderRadius: '50%' }} />
                <span>Built with React & Framer Motion</span>
              </>
            )}
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </motion.button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;