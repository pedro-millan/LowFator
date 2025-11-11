import React, { useState } from 'react';
import IntroVideo from './components/IntroVideo';
import './App.css';

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
    <div className="App">
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
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="upload-button"
          />
        </div>
      )}
    </div>
  );
}

export default App;