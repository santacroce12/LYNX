import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd(), "out");
const port = 3005;

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
  [".ico", "image/x-icon"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".mp4", "video/mp4"],
  [".php", "text/plain; charset=utf-8"],
]);

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");

  if (!cleanPath) {
    return join(root, "index.html");
  }

  const directPath = join(root, cleanPath);
  if (existsSync(directPath)) {
    const stat = statSync(directPath);
    if (stat.isDirectory()) {
      const indexPath = join(directPath, "index.html");
      if (existsSync(indexPath)) {
        return indexPath;
      }
    } else {
      return directPath;
    }
  }

  if (!extname(cleanPath)) {
    const htmlPath = join(root, `${cleanPath}.html`);
    if (existsSync(htmlPath)) {
      return htmlPath;
    }
  }

  return join(root, "404.html");
}

createServer((req, res) => {
  const filePath = normalize(resolvePath(req.url || "/"));

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = contentTypes.get(extension) || "application/octet-stream";
  const statusCode = filePath.endsWith("404.html") ? 404 : 200;

  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store, no-cache, must-revalidate",
  });

  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving static export from ${root} on http://127.0.0.1:${port}`);
});
