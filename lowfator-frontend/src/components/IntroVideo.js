import React, { useEffect, useRef } from 'react';
import './IntroVideo.css';

const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play();

    const handleEnded = () => {
      // Aplica la clase que hace el fadeOut
      video.classList.add('fade-out');
      // Espera que termine la animación antes de desmontar el componente
      setTimeout(() => {
        onFinish();
      }, 1000); // Debe coincidir con la duración del fade
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onFinish]);

  return (
    <div className="intro-video-wrapper">
      <video
        ref={videoRef}
        src="/lowfator_intro.mp4"
        className="intro-video"
        muted
        playsInline
      />
    </div>
  );
};

export default IntroVideo;

