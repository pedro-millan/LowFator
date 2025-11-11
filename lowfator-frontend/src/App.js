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