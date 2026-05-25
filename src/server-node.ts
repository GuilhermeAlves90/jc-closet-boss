import { createServer } from "http";

async function start() {
  const port = process.env.PORT || 3000;

  const server = createServer(async (req, res) => {
    try {
      // Import the server entry dynamically
      const { default: handler } = await import("./server.ts");
      
      const url = new URL(req.url || "/", `http://${req.headers.host}`);
      const request = new Request(url, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: ["GET", "HEAD"].includes(req.method || "") ? undefined : (req as unknown as BodyInit),
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
