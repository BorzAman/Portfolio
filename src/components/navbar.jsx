import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // --- State to track the currently active section ---
  const [activeSection, setActiveSection] = useState('Home');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // --- Intersection Observer to detect scroll position ---
    const sections = ['home', 'about', 'projects', 'contact']; 
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const formattedName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            setActiveSection(formattedName);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px"
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
      observer.disconnect(); 
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Playback blocked: ", err));
    }
    setIsPlaying(!isPlaying);
  };

  // --- NEW: External Links Array ---
  const externalLinks = [
    { name: 'LinkedIn ↗', url: 'https://www.linkedin.com/in/aman-sayyad-4022a632b/' },
    { name: 'Resume ↗', url: '#resume' }
  ];

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <audio ref={audioRef} src="/better_call_saul.mp3" loop />

      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: '20px',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '0 16px' : '0'
        }}
      >
        <nav style={{
          width: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? 'none' : '550px',
          height: '48px',
          backgroundColor: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderRadius: '24px', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#ffffff'
        }}>
          
          {/* Logo with hover effect and pointer */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer' }}
          >
            <span style={{ color: '#7cff67' }}>⚛</span> 
            <span>Aman</span>
          </motion.div>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              
              <a href={`#${activeSection.toLowerCase()}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSection}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.05, textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                    style={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      display: 'inline-block',
                      cursor: 'pointer'
                    }}
                  >
                    {activeSection}
                  </motion.span>
                </AnimatePresence>
              </a>

              {/* Mapped External Links */}
              {externalLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  whileHover={{ scale: 1.1, color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                  style={{
                    color: '#888',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.span 
                onClick={toggleMusic} 
                whileHover={{ scale: 1.2, textShadow: '0 0 10px rgba(124, 255, 103, 0.6)' }}
                style={{ 
                  cursor: 'pointer',
                  color: isPlaying ? '#7cff67' : '#888',
                  fontSize: '1.4rem', 
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isPlaying ? '⏸' : '♫'}
              </motion.span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!isMobile && (
              <motion.div
                whileHover={{ scale: 1.05, color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.3)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  color: '#888',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingLeft: '16px',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
              >
                <span style={{ 
                  height: '6px', 
                  width: '6px', 
                  backgroundColor: '#7cff67', 
                  borderRadius: '50%',
                  animation: 'blink 1.5s infinite ease-in-out',
                  boxShadow: '0 0 8px #7cff67'
                }}></span>
                {time}
              </motion.div>
            )}

            <motion.a 
              href="https://github.com/BorzAman" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="#7cff67" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </motion.a>

            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            )}
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              borderRadius: '20px',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              gap: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {['Home', 'About', 'Projects', 'Contact'].map((text) => (
              <motion.a 
                key={text} 
                href={`#${text.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)} 
                whileHover={{ x: 5, color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }}
              >
                {text}
              </motion.a>
            ))}
            
            {/* Added LinkedIn and Resume to Mobile Menu */}
            {externalLinks.map((link) => (
              <motion.a 
                key={link.name}
                href={link.url} 
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                onClick={() => setIsMobileMenuOpen(false)} 
                whileHover={{ x: 5, color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }}
              >
                {link.name}
              </motion.a>
            ))}
            
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <motion.span 
                onClick={toggleMusic} 
                whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(124, 255, 103, 0.6)' }}
                style={{ color: isPlaying ? '#7cff67' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span style={{ fontSize: '1.4rem' }}>{isPlaying ? '⏸' : '♫'}</span>
                {isPlaying ? 'Pause' : 'Music'}
              </motion.span>
              
              <motion.div
                whileHover={{ scale: 1.05, color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.3)' }}
                style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <span style={{ 
                  height: '6px', 
                  width: '6px', 
                  backgroundColor: '#7cff67', 
                  borderRadius: '50%',
                  animation: 'blink 1.5s infinite ease-in-out',
                  boxShadow: '0 0 8px #7cff67'
                }}></span>
                {time}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;