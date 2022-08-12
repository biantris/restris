import { checkObjectId } from "../apiHelpers";
import UserModel from "../../modules/user/UserModel";
import { getUserApi } from "./userGet";

export const userUpdate = async (ctx) => {
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

  try {
    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      },
      {
        new: true,
      }
    );

    const { user: userUpdated, error } = await getUserApi({id: user._id, isUpdate: true});

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
