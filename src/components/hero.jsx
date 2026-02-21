import React from 'react';
import { motion } from 'framer-motion';
import Aurora from './LightRays/Aurora.jsx';
import TextType from './TextType/TextType.jsx';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    // Animation for the scroll arrow
    const arrowVariants = {
        animate: {
            y: [0, 12, 0],
            opacity: [0.4, 1, 0.4],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Smooth scroll handler for the bottom arrow
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div 
        id="home"
        style={{ 
            backgroundColor: 'black', 
            width: '100vw', 
            height: '100vh', 
            position: 'relative', 
            overflow: 'hidden' 
        }}>

            {/* 1. BACKGROUND LAYER */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* Updated Aurora to use strictly your 2 new colors */}
                <Aurora
                    colorStops={["#7bff69", "#04d6fa", "#7bff69"]}
                    amplitude={1.4}
                    blend={0.35}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
                    zIndex: 1
                }} />
            </div>

            {/* 2. CONTENT LAYER */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                    color: 'white',
                    fontFamily: "'Poppins', Inter, system-ui, -apple-system, sans-serif",
                    padding: '20px',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                }}
            >
                <motion.h3 variants={itemVariants} style={{
                    fontSize: '1.7rem',
                    fontWeight: '800',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.5px'
                }}>
                    About Aman
                </motion.h3>

                <motion.h2 variants={itemVariants} style={{
                    fontSize: 'clamp(1.7rem, 4vw, 3rem)',
                    fontWeight: '700',
                    margin: '0 0 20px 0',
                    color: '#9ca3af',
                    lineHeight: '1.2'
                }}>
                    <TextType
                        text={[
                            "A Web Developer!",
                            "A Problem Solver!",
                            "A Tech Enthusiast!"
                        ]}
                        typingSpeed={50}
                        deletingSpeed={30}
                        pauseDuration={2000}
                        // Updated Typing Text Colors
                        textColors={["#7bff69", "#04d6fa", "#7bff69"]}
                        cursorCharacter="|"
                    />
                </motion.h2>

                <motion.div variants={itemVariants} style={{ marginTop: '20px', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: '#e5e7eb', fontWeight: '400', margin: 0 }}>
                        I am a passionate <span style={{ color: '#7bff69', fontWeight: '600' }}>Software Engineer</span> with a knack for building full-stack web applications using modern technologies like 
                        <span style={{ fontWeight: '600' }}> Next.js and Tailwind CSS</span>.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: '#e5e7eb', margin: 0 }}>
                        With a strong foundation in <span style={{ color: '#04d6fa', fontWeight: '600' }}>JavaScript frameworks</span>, I create scalable and visually appealing applications.
                    </p>
                </motion.div>

                {/* 3. ANIMATED BOTTOM ARROW */}
                <motion.div 
                    variants={arrowVariants}
                    animate="animate"
                    onClick={scrollToAbout}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span style={{ 
                        fontSize: '0.75rem', 
                        color: '#9ca3af', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px',
                        fontWeight: '600'
                    }}>
                        Scroll
                    </span>
                    {/* Using the new Cyan color for the arrow to balance the screen */}
                    <svg 
                        width="30" 
                        height="30" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#04d6fa" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;