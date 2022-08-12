import Router from "koa-router";

import { userUpdate } from "../api/user/userUpdate";
import { userDelete } from "../api/user/userDelete";
import { userGet } from "../api/user/userGet";
import { userGetAll } from "../api/user/userGetAll";

const routerUser = new Router({
  prefix: '/api/user'
});

routerUser.get("/", userGetAll);
routerUser.get("/:id", userGet);
routerUser.delete("/:id", userDelete);
routerUser.put("/:id", userUpdate);

export default routerUser;