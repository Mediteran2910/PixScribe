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

function readDB() {
  try {
    const data = fs.readFileSync(galleriesFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read or parse database:", error);
    return { galleries: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(galleriesFile, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write database:", error);
  }
}

app.get("/", (req, res) => {
  res.send("here we go again and again");
});

app.get("/galleries/metadata", (req, res) => {
  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database file:", err);
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData;
    try {
      galleriesData = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    const metadata = galleriesData.galleries.map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      format: gallery.format,
      createdTime: gallery.createdTime,
      numberOfFiles: gallery.files.length,
    }));

    res.json(metadata.reverse());
  });
});

app.get("/galleries", (req, res) => {
  fs.readFile(path.join(__dirname, "fakeDB.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read fakeDB.json" });
    }
    try {
      const galleriesData = JSON.parse(data);
      res.json(galleriesData.galleries.reverse());
    } catch (parseError) {
      return res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

const upload = multer();
let azureRequestCount = 0;
let cooldownActive = false;

async function getAltText(imageBuffer) {
  const apiUrl = `${ENDPOINT}/vision/v3.1/describe`;

  const response = await axios.post(apiUrl, imageBuffer, {
    headers: {
      "Ocp-Apim-Subscription-Key": API_KEY,
      "Content-Type": "application/octet-stream",
    },
    params: { maxCandidates: 1, language: "en" },
  });

  return (
    response.data.description?.captions?.[0]?.text || "No description available"
  );
}

app.post("/add-gallery", upload.single("file"), async (req, res) => {
  const { title, description, format, createdTime, id } = req.body;
  const file = req.file;

  try {
    // === HANDLE METADATA ===
    if (!file && title && description && format) {
      const newGallery = {
        id: uuidv4(),
        title,
        description,
        format,
        createdTime: new Date(),
        files: [],
      };

      const db = readDB();
      db.galleries.push(newGallery);
      writeDB(db);

      return res.status(201).json({
        message: "Gallery metadata saved",
        gallery: newGallery,
        time: new Date(),
      });
    }

    // === HANDLE SINGLE FILE UPLOAD ===
    if (file && id) {
      // Cooldown mechanism
      if (cooldownActive) {
        return res.status(429).json({
          message: "Cooldown active due to Azure rate limiting. Please wait.",
        });
      }

      // Proceed with Azure call
      let altText;
      try {
        altText = await getAltText(file.buffer);
        azureRequestCount++;
      } catch (err) {
        console.error("Azure error:", err);
        return res.status(500).json({ error: "Failed to generate alt text" });
      }

      // Start cooldown if limit approached
      if (azureRequestCount >= 15) {
        cooldownActive = true;
        setTimeout(() => {
          azureRequestCount = 0;
          cooldownActive = false;
          console.log("Cooldown ended, Azure requests reset.");
        }, 70 * 1000); // 70 seconds
      }

      const newFileEntry = {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        altText: altText || "No description available",
      };

      const db = readDB();
      const gallery = db.galleries.find((g) => g.id === id);

      if (!gallery) {
        return res.status(404).json({ error: "Gallery not found" });
      }

      gallery.files.push(newFileEntry);
      writeDB(db);

      return res.status(200).json({
        message: "File processed and added",
        file: newFileEntry,
        cooldownStarted: azureRequestCount === 15,
      });
    }

    return res.status(400).json({ error: "Invalid request" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Server error" });
  }
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

// app.post("/save-template", (req, res) => {
//   const { galleryId, content } = req.body;

//   fs.readFile(galleriesFile, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to read database file" });
//     }

//     let galleriesData;
//     try {
//       galleriesData = JSON.parse(data);
//     } catch (error) {
//       return res.status(500).json({ error: "Invalid JSON format in database" });
//     }

//     const gallery = galleriesData.galleries.find((g) => g.id === galleryId);

//     if (!gallery) {
//       return res.status(404).json({ error: "Gallery not found" });
//     }

//     gallery.template = content;

//     if (!Array.isArray(gallery.files)) {
//       return res.status(500).json({ error: "Invalid 'files' data in gallery" });
//     }

//     const parsedTemplates = gallery.files.map((file) => {
//       if (!file || !file.name || !file.altText) {
//         return res.status(400).json({ error: "File data is incomplete" });
//       }

//       let parsed = content || "";
//       parsed = parsed.replace(/{fileName}/g, file.name);
//       parsed = parsed.replace(/{altText}/g, file.altText);

//       return parsed;
//     });

//     gallery.parsedTemplates = parsedTemplates;

//     fs.writeFile(
//       galleriesFile,
//       JSON.stringify(galleriesData, null, 2),
//       (err) => {
//         if (err) {
//           return res.status(500).json({ error: "Failed to save template" });
//         }

//         res.status(200).json({
//           message: "Template saved and parsed successfully",
//           template: content,
//           parsedTemplates,
//         });
//       }
//     );
//   });
// });

app.post("/save-template", (req, res) => {
  const { galleryId, content } = req.body;

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData;
    try {
      galleriesData = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    const gallery = galleriesData.galleries.find((g) => g.id === galleryId);

    if (!gallery) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    gallery.template = content;

    fs.writeFile(
      galleriesFile,
      JSON.stringify(galleriesData, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to save template" });
        }

        res.status(200).json({
          message: "Template saved successfully",
          template: content,
        });
      }
    );
  });
});

app.get("/gallery/:id/template", (req, res) => {
  const { id } = req.params;

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData;
    try {
      galleriesData = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    const gallery = galleriesData.galleries.find((g) => g.id === id);

    if (!gallery) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    const parsedTemplates = gallery.files
      .map((file) => {
        if (!file || !file.name || !file.altText) return "";

        let filled = gallery.template;
        filled = filled.replace(/{fileName}/g, file.name);
        filled = filled.replace(/{altText}/g, file.altText);

        return filled;
      })
      .join("\n");
    console.log(parsedTemplates);

    const { template } = gallery;

    res.json({
      template,
      parsedTemplates,
    });
  });
});

app.patch("/gallery/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, template } = req.body;

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading gallery file:", err);
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData;
    try {
      galleriesData = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    const gallery = galleriesData.galleries.find((g) => g.id === id);
    if (!gallery) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    if (title !== undefined) gallery.title = title;
    if (description !== undefined) gallery.description = description;
    if (template !== undefined) gallery.template = template;

    fs.writeFile(
      galleriesFile,
      JSON.stringify(galleriesData, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to gallery file:", err);
          return res.status(500).json({ error: "Failed to update gallery" });
        }

        // Construct minimal response
        const updatedFields = { id: gallery.id };
        if (title !== undefined) updatedFields.title = gallery.title;
        if (description !== undefined)
          updatedFields.description = gallery.description;
        if (template !== undefined) updatedFields.template = gallery.template;

        // Generate parsedTemplates dynamically for frontend use
        const parsedTemplates = gallery.files
          .map((file) => {
            if (!file?.name || !file?.altText) return "";
            let filled = gallery.template;
            filled = filled.replace(/{fileName}/g, file.name);
            filled = filled.replace(/{altText}/g, file.altText);
            return filled;
          })
          .join("\n");

        // Include parsedTemplates in the response only — not saved in DB
        updatedFields.parsedTemplates = parsedTemplates;

        res.status(200).json({
          message: "Gallery updated successfully",
          updatedGallery: updatedFields,
        });
      }
    );
  });
});

