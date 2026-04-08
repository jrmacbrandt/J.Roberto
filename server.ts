import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Route to save images
  app.post("/api/save-image", (req, res) => {
    const { filename, base64Data } = req.body;
    if (!filename || !base64Data) {
      return res.status(400).json({ error: "Missing filename or base64Data" });
    }

    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const imagesDir = path.join(__dirname, 'public', 'images');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      const filePath = path.join(imagesDir, filename);
      fs.writeFileSync(filePath, buffer);
      console.log(`Saved: ${filename}`);
      res.json({ success: true });
    } catch (error) {
      console.error(`Error saving ${filename}:`, error);
      res.status(500).json({ error: "Failed to save image" });
    }
  });

  // API Route to check if images exist
  app.get("/api/check-images", (req, res) => {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const requiredImages = [
      'willy wonka logo.png', 'man.jpg', 'about.jpg',
      'portfolio-first.jpg', 'portfolio-second.jpg', 'portfolio-third.jpg', 'portfolio-fourth.jpg',
      'post-one.jpg', 'post-two.jpg', 'post-three.jpg', 'post-four.jpg', 'post-five.jpg', 'post-six.jpg'
    ];
    
    if (!fs.existsSync(imagesDir)) {
      return res.json({ missing: requiredImages });
    }
    
    const missing = requiredImages.filter(img => !fs.existsSync(path.join(imagesDir, img)));
    res.json({ missing });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
