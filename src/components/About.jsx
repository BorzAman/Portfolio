import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- SVGs for the Skill Cards ---
const Icons = {
  web: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <path d="m10 13-2 2 2 2"></path>
      <path d="m14 17 2-2-2-2"></path>
    </svg>
  ),
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  ),
  data: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  people: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
};

// --- Reusable Skill Card Component ---
const SkillCard = ({ title, description, icon }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#051821', // Dark card background
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none'
      }}
    >
      {/* Border Glow on Hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        padding: '1px',
        background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, #00d4ff, transparent 80%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none'
      }} />

      {/* Inner Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 255, 0.05), transparent 80%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none'
      }} />

      {/* Icon Wrapper */}
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: 'rgba(0, 212, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00d4ff' // Cyan accent color
      }}>
        {icon}
      </div>

      <div>
        <h3 style={{ color: 'white', fontSize: '1.15rem', margin: '0 0 8px 0', fontWeight: '600' }}>{title}</h3>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Updated Skills Array
  const skills = [
    { title: "Full Stack Dev", description: "Building responsive, dynamic web applications from front to back using modern frameworks.", icon: Icons.web },
    { title: "Clean Code", description: "Writing maintainable, modular, and high-performance codebases.", icon: Icons.code },
    { title: "Problem Solver", description: "Breaking down complex logic into efficient, scalable solutions.", icon: Icons.trophy },
    { title: "Data Science", description: "Exploring data analytics, modeling, and turning raw data into actionable insights.", icon: Icons.data }
  ];

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <section id="about" style={{
      background: 'radial-gradient(circle at 50% 50%, #001217 0%, #000000 100%)', // Match your teal/navy theme
      padding: isMobile ? '80px 20px' : '120px 40px',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative'
    }}>
      {/* Dot Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '800', margin: '0 0 10px 0' }}>
            About <span style={{ background: 'linear-gradient(to right, #00d4ff, #7cff67)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>Crafting digital solutions & exploring data</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          
          {/* Left Column: Background Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              backgroundColor: '#051821',
              padding: isMobile ? '30px' : '40px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <h3 style={{ color: '#00d4ff', fontSize: '1.5rem', margin: '0 0 24px 0', fontWeight: '600' }}>Background</h3>
            
            <div style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ margin: 0 }}>
                As a passionate <strong style={{ color: 'white' }}>Web Developer</strong>, my journey is centered around turning complex logic into seamless digital experiences. I specialize in building end-to-end applications from scratch.
              </p>
              <p style={{ margin: 0 }}>
                My core expertise lies in crafting scalable backends and highly interactive interfaces. Currently, I am expanding my horizons by exploring the field of <strong style={{ color: '#00d4ff' }}>Data Science</strong>, eager to understand how data analysis and predictive modeling can drive smarter decision-making.
              </p>
              <p style={{ margin: 0 }}>
                What motivates me is solving problems that require out-of-the-box thinking. Exploring logical challenges has shaped the way I approach projects—breaking them down and building solutions that are both simple and effective.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Staggered Skills Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '20px'
            }}
          >
            {skills.map((skill, index) => (
              <motion.div key={index} variants={cardVariants}>
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;