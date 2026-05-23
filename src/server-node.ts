import "http";
import { createServer } from "http";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

async function start() {
  const handler = await getServerEntry();
  const port = process.env.PORT || 3000;

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", `http://${req.headers.host}`);
      const request = new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: ["GET", "HEAD"].includes(req.method || "") ? undefined : req,
      });

      const response = await handler.fetch(request, {}, {});
      
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch(console.error);
