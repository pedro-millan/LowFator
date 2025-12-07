import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar instancia previa si existe
    if (wavesurferRef.current) {
      try {
        wavesurferRef.current.unAll();
        wavesurferRef.current.destroy();
      } catch (err) {
        console.warn("WaveSurfer destroy error:", err);
      }
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ffe100",
      progressColor: "#ff9c00",
      height: 40,          // << más pequeño
      barWidth: 2,
      responsive: true,
    });

    wavesurferRef.current = ws;

    if (audioUrl) {
      ws.load(audioUrl);
    }

    return () => {
      if (wavesurferRef.current) {
        try {
          wavesurferRef.current.unAll();
          wavesurferRef.current.destroy();
        } catch (err) {}
      }
    };
  }, [audioUrl]);

  return (
    <div className="waveform-root">
      <div ref={containerRef} className="waveform-canvas" />
      <button
  className="waveform-play"
  onClick={(e) => {
    e.stopPropagation();  
    wavesurferRef.current?.playPause();
  }}
>
  ▶
</button>
    </div>
  );
}


