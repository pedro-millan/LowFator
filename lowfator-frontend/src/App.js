import React, { useState } from 'react';
import IntroVideo from './components/IntroVideo';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro ? (
        <IntroVideo onFinish={handleIntroEnd} />
      ) : (
        <div className={`background-fondo ${!showIntro ? 'fade-in' : ''}`}>
          <img src='/fijo_in-out.gif'
               alt="LowFator Logo Animation"
               className='logo-gif'
          />
        </div>
      )}
    </div>
  );
}

export default App;


