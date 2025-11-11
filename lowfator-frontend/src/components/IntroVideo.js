import React, { useEffect, useRef } from 'react';
import './IntroVideo.css';

const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play();

    const handleEnded = () => {
      video.classList.add('fade-out');
      setTimeout(() => {
        onFinish();
      }, 1000); // coincide con el fade-out
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onFinish]);

  return (
    <div className="intro-video-wrapper">
      <div className="video-scaler">
        <video
          ref={videoRef}
          src="/lowfator_intro2.mp4"
          className="intro-video"
          muted
          playsInline
        />
      </div>
    </div>
  );
};

export default IntroVideo;


