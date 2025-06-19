import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    skills: "",
    languages: "",
    objective: "",
    reference: "",
    experience: "",
    projects: "",
    certifications: "",
    interests: "",
    linkedin: "",
    github: "",
    address: "",
  });

  const [photo, setPhoto] = useState(null);
  const [leftColor, setLeftColor] = useState("#f0f0f0");
  const resumeRef = useRef();

  const isBasicInfoFilled =
    resumeData.name && resumeData.email && resumeData.phone;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    const buttons = document.querySelector(".global-buttons");
    if (buttons) buttons.style.display = "none";

    const input = resumeRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");

    if (buttons) buttons.style.display = "flex";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume!",
          url: window.location.href,
        });
      } catch (error) {
        alert("Error sharing: " + error);
      }
    } else {
      alert("Share not supported on this browser.");
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', sans-serif;
      }

      .global-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 15px 25px;
        background-color: #ffffff;
        position: sticky;
        top: 0;
        z-index: 1000;
        border-bottom: 1px solid #ccc;
      }

      .global-buttons button {
        padding: 8px 14px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .download-btn {
        background-color: #007bff;
        color: white;
      }

      .share-btn {
        background-color: #28a745;
        color: white;
      }

      .resume-builder {
        display: flex;
        gap: 20px;
        padding: 20px;
      }

      .form-panel {
        width: 300px;
        background-color: #f2f2f2;
        padding: 20px;
        border-radius: 10px;
        height: fit-content;
      }

      .form-panel input,
      .form-panel textarea {
        width: 100%;
        background-color: #fff;
        color: #000;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
      }

      .form-panel textarea {
        min-height: 60px;
      }

      .resume-preview {
        flex: 1;
        display: flex;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #ccc;
      }

      .left-panel {
        width: 35%;
        padding: 20px;
        color: #fff;
      }

      .left-panel img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        object-fit: cover;
        border: 3px solid #fff;
        margin-bottom: 25px;
      }

      .left-panel div {
        margin-bottom: 10px;
      }

      .right-panel {
        width: 65%;
        background-color: #fff;
        padding: 20px;
      }

      .section {
        margin-bottom: 20px;
      }

      .section h3 {
        font-weight: bold;
        font-size: 1.2rem;
        border-bottom: 2px solid #ccc;
        padding-bottom: 5px;
        margin-bottom: 10px;
      }

      .section p {
        margin: 5px 0;
        line-height: 1.5;
      }

      .section ul {
        padding-left: 20px;
        margin: 0;
      }

      @media (max-width: 768px) {
        .resume-builder {
          flex-direction: column;
        }

        .resume-preview {
          flex-direction: column;
        }

        .left-panel, .right-panel {
          width: 100%;
        }

        .global-buttons {
          flex-direction: column;
          align-items: flex-end;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div>
      {/* Download and Share Buttons */}
      <div className="global-buttons">
        <button className="download-btn" onClick={handleDownload}>
          📥 Download
        </button>
        <button className="share-btn" onClick={handleShare}>
          📤 Share
        </button>
      </div>

      <div className="resume-builder">
        {/* Form Panel */}
        <div className="form-panel">
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <input
            type="color"
            value={leftColor}
            onChange={(e) => setLeftColor(e.target.value)}
          />
          <input
            name="name"
            placeholder="Name *"
            value={resumeData.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email *"
            value={resumeData.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone *"
            value={resumeData.phone}
            onChange={handleChange}
          />
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={resumeData.linkedin}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <input
            name="github"
            placeholder="GitHub URL"
            value={resumeData.github}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={resumeData.address}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={resumeData.summary}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="education"
            placeholder="Education"
            value={resumeData.education}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="objective"
            placeholder="Objective"
            value={resumeData.objective}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={resumeData.skills}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="languages"
            placeholder="Languages"
            value={resumeData.languages}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="reference"
            placeholder="Reference"
            value={resumeData.reference}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="experience"
            placeholder="Experience"
            value={resumeData.experience}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="projects"
            placeholder="Projects"
            value={resumeData.projects}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="certifications"
            placeholder="Certifications"
            value={resumeData.certifications}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
          <textarea
            name="interests"
            placeholder="Interests"
            value={resumeData.interests}
            onChange={handleChange}
            disabled={!isBasicInfoFilled}
          />
        </div>

        {/* Resume Preview */}
        <div className="resume-preview" ref={resumeRef}>
          <div className="left-panel" style={{ backgroundColor: leftColor }}>
            {photo && <img src={photo} alt="Profile" />}
            <div>
              <strong>📧 Email:</strong> <p>{resumeData.email}</p>
            </div>
            <div>
              <strong>📞 Phone:</strong> <p>{resumeData.phone}</p>
            </div>
            <div>
              <strong>🔗 LinkedIn:</strong> <p>{resumeData.linkedin}</p>
            </div>
            <div>
              <strong>💻 GitHub:</strong> <p>{resumeData.github}</p>
            </div>
            <div>
              <strong>📍 Address:</strong> <p>{resumeData.address}</p>
            </div>
            <div className="section">
              <h3>Objective</h3>
              <p>{resumeData.objective}</p>
            </div>
            <div className="section">
              <h3>Languages</h3>
              <p>{resumeData.languages}</p>
            </div>
            <div className="section">
              <h3>Reference</h3>
              <p>{resumeData.reference}</p>
            </div>
          </div>

          <div className="right-panel">
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "20px",
              }}
            >
              {resumeData.name}
            </h1>
            <div className="section">
              <h3>Professional Summary</h3>
              <p>{resumeData.summary}</p>
            </div>
            <div className="section">
              <h3>Education</h3>
              <p>{resumeData.education}</p>
            </div>
            <div className="section">
              <h3>Experience</h3>
              <p>{resumeData.experience}</p>
            </div>
            <div className="section">
              <h3>Projects</h3>
              <p>{resumeData.projects}</p>
            </div>
            <div className="section">
              <h3>Certifications</h3>
              <p>{resumeData.certifications}</p>
            </div>
            <div className="section">
              <h3>Skills</h3>
              <ul>
                {(resumeData.skills || "").split(",").map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="section">
              <h3>Interests</h3>
              <p>{resumeData.interests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
