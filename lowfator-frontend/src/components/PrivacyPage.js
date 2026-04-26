import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="background-fondo privacy-wrapper">

      <img
        src="/fijo_in-out.gif"
        alt="LowFator Logo"
        className="privacy-logo"
      />

      <section className="privacy-section">
        <h2 className="privacy-title">PRIVACY POLICY</h2>
        <p className="privacy-meta">Last updated: April 2026</p>

        <div className="privacy-divider" />

        <h3 className="privacy-heading">Who we are</h3>
        <p className="privacy-body">
          Lowfator is a web application for Lo-Fi audio sample processing,
          developed by Pedro Millán Mompó as a final project for a Higher Degree
          in Web Application Development. This policy explains what data we
          collect, how we use it, and your rights regarding it.
        </p>

        <h3 className="privacy-heading">Audio files you upload</h3>
        <p className="privacy-body">
          When you upload an audio sample, the file is stored temporarily on our
          server solely to apply the effects you select. Processed files are kept
          in a temporary directory and are automatically deleted within one hour
          of being created. We do not store, analyse, share, or retain your audio
          files beyond this processing window.
        </p>

        <h3 className="privacy-heading">Contact form</h3>
        <p className="privacy-body">
          If you use the Contact form, we collect your email address and the
          message you write. This information is used exclusively to reply to
          your inquiry and is not shared with third parties, stored in any
          database, or used for marketing purposes.
        </p>

        <h3 className="privacy-heading">Cookies and tracking</h3>
        <p className="privacy-body">
          Lowfator does not use cookies, analytics scripts, tracking pixels, or
          any third-party monitoring tools. No browsing data or usage statistics
          are collected.
        </p>

        <h3 className="privacy-heading">Third-party services</h3>
        <p className="privacy-body">
          Lowfator loads the <strong>Bebas Neue</strong> font from Google Fonts.
          By visiting this site, your browser makes a request to Google's servers
          to download that font, which may involve the collection of your IP
          address by Google under their own privacy policy.
        </p>

        <h3 className="privacy-heading">Your rights</h3>
        <p className="privacy-body">
          Under applicable data protection law (including the GDPR where
          relevant), you have the right to access, correct, or request the
          deletion of any personal data we hold about you. Because we do not
          retain audio files and contact-form data is not stored in a database,
          there is effectively no persistent personal data to delete. If you have
          any concern, you can reach us through the{' '}
          <Link to="/contact" className="privacy-inline-link">Contact</Link> page.
        </p>

        <h3 className="privacy-heading">Changes to this policy</h3>
        <p className="privacy-body">
          We may update this policy as the project evolves. Any changes will be
          reflected on this page with an updated date at the top.
        </p>

        <div className="privacy-divider" />

        <p className="privacy-body privacy-contact-note">
          Questions about this policy?{' '}
          <Link to="/contact" className="privacy-inline-link">Write to us →</Link>
        </p>
      </section>

      <Link to="/" className="back-home">← Back to home</Link>
    </div>
  );
};

export default PrivacyPage;
