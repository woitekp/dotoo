import app from "./app.js";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// Outlive pooled client sockets, or the first request after a pause resets.
server.keepAliveTimeout = 65_000;
server.headersTimeout = 70_000;
