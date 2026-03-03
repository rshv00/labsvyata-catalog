const { app } = require("@azure/functions");
const fs = require("node:fs/promises");
const path = require("node:path");

const OUT_DIR = path.join(__dirname, "..", "..", "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function toSafePath(rawPath) {
  const normalized = path.posix.normalize(`/${rawPath || ""}`).replace(/^\//, "");
  if (normalized.includes("..")) {
    return null;
  }
  return normalized;
}

function candidatePaths(safePath) {
  if (!safePath) {
    return ["index.html"];
  }

  const hasExt = path.posix.extname(safePath) !== "";
  if (hasExt) {
    return [safePath];
  }

  return [`${safePath}/index.html`, `${safePath}.html`];
}

async function readFirstExisting(candidates) {
  for (const relativePath of candidates) {
    const absolutePath = path.join(OUT_DIR, relativePath);
    try {
      const stat = await fs.stat(absolutePath);
      if (stat.isFile()) {
        const content = await fs.readFile(absolutePath);
        return { absolutePath, content };
      }
    } catch {
      // Continue to next candidate.
    }
  }
  return null;
}

app.http("staticCatalog", {
  methods: ["GET", "HEAD"],
  authLevel: "anonymous",
  route: "{*path}",
  handler: async (request) => {
    const safePath = toSafePath(request.params.path || "");

    if (safePath === null) {
      return { status: 400, body: "Bad request" };
    }

    const match = await readFirstExisting(candidatePaths(safePath));

    if (!match) {
      const fallback404 = await readFirstExisting(["404.html"]);
      if (fallback404) {
        return {
          status: 404,
          headers: { "content-type": "text/html; charset=utf-8" },
          body: fallback404.content
        };
      }

      return { status: 404, body: "Not found" };
    }

    const ext = path.extname(match.absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
      },
      body: request.method === "HEAD" ? undefined : match.content
    };
  }
});
