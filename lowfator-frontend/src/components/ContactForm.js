import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactForm.css';

const ContactForm = () => {
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Could not send your message.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setErrorMsg('Could not reach the server. Check your connection.');
    }
  };

  return (
    <div className="background-fondo contact-wrapper">

      <img
        src="/fijo_in-out.gif"
        alt="LowFator Logo"
        className="contact-logo"
      />

      <h2 className="contact-title">CONTACT</h2>
      <p className="contact-subtitle">Got a question or suggestion? Drop us a line.</p>

      {status === 'success' ? (
        <div className="contact-success">
          <span className="contact-success-icon">✓</span>
          <p>Message sent. Thanks for reaching out!</p>
          <button
            className="contact-reset-btn"
            onClick={() => setStatus(null)}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="cf-email">Your email</label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="beatmaker@example.com"
            required
            disabled={status === 'loading'}
          />

          <label htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            placeholder="Tell us whatever you need..."
            required
            disabled={status === 'loading'}
          />

          {status === 'error' && (
            <p className="contact-error">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status === 'loading' || !email || !message}
          >
            {status === 'loading' ? (
              <span className="contact-spinner-row">
                <span className="contact-spinner"></span>
                Sending...
              </span>
            ) : (
              <img src="/send.png" alt="Send" className="contact-send-img" />
            )}
          </button>
        </form>
      )}

      <Link to="/" className="back-home">← Back to home</Link>
    </div>
  );
};

export default ContactForm;
