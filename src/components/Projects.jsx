import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Icons for Links ---
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);


const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const TimelineItem = ({ project, index, isMobile }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-end' : (isEven ? 'flex-start' : 'flex-end'),
        width: '100%',
        marginBottom: isMobile ? '60px' : '100px',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        left: isMobile ? '20px' : '50%',
        top: '40px',
        width: isMobile ? '12px' : '16px',
        height: isMobile ? '12px' : '16px',
        backgroundColor: project.color,
        borderRadius: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        boxShadow: `0 0 20px ${project.color}`,
        border: '3px solid black'
      }} />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: isMobile ? 'calc(100% - 50px)' : '45%',
          backgroundColor: '#051821', 
          borderRadius: '24px',
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.6)` : '0 10px 30px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isHovered && !isMobile ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            padding: '2px',
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}, transparent 80%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}15, transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        <div style={{ 
          width: '100%', 
          height: isMobile ? '160px' : '200px', 
          overflow: 'hidden',
          backgroundColor: '#222',
          position: 'relative'
        }}>
          <img 
            src={project.image} 
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
              transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
              opacity: 0.8
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: `linear-gradient(to top, #051821, transparent)`
          }} />
        </div>

        <div style={{ padding: isMobile ? '20px' : '25px', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ 
              color: project.color, 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '1px',
              textTransform: 'uppercase' 
            }}>{project.year}</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
               {project.tags.map((tag, i) => (
                 <span key={i} style={{ 
                   fontSize: '0.65rem', 
                   color: '#fff', 
                   backgroundColor: `${project.color}15`, 
                   border: `1px solid ${project.color}40`, 
                   padding: '4px 10px', 
                   borderRadius: '12px',
                   fontWeight: '600'
                 }}>
                   {tag}
                 </span>
               ))}
            </div>
          </div>
          
          <h3 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '2rem', margin: '12px 0', fontWeight: '800' }}>{project.title}</h3>
          <p style={{ color: '#9ca3af', lineHeight: '1.7', fontSize: isMobile ? '0.9rem' : '1rem', margin: '0 0 20px 0', fontWeight: '400' }}>{project.longDescription}</p>
          
          <div style={{ 
             display: 'flex', 
             alignItems: 'center', 
             gap: '16px',
             marginTop: 'auto' 
          }}>
            {project.github && (
              <motion.a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: project.color }}
                style={{ color: '#888', transition: 'color 0.3s ease', cursor: 'pointer', display: 'flex' }}
              >
                <GitHubIcon />
              </motion.a>
            )}
            {project.live && (
              <motion.a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: project.color }}
                style={{ color: '#888', transition: 'color 0.3s ease', cursor: 'pointer', display: 'flex' }}
              >
                <ExternalLinkIcon />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"] 
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const projects = [
    { 
      title: "Foodingo", 
      year: "2025", 
      longDescription: "A full-featured food delivery ecosystem built with the MERN stack. Features real-time order tracking, secure Stripe payments, and a dynamic dashboard.", 
      color: "#7bff69", 
      image: "/food.png",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/BorzAman/Food-Delivery-Website",
      live: "https://foodingofooddelivery.onrender.com/"
    },
    { 
      title: "Animal Report", 
      year: "2026", 
      longDescription: "An intelligent classification app leveraging the Gemini AI API. Generates detailed biological reports and habitat insights from wildlife images.", 
      color: "#07d6f7", 
      image: "/animal.png",
      tags: ["React", "Node.js", "Firebase", "Gemini API"],
      github: "https://github.com/BorzAman/Animal-Report-App",
      live: "https://animal-report-app.vercel.app/"
    },
    { 
      title: "Portfolio", 
      year: "2026", 
      longDescription: "A high-performance developer portfolio built with Vite. Showcasing advanced React concepts, Framer Motion, and custom UI components.", 
      color: "#7bff69", 
      image: "/portfolio.png",
      tags: ["React", "Vite", "Framer Motion"],
      github: "https://github.com/BorzAman/Portfolio",
      live: "https://aman-98.vercel.app/"
    },
    { 
      title: "DigitalGram Seva", 
      year: "2026", 
      longDescription: "A full-stack E-Governance web application aimed at rural digitization. It enables villagers to access government schemes, request digital documents, and report local issues through an integrated grievance portal.", 
      color: "#07d6f7", 
      image: "/gramseva.png", 
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/SarthakPardeshi/Gramseva/",
      live: "https://gramseva-seven.vercel.app/"
    }
  ];

  return (
    <section 
      id="projects" 
      style={{ 
        background: 'radial-gradient(circle at 50% 50%, #001217 0%, #000000 100%)',
        padding: isMobile ? '80px 15px' : '150px 20px', 
        overflowX: 'hidden',
        position: 'relative',
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        fontFamily: "'Poppins', sans-serif" // Applying the custom font here globally for the section
      }}
    >
      <motion.div 
        style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '120px' }}
      >
        {/* --- Added Spring Animation to the Title --- */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ 
            fontSize: isMobile ? '3rem' : '4.5rem', 
            fontWeight: '800', 
            margin: '0 0 10px 0', 
            letterSpacing: '-2px' 
          }}
        >
          {/* Explicitly making "Project" white */}
          <span style={{ color: '#ffffff' }}>Project</span>{' '}
          <span style={{ background: 'linear-gradient(to right, #00d4ff, #7bff69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Journey</span>
        </motion.h2>
        
        {/* Subtitle animation triggers slightly after the main title */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ color: '#9ca3af', fontSize: '1.1rem', fontWeight: '500' }}
        >
          A showcase of my recent full-stack builds
        </motion.p>
      </motion.div>
      
      <div ref={containerRef} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} />

        <motion.div style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50%',
          top: 0,
          width: '2px',
          height: lineHeight,
          background: 'linear-gradient(to bottom, #7bff69, #07d6f7, #7bff69, #07d6f7)',
          transform: 'translateX(-50%)',
          zIndex: 1,
          boxShadow: '0 0 15px rgba(7, 214, 247, 0.3)' 
        }} />

        {projects.map((proj, i) => (
          <TimelineItem key={i} project={proj} index={i} isMobile={isMobile} />
        ))}
      </div>
      
      <div style={{ height: isMobile ? '10vh' : '30vh' }} />
    </section>
  );
};

export default Projects;

