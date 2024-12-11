import React, { useState } from 'react';

const Contact = (props) => {
  const { mode } = props; // Destructure mode from props

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Your message has been sent!');
  };

  return (
    <div
      className={`contact-container ${mode === 'dark' ? 'dark-mode' : ''}`}
      style={{
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: mode === 'dark' ? '#061731' : '#fff',
        color: mode === 'dark' ? 'white' : '#061731',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2  style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: mode === 'dark' ? '#333' : '#fff',
              color: mode === 'dark' ? 'white' : '#061731',
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              padding: '10px',
              width: '100%',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: mode === 'dark' ? '#333' : '#fff',
              color: mode === 'dark' ? 'white' : '#061731',
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            required
            style={{
              padding: '10px',
              width: '100%',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: mode === 'dark' ? '#333' : '#fff',
              color: mode === 'dark' ? 'white' : '#061731',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: mode === 'dark' ? '#444' : '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
