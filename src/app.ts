import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import Router from "koa-router";
import cors from "koa-cors";

import routerUser from "./routes/userRoutes";

import { version } from "../package.json";
import { authLogin } from "./api/auth/authLogin";
import { auth } from "./auth/auth";
import { userPost } from "./api/user/userPost";
import { userUpdate } from "./api/user/userUpdate";

const app = new Koa();

const routerOpen = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerOpen.get("/api/version", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "OK",
    version,
  };
});

routerOpen.post("/api/auth/login", authLogin);
routerOpen.post("/api/user", userPost);
routerOpen.put("/api/user/:id", userUpdate);
app.use(routerOpen.routes());

app.use(auth);
app.use(routerUser.routes());

// Default not found 404
app.use((ctx) => {
  ctx.status = 404;
});

export default app;
