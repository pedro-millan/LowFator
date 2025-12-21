import React, { useState } from 'react';
import IntroVideo from './components/IntroVideo';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import Waveform from "./components/Waveform";




function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]); 
  const [filterPreviewVisible, setFilterPreviewVisible] = useState({}); 
  const [filterPreviewUrls, setFilterPreviewUrls] = useState({});   
  const [mixUrl, setMixUrl] = useState(null);
  

  const toggleFilter = (slug) => {
    let next;
    setSelectedFilters(prev => {
      next = prev.includes(slug) ? prev.filter(f => f !== slug) : [...prev, slug];
      return next;
    });
    return next;
  };
  

  const applyFilter = async (slug) => {
    const nextFilters = toggleFilter(slug);
  
    try {
      const res = await fetch("http://localhost:8000/mix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: nextFilters }),
      });
      const data = await res.json();
      console.log("Mix:", data);
  
      if (data.mix_filepath) setMixUrl(data.mix_filepath);
    } catch (err) {
      console.error("Mix error:", err);
    }
  };
  

const [previewUrl, setPreviewUrl] = useState(null);
console.log("Preview URLs:", filterPreviewUrls);
console.log("Preview Visible:", filterPreviewVisible);


const previewFilter = async (slug) => {
  
  if (filterPreviewVisible[slug]) {
    setFilterPreviewVisible(prev => ({ ...prev, [slug]: false }));
    return;
  }

  if (filterPreviewUrls[slug]) {
    setFilterPreviewVisible(prev => ({ ...prev, [slug]: true }));
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/preview?filter=${slug}`);
    const data = await res.json();
    console.log("Preview URL recibida:", data.preview_filepath);


    setFilterPreviewUrls(prev => ({
      ...prev,
      [slug]: data.preview_filepath,
    }));

    setFilterPreviewVisible(prev => ({
      ...prev,
      [slug]: true,
    }));

  } catch (error) {
    console.error("Error obteniendo preview:", error);
  }
};

const [uploaded, setUploaded] = useState(false);

const handleAudioUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Upload OK:", data);
    setUploaded(true);
  } catch (err) {
    console.error("Upload error:", err);
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
                              <button className="apply-container" onClick={() => applyFilter("lofi")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>                       
                        {filterPreviewVisible["lofi"] && filterPreviewUrls["lofi"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["lofi"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("8bit")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["8bit"] && filterPreviewUrls["8bit"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["8bit"]} />
                        </div>
                        )}
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
                                checked={selectedFilters.includes("apply-container")}
                                onChange={() => toggleFilter("apply-container")}
                                className="hidden-checkbox"
                              />
                              <button className="apply-container" onClick={() => applyFilter("apply-container")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["tape-distortion"] && filterPreviewUrls["tape-distortion"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["tape-distortion"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("compressor")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["compressor"] && filterPreviewUrls["compressor"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["compressor"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("vinyl-crackle")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["vinyl-crackle"] && filterPreviewUrls["vinyl-crackle"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["vinyl-crackle"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("dirty-reverb")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["dirty-reverb"] && filterPreviewUrls["dirty-reverb"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["dirty-reverb"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("woobler")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                        {filterPreviewVisible["woobler"] && filterPreviewUrls["woobler"] && (
                        <div className="waveform-overlay">
                          <Waveform audioUrl={filterPreviewUrls["woobler"]} />
                        </div>
                        )}
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
                              <button className="apply-container" onClick={() => applyFilter("glitch-delay")}>
                                Apply
                              </button>        
                            </label>
                          </div>
                        </div>
                      </div>
                      {filterPreviewVisible["glitch-delay"] && filterPreviewUrls["glitch-delay"] && (
                        <div className="waveform-overlay-2">
                          <Waveform audioUrl={filterPreviewUrls["glitch-delay"]} />
                        </div>
                        )}
                    </div>


                    <div className="current-mix-section">
                      <br></br>
                      <br></br>
                      <h2>YOUR CURRENT MIX</h2>

                      <Waveform audioUrl="http://localhost:8000/temp/test.wav" />

                      {mixUrl ? (<Waveform audioUrl={mixUrl} />) : (
                        
                        <p id='message'>No effects applied yet. Select filters and press Apply.</p>
                      )}
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