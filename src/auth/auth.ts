import { Base64String, unbase64 } from "./base64";
import { getObjectId } from "../../test";

import User from "../modules/user/UserModel";
import jwt_decode from "jwt-decode";

export type Token = {
  userId: string | null;
};

export type TokenDecoded = {
  user: string;
}

export const getToken = (authorization: Base64String): Token => {
  const tokenDecoded: TokenDecoded = jwt_decode(unbase64(authorization));
  const userId = tokenDecoded.user;
  
  if (!userId) {
    return {
      userId: null,
    };
  }

  return {
    userId: userId,
  };
};

export const getUser = async (token: string) => {
  const { userId } = getToken(token);

  if (!userId) {
    return null;
  }

  const user = await User.findOne({
    _id: getObjectId(userId),
    removedAt: null,
  });

  return user;
};

export const auth = async (ctx, next) => {
  const { authorization } = ctx.header;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };
    return;
  }

  const user = await getUser(authorization);

  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized",
    };
    return;
  }

  ctx.user = user;

  await next();
};
