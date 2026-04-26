import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl, playerId, activePlayerId, onPlayRequest }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ffe100",
      progressColor: "#ff9c00",
      height: 60,
      barWidth: 2,
      responsive: true,
    });

    if (audioUrl) {
      wavesurferRef.current.load(audioUrl);
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl]);

  // ✅ Si otro player pasa a ser el activo, yo me paro
  useEffect(() => {
    if (!wavesurferRef.current) return;
    if (activePlayerId && activePlayerId !== playerId) {
      wavesurferRef.current.pause();
      wavesurferRef.current.seekTo(0);
    }
  }, [activePlayerId, playerId]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    // Aviso al padre para que pare el resto
    onPlayRequest?.(playerId);

    wavesurferRef.current.playPause();
  };

  return (
    <div className="waveform-root">
      <div ref={containerRef} className="waveform-canvas"></div>

      <button className="waveform-play" onClick={togglePlay}>
      ▶ ❚❚
      </button>
    </div>
  );
}



