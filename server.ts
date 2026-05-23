import express from "express";
import path from "path";
import prerender from "prerender-node";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add prerender.io middleware
  // We check for PRERENDER_TOKEN in env, but prerender-node also works without one for open source / free usage.
  if (process.env.PRERENDER_TOKEN) {
    prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
  }
  app.use(prerender);

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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
