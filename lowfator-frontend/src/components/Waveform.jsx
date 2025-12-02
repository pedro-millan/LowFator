import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Waveform({ audioUrl }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Si ya existe una instancia previa, destrúyela limpiamente
    if (wavesurferRef.current) {
      try {
        wavesurferRef.current.unAll();   // elimina listeners sin abortar
        wavesurferRef.current.destroy();
      } catch (err) {
        console.warn("WaveSurfer destroy error:", err);
      }
    }

    // Crear instancia nueva
    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ffe100",
      progressColor: "#ff9c00",
      height: 80,
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
        } catch (err) {
          /* evita el AbortError */
        }
      }
    };
  }, [audioUrl]);

  return (
    <div style={{ marginTop: "10px" }}>
      <div ref={containerRef}></div>
      <button onClick={() => wavesurferRef.current?.playPause()}>
        ▶️ Play / Pause
      </button>
    </div>
  );
}

