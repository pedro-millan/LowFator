import React, { useEffect, useRef, useState } from 'react';
import './IntroVideo.css';

const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.addEventListener('ended', onFinish);
    }
    return () => {
      if (video) video.removeEventListener('ended', onFinish);
    };
  }, [onFinish]);

  return (
    <div className="intro-video">
      <video
        ref={videoRef}
        src={`${process.env.PUBLIC_URL}/lowfator_intro.mp4`}
        type="video/mp4"
        className="video-fullscreen"
        muted
        autoPlay
      />
    </div>
  );
};

export default IntroVideo;
