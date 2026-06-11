import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";

// Import API routers directly from the api-server package
import healthRouter from "./artifacts/api-server/src/routes/health";
import productsRouter from "./artifacts/api-server/src/routes/products";
import leadsRouter from "./artifacts/api-server/src/routes/leads";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Register API routes
  app.use("/api", healthRouter);
  app.use("/api", productsRouter);
  app.use("/api", leadsRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting master full-stack server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
      },
      appType: "spa",
      configFile: path.resolve(process.cwd(), "artifacts/arraia-da-copa/vite.config.ts"),
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting master full-stack server in PRODUCTION mode...");
    const distPath = path.resolve(process.cwd(), "artifacts/arraia-da-copa/dist/public");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
