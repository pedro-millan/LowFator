import React from 'react';
import { Link } from 'react-router-dom';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <div className="background-fondo contact-wrapper">
      <h2>Contacta conmigo</h2>
      <form className="contact-form">
        <label htmlFor="email">Tu email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="4" required />

        <button type="submit">Enviar</button>
      </form>

      <Link to="/" className="back-home">← Volver al inicio</Link>
    </div>
  );
};

export default ContactForm;

