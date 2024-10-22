import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import {
  createIPX,
  createIPXWebServer,
  ipxFSStorage,
  ipxHttpStorage,
} from "ipx";

const ipx = createIPX({
  storage: ipxFSStorage({
    dir: "./public",
  }),
  httpStorage: ipxHttpStorage({
    allowAllDomains: true,
  }),
});

const app = new Hono();

app.use(logger());
app.use(cors());

app.use("/*", (c) => createIPXWebServer(ipx)(c.req.raw));

export default {
  port: process.env.PORT ?? 8080,
  fetch: app.fetch,
};
