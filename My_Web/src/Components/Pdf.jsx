import React, { useState } from 'react';
import axios from 'axios';
import mammoth from 'mammoth';

function Pdf({ mode }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setPreview(result.value);
      } catch (error) {
        console.error("Preview error:", error);
        setPreview("❌ Failed to preview the file.");
      }
    } else {
      setPreview("⚠️ Preview available for .docx files only.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!file) {
      alert("Please select a Word file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/convert", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.(doc|docx)$/i, ".pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Something went wrong during conversion or download.");
    }
  };

  const isDark = mode === 'dark';

  return (
    <div style={{
      background: isDark ? '#121212' : 'linear-gradient(to right, #8e44ad, #3498db)',
      minHeight: '100vh',
      padding: '50px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      color: isDark ? '#f1f1f1' : '#fff',
    }}>
      <div style={{
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        color: isDark ? '#f1f1f1' : '#333',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '650px',
        textAlign: 'center',
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: isDark ? 'linear-gradient(to right, #6a11cb, #2575fc)' : 'linear-gradient(to right, #3498db, #9b59b6)',
       
        }}>📝 Word to PDF Converter</h2>

        <input
          type="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
          style={{
            padding: '10px',
            width: '100%',
            border: `2px dashed ${isDark ? '#9b59b6' : '#8e44ad'}`,
            borderRadius: '10px',
            marginBottom: '20px',
            cursor: 'pointer',
            backgroundColor: isDark ? '#2c2c2c' : '#fff',
            color: isDark ? '#f1f1f1' : '#333'
          }}
        />

        {file && (
          <div style={{
            backgroundColor: isDark ? '#333' : '#ecf0f1',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: isDark ? '#eee' : '#2c3e50'
          }}>
            📄 {file.name}
          </div>
        )}

        {preview && (
          <div style={{
            backgroundColor: isDark ? '#2b2b2b' : '#fdfbff',
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${isDark ? '#444' : '#dcd6f7'}`,
            maxHeight: '250px',
            overflowY: 'auto',
            marginBottom: '20px',
            textAlign: 'left',
            color: isDark ? '#ddd' : '#4a4a4a'
          }}>
            <h4 style={{ marginTop: 0, color: isDark ? '#9b59b6' : '#8e44ad' }}>📑 File Preview:</h4>
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        )}

        <button
          onClick={handleDownloadPDF}
          style={{
            background: isDark ? 'linear-gradient(to right, #6a11cb, #2575fc)' : 'linear-gradient(to right, #3498db, #8e44ad)',
            color: '#fff',
            padding: '12px 25px',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          🚀 Convert & Download PDF
        </button>
      </div>
    </div>
  );
}

export default Pdf;
