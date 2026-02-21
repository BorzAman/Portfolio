import React from 'react'
import Hero from './components/hero.jsx';
import Navbar from './components/navbar.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Footer/>
      {/* <div style={{ height: '50vh', backgroundColor: 'black' }} /> */}
    </>)
}

export default App
