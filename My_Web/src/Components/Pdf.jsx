import React, { useState, useEffect } from "react";

const Pdf = ({ mode = "light" }) => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("pdf-to-word");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }
    alert(`Converting ${file.name} as ${type}`);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
      }

      .pdf-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
        transition: background 0.3s ease;
        padding: 20px;
      }

      .pdf-light {
        background-color: #f0f2f5;
      }

      .pdf-dark {
        background-color: #0d1b2a;
      }

      .pdf-form {
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        transition: background 0.3s ease, color 0.3s ease;
      }

      .pdf-dark .pdf-form {
        background-color: #1a2634;
        color: #fff;
        box-shadow: 0 0 10px rgba(255,255,255,0.05);
      }

      .pdf-form input,
      .pdf-form select,
      .pdf-form button {
        padding: 12px;
        font-size: 16px;
        border-radius: 6px;
        border: 1px solid #ccc;
        transition: background 0.3s ease, color 0.3s ease;
      }

      .pdf-dark .pdf-form input,
      .pdf-dark .pdf-form select {
        background-color: #2d3e50;
        color: #fff;
        border: 1px solid #444;
      }

      .pdf-form button {
        background-color: #28a745;
        color: white;
        border: none;
        cursor: pointer;
      }

      .pdf-form button:hover {
        background-color: #218838;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className={`pdf-wrapper ${mode === "dark" ? "pdf-dark" : "pdf-light"}`}
    >
      <form className="pdf-form" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="pdf-to-word">PDF to Word</option>
          <option value="word-to-pdf">Word to PDF</option>
        </select>
        <button type="submit">Convert</button>
      </form>
    </div>
  );
};

export default Pdf;
