import { checkObjectId } from "../apiHelpers";
import UserModel from "../../modules/user/UserModel";
import { getUserApi } from "./userGet";

import bcrypt from 'bcryptjs';

export const userUpdate = async (ctx: any) => {
  const { id } = ctx.params;

  const _id = checkObjectId(id);

  if (!_id) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found",
    };
    return;
  }

  const user = await UserModel.findOne({
    _id,
    removedAt: null,
  });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      message: "User not found",
    };
    return;
  }

  const { user: userExist } = await getUserApi({ email: user?.email });

  if (userExist?.email == ctx.request.body?.user?.email) {
    ctx.status = 400;
    ctx.body = {
      message: "Email already in use",
    };
    return;
  }
  interface dataToUpdate {
    email?: string;
    name?: string;
    password?: string;
  }

  const dataToUpdate: dataToUpdate = {};

  if (ctx.request.body?.user?.name) {
    dataToUpdate.name = ctx.request.body?.user?.name;
  }

  const newPassword = bcrypt.hashSync(ctx.request.body?.user?.password, 8);

  if (newPassword !== null) {

    dataToUpdate.password = newPassword

  }

  if (ctx.request.body?.user?.email) {

    dataToUpdate.email = ctx.request.body?.user?.email;

    if (userExist?.email == ctx.request.body?.user?.email) {
      ctx.status = 400;
      ctx.body = {
        message: "Email already in use",
      };
      return;
    }
  }


  try {
    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          ...dataToUpdate
        },
      },
    );

    const { user: userUpdated, error } = await getUserApi({ id: user._id, isUpdate: true });

    if (error) {
      ctx.status = 400;
      ctx.body = {
        message: "Error while editing user",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      user: userUpdated,
    };
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);

    ctx.status = 500;
    ctx.body = {
      message: "Unknown error",
    };
  }
};