app.delete("/gallery/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(galleriesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database file:", err);
      return res.status(500).json({ error: "Failed to read database file" });
    }

    let galleriesData;
    try {
      galleriesData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      return res.status(500).json({ error: "Invalid JSON format in database" });
    }

    const initialLength = galleriesData.galleries.length;
    galleriesData.galleries = galleriesData.galleries.filter(
      (g) => g.id !== id
    );

    if (galleriesData.galleries.length === initialLength) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    fs.writeFile(
      galleriesFile,
      JSON.stringify(galleriesData, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing to database file:", writeErr);
          return res
            .status(500)
            .json({ error: "Failed to update database file" });
        }

        res.sendStatus(200);
      }
    );
  });
});

app.post(
  "/append-images/:galleryId",
  upload.array("files"),
  async (req, res) => {
    const galleryId = req.params.galleryId;
    const files = req.files;

    const filesWithAlt = [];
    for (const file of files) {
      const altText = await getAltText(file.buffer);
      filesWithAlt.push({
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        altText: altText || "No description available",
      });
    }

    fs.readFile(galleriesFile, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Failed to read database file" });
      }

      let galleriesData = { galleries: [] };
      try {
        galleriesData = JSON.parse(data);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Invalid JSON format in database" });
      }

      const galleryIndex = galleriesData.galleries.findIndex(
        (gallery) => gallery.id === galleryId
      );

      if (galleryIndex === -1) {
        return res.status(404).json({ error: "Gallery not found" });
      }

      galleriesData.galleries[galleryIndex].files.push(...filesWithAlt);

      fs.writeFile(
        galleriesFile,
        JSON.stringify(galleriesData, null, 2),
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to save gallery" });
          }
          console.log("Gallery successfully updated.");
          res.status(200).json({
            message: "Files successfully appended",
            gallery: galleriesData.galleries[galleryIndex],
            time: new Date(),
          });
        }
      );
    });
  }
);

app.listen(port, () => {
  console.log("listening on the port 8000");
});
