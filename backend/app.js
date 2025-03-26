require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const { v4: uuidv4 } = require("uuid");
const port = 8000;

const API_KEY = process.env.AZURE_API_KEY;
const ENDPOINT = process.env.AZURE_ENDPOINT;

app.get("/", (req, res) => {
  res.send("here we go again and again");
});

async function getAltText(imagePath) {
  const apiUrl = `${ENDPOINT}/vision/v3.1/describe`;

  const image = fs.readFileSync(imagePath);

  try {
    const response = await axios.post(apiUrl, image, {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
        "Content-Type": "application/octet-stream",
      },
      params: { maxCandidates: 1, language: "en" },
    });

    console.log(
      "Generated Alt Text:",
      response.data.description.captions[0].text
    );
    return response.data.description.captions[0].text;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

app.get("/test", async (req, res) => {
  const imagePath = path.join(__dirname, "uploads", "IMG_8869.webp");

  try {
    const altText = await getAltText(imagePath);
    res.json({ altText });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing the image.");
  }
});

const galleriesFile = path.join(__dirname, "fakeDB.json");

app.post("/add-gallery", (req, res) => {
  const newGallery = req.body;

  const newGalleryDB = {
    id: uuidv4(),
    createdTime: new Date().toISOString(),
    title: newGallery.title,
    description: newGallery.description,
    format: newGallery.format,
    files: Array.isArray(newGallery.files) ? newGallery.files : [],
  };

  console.log(newGalleryDB);

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData = { galleries: [] };

    try {
      galleriesData = JSON.parse(data);
    } catch (error) {
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
          return res.status(500).json({ error: "Failed to save gallery" });
        }
        res
          .status(201)
          .json({ message: "Gallery added successfully", gallery: newGallery });
      }
    );
  });
});

app.listen(port, () => {
  console.log("listening on the port 8000");
});
