import { serve } from "bun";
import client from "./client/index.html";
import { analyze } from "./server/analyze";

const importMap = await analyze();

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": client,

    "/api/analyze": {
      async GET(req) {
        return Response.json({ result: importMap });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
