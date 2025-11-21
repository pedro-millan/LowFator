import React, { useState } from 'react';
import IntroVideo from './components/IntroVideo';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';




const handleAudioUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('Audio subido:', file);
  }
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  const isMobile = window.innerWidth <= 480;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Solo muestra la intro si NO es móvil */}
                {showIntro && !isMobile ? (
                  <IntroVideo onFinish={handleIntroEnd} />
                ) : (
                  <div className={`background-fondo ${!showIntro ? 'fade-in' : ''}`}>

                    <img
                      src="/fijo_in-out.gif"
                      alt="LowFator Logo Animation"
                      className="logo-gif"
                    />
                    
                    <div className="upload-container">
                      <label htmlFor="audio-upload" className="upload-button">
                        <img src="/upload-sample.png" alt="Upload Sample" className="upload-img" />
                      </label>
                      
                      <input
                        id="audio-upload"
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden-input"
                      />
                      <h1 className='add'>ADD TEXTURES AND DIRT YOUR SOUNDS</h1>
                    </div>
      
                    <div className="contenedor">
                      <div className="item">
                        <img src="/lofi.webp" alt="Lo-Fi filter" />
                      </div>
                      <div className="item">
                        <img src="/8bit.webp" alt="8 Bit converter" />
                      </div>
                      <div className="item" id='bigger'>
                        <img src="/tapedistortion.webp" alt="Tape Distortion filter" />
                      </div>
                      <div className="item" id='bigger'>
                        <img src="/compressor.webp" alt="Compressor" />
                      </div>
                      <div className="item">
                        <img src="/vinylcrackle.webp" alt="Vinyl Crackle filter" />
                      </div>
                      <div className="item">
                        <img src="/dirtyreverb.webp" alt="Dirty Reverb filter" />
                      </div>
                      <div className="item" id='bigger'>
                        <img src="/woobler.webp" alt="Wooble filter" />
                      </div>
                      <div className="item" id='bigger'>
                        <img src="/glitchdelay.webp" alt="Glitch Delay filter" />
                      </div>
                    </div>

                    <div className="footer">
                    <img
                      src="/intro3.gif"
                      alt="LowFator Logo Animation"
                      className="logo-gif2"
                    />
                      <div className="redes">
                        <img src="/insta.webp" alt="Instagram logo" className='footer-logos' id='logo1'/>
                        <img src="/gh.webp" alt="GitHub logo" className='footer-logos'/>
                        <img src="/li.webp" alt="LinkedIn logo" className='footer-logos'/>
                      </div>
                      <a href="https://www.privacypolicies.com/live/95e7cf62-f373-4c69-8806-00aee7611b2e" id="footer_text" target="_blank" rel="noopener noreferrer">
                        Política de Privacidad
                      </a>
                      <p id="footer_text2">© 2025 Pedro P. Millán Mompó ・ All Rights Reserved. </p>
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;