const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const port = 5000;

// File upload config
const upload = multer({ dest: "uploads/" });

// Convert Word to PDF
app.post("/convert/word-to-pdf", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const outputDir = path.resolve(__dirname, "converted");

  exec(
    `libreoffice --headless --convert-to pdf --outdir "${outputDir}" "${filePath}"`,
    (err) => {
      if (err) return res.status(500).send("Conversion failed.");

      const outputFile = path.join(
        outputDir,
        path.parse(req.file.originalname).name + ".pdf"
      );
      res.download(outputFile, () => {
        // Cleanup
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputFile);
      });
    }
  );
});

// Convert PDF to Word (DOCX)
app.post("/convert/pdf-to-word", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const outputDir = path.resolve(__dirname, "converted");

  exec(
    `libreoffice --headless --convert-to docx --outdir "${outputDir}" "${filePath}"`,
    (err) => {
      if (err) return res.status(500).send("Conversion failed.");

      const outputFile = path.join(
        outputDir,
        path.parse(req.file.originalname).name + ".docx"
      );
      res.download(outputFile, () => {
        // Cleanup
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputFile);
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
