require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
app.use(express.json());
app.use(cors());
const { v4: uuidv4 } = require("uuid");
const port = 8000;

const API_KEY = process.env.AZURE_API_KEY;
const ENDPOINT = process.env.AZURE_ENDPOINT;

const galleriesFile = path.join(__dirname, "fakeDB.json");

app.get("/", (req, res) => {
  res.send("here we go again and again");
});

app.get("/galleries", (req, res) => {
  fs.readFile(path.join(__dirname, "fakeDB.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read fakeDB.json" });
    }
    try {
      const galleriesData = JSON.parse(data);
      res.json(galleriesData.galleries);
    } catch (parseError) {
      return res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

const upload = multer();

app.post("/add-gallery", upload.array("files"), async (req, res) => {
  console.log("Received files:", req.files);

  const { title, description, format, createdTime } = req.body;
  const files = req.files;

  const filesWithAlt = [];

  async function getAltText(imageBuffer) {
    const apiUrl = `${ENDPOINT}/vision/v3.1/describe`;

    try {
      console.log("Sending image for alt text generation...");
      const response = await axios.post(apiUrl, imageBuffer, {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY,
          "Content-Type": "application/octet-stream",
        },
        params: { maxCandidates: 1, language: "en" },
      });

      console.log("Received alt text from Azure:", response.data);
      return (
        response.data.description.captions[0]?.text ||
        "No description available"
      );
    } catch (error) {
      console.error("Error getting alt text:", error);
      return "No description available";
    }
  }

  for (const file of files) {
    console.log("Processing file:", file.originalname);

    if (!file.originalname) {
      return res.status(400).json({ error: "Missing file name" });
    }

    const altText = await getAltText(file.buffer);

    filesWithAlt.push({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      altText: altText || "No description available",
    });
  }

  const newGalleryDB = {
    id: uuidv4(),
    title,
    description,
    format,
    createdTime,
    files: filesWithAlt,
  };

  console.log("New gallery data:", newGalleryDB);

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading gallery file:", err);
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData = { galleries: [] };

    try {
      galleriesData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    if (!Array.isArray(galleriesData.galleries)) {
      galleriesData.galleries = [];
    }

    galleriesData.galleries.push(newGalleryDB);

    fs.writeFile(
      galleriesFile,
      JSON.stringify(galleriesData, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to gallery file:", err);
          return res.status(500).json({ error: "Failed to save gallery" });
        }
        console.log("Gallery successfully added to database.");
        res.status(201).json({
          message: "Gallery added successfully",
          gallery: newGalleryDB,
        });
      }
    );
  });
});

app.post("/update-gallery-code", (req, res) => {
  const { galleryId, content } = req.body;

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData = JSON.parse(data);
    let gallery = galleriesData.galleries.find((g) => g.id === galleryId);

    if (!gallery) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    let generatedCode = gallery.files.map((file) =>
      content
        .replace(/{fileName}/g, file.name)
        .replace(/{alt="altText"}/g, file.altText)
    );

    gallery.code = generatedCode;

    fs.writeFile(
      galleriesFile,
      JSON.stringify(galleriesData, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update gallery" });
        }
        res.json({
          message: "Gallery updated successfully",
          code: generatedCode,
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log("listening on the port 8000");
});
