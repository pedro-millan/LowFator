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
          <h1>LOWFATOR</h1>
        </div>

      )}
    </div>
  );
}

export default App;


