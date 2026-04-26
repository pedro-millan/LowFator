import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="background-fondo about-wrapper">

      <img
        src="/fijo_in-out.gif"
        alt="LowFator Logo"
        className="about-logo"
      />

      <section className="about-section">
        <h2 className="about-title">ABOUT</h2>

        <p className="about-lead">
          Lowfator is a web-based audio processing tool built for beatmakers
          who make music anywhere in the world, from any device.
        </p>

        <div className="about-divider" />

        <h3 className="about-heading">What is Lowfator?</h3>
        <p className="about-body">
          Upload your sample, pick the effects you want to stack, and download
          the result as WAV or MP3 instantly. No installs, no plugins, no licenses.
          Just audio and creativity.
        </p>

        <h3 className="about-heading">Why Lo-Fi?</h3>
        <p className="about-body">
          Lo-Fi Hip Hop was born in basements, cassette tapes and low-quality
          recordings that, paradoxically, sounded better than any perfectly clean
          production. That texture — vinyl crackle, tape saturation, pitch wobble —
          is hard to achieve when you produce from your phone or tablet.
          Lowfator exists to close that gap.
        </p>

        <h3 className="about-heading">Available effects</h3>
        <ul className="about-effects-list">
          <li><span className="about-effect-name">Lo-Fi</span> — frequency filtering, saturation and analogue noise</li>
          <li><span className="about-effect-name">8-Bit</span> — bitcrusher that reduces resolution to a retro sound</li>
          <li><span className="about-effect-name">Tape Distortion</span> — magnetic tape saturation</li>
          <li><span className="about-effect-name">Compressor</span> — dynamic compression for extra punch</li>
          <li><span className="about-effect-name">Vinyl Crackle</span> — noise and pops from a vinyl record</li>
          <li><span className="about-effect-name">Dirty Reverb</span> — diffuse, gritty small-room reverb</li>
          <li><span className="about-effect-name">Woobler</span> — pitch modulation inspired by cassette wow &amp; flutter</li>
          <li><span className="about-effect-name">Glitch Delay</span> — fragmented delay with digital artefacts</li>
        </ul>

        <div className="about-divider" />

        <h3 className="about-heading">The project</h3>
        <p className="about-body">
          Lowfator was born as a final project for a Higher Degree in Web Application
          Development and is built by Pedro Millán Mompó, Lo-Fi Hip Hop producer
          and developer. The motivation was personal: he wanted a tool he could use
          from his phone on the subway, without relying on a desktop DAW.
        </p>
        <p className="about-body">
          The tech stack combines a <strong>React</strong> frontend with a
          <strong> FastAPI</strong> (Python) backend that processes audio through
          real-time effect chains.
        </p>

        <div className="about-divider" />

        <div className="about-cta">
          <Link to="/" className="about-cta-btn">TRY IT NOW</Link>
          <Link to="/contact" className="about-contact-link">Got a question? Write to us →</Link>
        </div>
      </section>

      <Link to="/" className="back-home">← Back to home</Link>

    </div>
  );
};

export default AboutPage;
