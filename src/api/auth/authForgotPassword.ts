import UserModel from "../../modules/user/UserModel";

export const authForgotPassword = async (ctx) => {
  const user = await UserModel.findOne({
    email: ctx.query.user.trim(),
  });

  ctx.status = 200;

  if (!user) {
    ctx.body = {
      message: "User not found",
    };
    return;
  }

  ctx.body = {
    user,
    password: 123456, //change to user.password
  };
  return;
};
