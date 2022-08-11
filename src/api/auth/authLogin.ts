import User from "../../modules/user/UserModel";
import { generateToken } from "../../auth/generateToken";
import { base64 } from "../../auth/base64";

export const authLogin = async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };
    return;
  }

  const user = await User.findOne({
    email,
    removeAt: null,
  });

  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };
    return;
  }

  let correctPassword;

  try {
    correctPassword = user.authenticate(password);
  } catch {
    ctx.status = 401;
    ctx.body = {
      message: "Email or password incorrect",
    };
    return;
  }

  if(!correctPassword) {
    ctx.status = 401;
    ctx.body = {
        message: "Email or password incorrect",
    }
    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: "User authenticated with success",
    token: base64(generateToken(user)),
    user
  }
};
