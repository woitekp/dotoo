import app from "./app.js";
import { PORT } from "./config.js";

const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// Outlive pooled client sockets, or the first request after a pause resets.
server.keepAliveTimeout = 65_000;
server.headersTimeout = 70_000;
