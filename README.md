# Pixscribe

**Pixscribe** is a powerful developer tool for generating HTML, JSON, or YAML code blocks from uploaded image files. It’s especially useful for creating galleries, database records, or structured image metadata. It uses Azure AI to extract alt text from images, and offers powerful template customization.

## ✨ Features

- 🖼️ Upload multiple images simultaneously
- 🌐 Choose export format: **HTML**, **JSON**, or **YAML**
- 🧠 Uses **Azure AI Vision API** to extract `alt` text for each image
- 🔧 **Custom template editor**:
  - Define placeholders for `filename` and `alt` description
  - Add extra attributes to `<img>` (e.g. `class`, `id`, `loading="lazy"`)
  - Add custom fields to JSON/YAML outputs
  - Wrap HTML with any element (`<div>`, `<figure>`, etc.)
- ⚙️ Generates one block of code per uploaded file
- 💾 Export the full output for use in HTML galleries, CMS imports, or DB inserts

---

## 🧪 Tech Stack

### Frontend

- ⚛️ React (with **TypeScript**)
- ⚡ Vite
- 🧭 React Router
- 🎨 Various UI/animation libraries (Framer Motion, Shadcn/UI, etc.)

### Backend

- 🟢 Node.js with Express
- 📁 Multer for in-memory file upload
- 🤖 Azure AI Vision API for alt text generation
- 🧪 `fakeDB.json` — used as a mock local database for dev/test

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mediteran2910/pixscribe.git
cd pixscribe
```

### 2. Setup and Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup and Run the Backend

```bash
cd ../backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder and add:

```env
AZURE_API_KEY=your-azure-api-key
AZURE_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com/
```

> 💡 Make sure the Azure resource is set up with **Computer Vision** API access.

---

## 📌 Project Status

- ✅ Upload flow and code parsing working
- ✅ Alt text successfully fetched via Azure Vision
- ✅ Fully functional template editor
- 🧪 Using `fakeDB.json` as local mock database
- 🚧 Future Plans:
  - Switch to real DB (MongoDB, PostgreSQL, etc.)
  - User authentication (login/accounts)
  - Saving template presets per user
  - Deploy frontend (Vercel) + backend (Render)

---

## 🧾 License

This project is licensed under the **MIT License**.
