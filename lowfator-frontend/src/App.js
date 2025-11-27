import React, { useState } from 'react';
import IntroVideo from './components/IntroVideo';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';




function App() {
  const [showIntro, setShowIntro] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState([]);

const toggleFilter = (slug) => {
  setSelectedFilters(prev =>
    prev.includes(slug)
      ? prev.filter(f => f !== slug)   // si está, lo quitamos
      : [...prev, slug]                // si no está, lo añadimos
  );
};

const applyFilter = (slug) => {
  toggleFilter(slug);
  console.log("Filtro marcado:", slug);
  console.log("Actualmente seleccionados:", selectedFilters);
};

const previewFilter = (slug) => {
  console.log("Preview:", slug);
};


const handleAudioUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('Audio subido:', file);
  }
};

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
                        <div className='botones'>
                          <button onClick={() => previewFilter("lofi")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("lofi")}
                                onChange={() => toggleFilter("lofi")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("lofi")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <img src="/8bit.webp" alt="8 Bit converter" />
                        <div className='botones'>
                          <button onClick={() => previewFilter("8bit")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("8bit")}
                                onChange={() => toggleFilter("8bit")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("8bit")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <img src="/tapedistortion.webp" alt="Tape Distortion filter" />
                        <div className='botones'>
                          <button onClick={() => previewFilter("tape-distortion")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("tape-distortion")}
                                onChange={() => toggleFilter("tape-distortion")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("tape-distortion")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item" >
                        <img src="/compressor.webp" alt="Compressor" />
                        <div className='botones'>
                          <button onClick={() => previewFilter("compressor")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("compressor")}
                                onChange={() => toggleFilter("compressor")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("compressor")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <img src="/vinylcrackle.webp" alt="Vinyl Crackle filter" style={{height: '110%'}}/>
                        <div className='botones' id='down'>
                          <button onClick={() => previewFilter("vinyl-crackle")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("vinyl-crackle")}
                                onChange={() => toggleFilter("vinyl-crackle")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("vinyl-crackle")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <div id=''>
                          <img src="/dirtyreverb.webp" alt="Dirty Reverb filter" />
                        </div>
                        <div className='botones' id='down'>
                          <button onClick={() => previewFilter("dirty-reverb")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("dirty-reverb")}
                                onChange={() => toggleFilter("dirty-reverb")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("dirty-reverb")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <img src="/woobler.webp" alt="Wooble filter" />
                        <div className='botones' id='down'>
                          <button onClick={() => previewFilter("woobler")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("woobler")}
                                onChange={() => toggleFilter("woobler")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("woobler")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <img src="/glitchdelay.webp" alt="Glitch Delay filter" />
                        <div className='botones' id='down'>
                          <button onClick={() => previewFilter("glitch-delay")} className='pre-listen'>
                            Listen
                          </button>
                          <div className="apply-container">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes("glitch-delay")}
                                onChange={() => toggleFilter("glitch-delay")}
                                className="hidden-checkbox"
                              />
                              <span className="custom-checkbox"></span> 
                            </label>

                            <button className="apply" onClick={() => applyFilter("glitch-delay")}>
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="footer">
                    <img
                      src="/intro3.gif"
                      alt="LowFator Logo Animation"
                      className="logo-gif2"
                    />
                      <div className="redes">
                        <a href=''>
                          <img src="/insta.webp" alt="Instagram logo" className='footer-logos' id='logo1'/>
                        </a>
                        <a href='https://github.com/pedro-millan'>
                          <img src="/gh.webp" alt="GitHub logo" className='footer-logos'/>
                        </a>
                        <a href='https://www.linkedin.com/in/pedro-pablo-millán-mompó-499a36377/'>
                          <img src="/li.webp" alt="LinkedIn logo" className='footer-logos'/>
                        </a>
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