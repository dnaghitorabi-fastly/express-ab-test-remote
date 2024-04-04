// Express application
import express from "express";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
  cfg = {
    port: process.env.PORT || 3000,
    dir: {
      root: __dirname,
      static: __dirname + "static" + sep,
    },
  };

console.dir(cfg, { depth: null, color: true });

// Express initiation
const app = express();

// Middleware to inspect the request header
app.use((req, res, next) => {
  if (req.headers["bucket"] === "1") {
    req.url = "/page.html";
  } else if (req.headers["bucket"] === "2") {
    req.url = "/page2.html";
  } else {
    req.url = "/404";
  }

  next(); // Move to the next middleware or route handler
});

// serve static assets
app.use(express.static(cfg.dir.static));

// 404 error
app.use((req, res) => {
  res.status(404).send("<h1>Invalid page - No bucket header sent!</h1>");
});

// start server
app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`);
});

// export defaults
export { cfg, app };
