import React, { useState } from "react";
import axios from "axios";
import {url} from 'constants/urls';

import 'styles/Contact.scss';


const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}ContactEmail/SendEmail`, {
        name,
        phone,
        email,
        message,
      });
      if (response.status === 200) {
        alert("Message Envoyé !");
      } else {
        throw new Error("Error sending message");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Coordonnées:</h2>
          <h4>Envoyez-nous un e-mail et nous vous répondrons dans les meilleurs délais.</h4>
          <p>Adresse Email: </p>
          <p>Téléphone : +216 71 705 216 / 71 705 444</p>
          <p>Fax : +216 71 704 111 </p>
          <p>Address: 16, rue des Mimosas Nouvelle Ariana-2080 Ariana</p>
          <p>Heures de travail: 8 a.m. – 5 p.m.</p>
        </div>
        <div className="contact-card">
          <h2 className="card-title">Contactez nous</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom et Prénom:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Votre nom et prénom"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Numéro téléphone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Votre Numéro"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Votre Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Votre Message"
                required
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;