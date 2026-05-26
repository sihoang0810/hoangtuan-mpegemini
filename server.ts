import express from "express";
import path from "path";
import prerender from "prerender-node";
import { exec } from "child_process";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Sync copy generated design assets into appropriate public folders
  try {
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const logoSrc = path.join(process.cwd(), "src", "assets", "images", "repair_app_logo_1779768888986.png");
    const ogSrc = path.join(process.cwd(), "src", "assets", "images", "og_default_banner_1779768911981.png");
    const heroSrc = path.join(process.cwd(), "src", "assets", "images", "real_hero_repair_1779772612924.png");

    if (fs.existsSync(logoSrc)) {
      fs.copyFileSync(logoSrc, path.join(publicDir, "apple-touch-icon.png"));
      fs.copyFileSync(logoSrc, path.join(publicDir, "favicon.ico"));
      console.log("Copied matching brand logo to apple-touch-icon.png and favicon.ico.");
    }

    if (fs.existsSync(ogSrc)) {
      fs.copyFileSync(ogSrc, path.join(imagesDir, "og-default.jpg"));
      console.log("Copied og default image to /public/images/og-default.jpg.");
    }

    if (fs.existsSync(heroSrc)) {
      fs.copyFileSync(heroSrc, path.join(imagesDir, "real_hero_repair.png"));
      console.log("Copied real hero image to /public/images/real_hero_repair.png.");
    }
  } catch (copyErr) {
    console.error("Failed to copy system assets:", copyErr);
  }

  // Automate sitemap generation on boot
  exec("node generate-sitemap.js", (err, stdout, stderr) => {
    if (err) {
      console.error("Sitemap generation failed:", err);
    } else {
      console.log("Sitemap generated successfully:\n", stdout);
    }
  });

  // Add prerender.io middleware
  if (process.env.PRERENDER_TOKEN) {
    prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
  }
  app.use(prerender);

  // Core static file providers for ultra-resilient image assets delivery
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use('/product-images', express.static(path.join(process.cwd(), 'public', 'product-images')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
