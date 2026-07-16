import express from "express";
import path from "path";
import prerender from "prerender-node";
import { exec } from "child_process";
import fs from "fs";
import dotenv from "dotenv";

import compression from "compression";
import helmet from "helmet";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // 1. Compression for better Core Web Vitals (FCP/LCP)
  app.use(compression());

  // 2. Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for preview environment compatibility
    crossOriginEmbedderPolicy: false,
  }));

  app.use(express.json({ limit: "50mb" }));

  // 3. SEO Standard Routes
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://hoangtuanmpe.com/sitemap.xml");
  });

  app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.header("Content-Type", "application/xml");
      return res.sendFile(sitemapPath);
    }
    res.status(404).send("Sitemap not generated yet");
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API to send leads and booking notifications to Telegram
  app.post("/api/telegram/notify", async (req, res) => {
    try {
      const { formName, data, locationSlug } = req.body;
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId || botToken === "your_telegram_bot_token" || chatId === "your_telegram_chat_id") {
        console.warn("[TELEGRAM] Telegram Bot Token or Chat ID is not configured.");
        return res.json({ 
          success: false, 
          error: "Telegram Bot chưa được cấu hình. Vui lòng nhập TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID trong phần Cài đặt Bí mật (Secrets) của AI Studio." 
        });
      }

      const locationText = locationSlug === 'ho-chi-minh' ? 'TP. Hồ Chí Minh' : 'Bảo Lộc, Lâm Đồng';
      
      let message = `<b>🔔 YÊU CẦU ĐĂNG KÝ KHÁCH HÀNG MỚI!</b>\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `<b>📋 Form:</b> <code>${formName || "Đăng ký dịch vụ"}</code>\n`;
      message += `<b>📍 Khu vực:</b> <code>${locationText}</code>\n\n`;
      
      if (data && typeof data === 'object') {
        const labels: Record<string, string> = {
          name: "Họ và tên",
          phone: "Số điện thoại",
          service: "Hạng mục",
          address: "Địa chỉ nhà",
          notes: "Ghi chú thêm",
          email: "Địa chỉ Email"
        };
        
        for (const [key, val] of Object.entries(data)) {
          if (val) {
            const label = labels[key] || key;
            message += `<b>👉 ${label}:</b> ${val}\n`;
          }
        }
      }
      
      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `<i>📅 Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</i>`;

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML"
        })
      });

      const result: any = await response.json();
      if (!result.ok) {
        throw new Error(result.description || "Lỗi phản hồi từ Telegram API");
      }

      console.log("[TELEGRAM SUCCESS] Sent notification successfully.");
      return res.json({ success: true, message: "Gửi thông báo Telegram thành công!" });
    } catch (err: any) {
      console.error("[TELEGRAM ERROR]", err);
      return res.status(500).json({ 
        success: false, 
        error: err.message || String(err) 
      });
    }
  });

  // API route to safely push converted JSON content directly to Sanity API with write token
  app.post("/api/sanity/push", async (req, res) => {
    try {
      const { payload, docType } = req.body;
      const writeToken = process.env.SANITY_WRITE_TOKEN;

      if (!writeToken || writeToken === "your_sanity_write_token") {
        return res.status(400).json({ 
          error: "SANITY_WRITE_TOKEN is not configured on the server. Please check your .env configuration." 
        });
      }

      const projId = process.env.VITE_SANITY_PROJECT_ID || "";
      const dtset = process.env.VITE_SANITY_DATASET || "production";

      const { createClient } = await import("@sanity/client");
      const sanityWriteClient = createClient({
        projectId: projId,
        dataset: dtset,
        token: writeToken,
        useCdn: false,
        apiVersion: "2026-05-21",
      });

      console.log(`[SANITY PUSH] Initialized write client. DocType: ${docType}`);

      // Parse payload if it's sent as a string
      let parsedPayload = payload;
      if (typeof payload === 'string') {
        parsedPayload = JSON.parse(payload);
      }

      const results: any[] = [];

      // Helper to process a single document safely with createOrReplace
      const createOrReplaceDoc = async (doc: any) => {
        if (!doc._id) {
          throw new Error("Document must have an '_id' field for createOrReplace operation.");
        }
        const cleanDoc = { ...doc };
        delete cleanDoc._createdAt;
        delete cleanDoc._updatedAt;
        delete cleanDoc._rev;

        return await sanityWriteClient.createOrReplace(cleanDoc);
      };

      if (docType === "all" && parsedPayload.location) {
        // Composite payload processing
        const keys = ['homepage', 'services', 'products', 'posts', 'siteSettings', 'localBusiness'];
        for (const key of keys) {
          const item = parsedPayload[key];
          if (Array.isArray(item)) {
            for (const doc of item) {
              const resDoc = await createOrReplaceDoc(doc);
              results.push({ id: resDoc._id, type: resDoc._type });
            }
          } else if (item) {
            const resDoc = await createOrReplaceDoc(item);
            results.push({ id: resDoc._id, type: resDoc._type });
          }
        }
      } else if (Array.isArray(parsedPayload)) {
        for (const doc of parsedPayload) {
          const resDoc = await createOrReplaceDoc(doc);
          results.push({ id: resDoc._id, type: resDoc._type });
        }
      } else if (parsedPayload && parsedPayload._id) {
        const resDoc = await createOrReplaceDoc(parsedPayload);
        results.push({ id: resDoc._id, type: resDoc._type });
      }

      return res.json({ 
        success: true, 
        message: `Đã đồng bộ thành công ${results.length} tài liệu!`,
        resultCount: results.length
      });

    } catch (e: any) {
      console.error("[SANITY PUSH ERROR]", e);
      return res.status(500).json({ 
        success: false, 
        error: e.message || String(e)
      });
    }
  });

  // Ensure directories exist
  const publicDir = path.join(process.cwd(), "public");
  const publicImagesDir = path.join(publicDir, "images");
  try {
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }
  } catch (fsErr) {
    console.warn("[STARTUP] Directory creation skipped or not allowed:", fsErr);
  }

  // Add prerender.io middleware safely
  if (process.env.PRERENDER_TOKEN) {
    try {
      const resolvedPrerender = (prerender as any).default || prerender;
      if (typeof resolvedPrerender.set === 'function') {
        resolvedPrerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
        app.use(resolvedPrerender);
      } else if (typeof resolvedPrerender === 'function') {
        app.use(resolvedPrerender);
      }
    } catch (prerenderErr) {
      console.error("Prerender middleware integration failed:", prerenderErr);
    }
  }

  // 4. Asset Caching & Static Providers
  const isProd = process.env.NODE_ENV === "production" || 
                 !fs.existsSync(path.join(process.cwd(), "node_modules", "vite")) ||
                 (typeof __filename !== 'undefined' && (__filename.endsWith('server.cjs') || __filename.includes('dist')));
  
  // Custom middleware for cache control
  app.use((req, res, next) => {
    if (!isProd) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else {
      if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (req.url.match(/\.(html)$/) || req.url === '/') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
    next();
  });

  app.use(express.static(publicDir));

  if (!isProd) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR !== 'true',
        },
        appType: "spa",
      });
      app.use(vite.middlewares);
      
      // SPA Fallback for Dev
      app.get('*', async (req, res, next) => {
        if (req.url.startsWith('/api') || req.url.includes('.')) return next();
        try {
          const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
          const transformedHtml = await vite.transformIndexHtml(req.url, html);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(transformedHtml);
        } catch (e) {
          next(e);
        }
      });
    } catch (viteErr) {
      console.warn("Vite failed to initialize, falling back to static production serving:", viteErr);
      const distPath = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
          res.sendFile(path.join(distPath, 'index.html'));
        });
      } else {
        console.error("Critical: dist folder does not exist for static fallback");
      }
    }
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("CRITICAL ERROR: Failed to start Express/Vite server:", err);
  process.exit(1);
});
