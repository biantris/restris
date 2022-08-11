import { getObjectId } from "../../../test";
import User from "../../modules/user/UserModel";

export const userSelection = {
  _id: 1,
  name: 1,
  email: 1,
  removeAt: 1,
};

type UserPayload = {
  _id: string;
  name: string;
  email: string;
};

type GetUserApiPayload = {
  error: string | null;
  user: UserPayload | null;
};

const getConditions = (id?: string, email?: string) => {
  if (id) {
    return {
      error: null,
      conditions: {
        _id: getObjectId(id),
      },
    };
  }

  if (email) {
    return {
      error: null,
      conditions: {
        email,
      },
    };
  }

  return {
    error: "Invalid user",
  };
};

interface IGetUserAPI {
  id?: string;
  email?: string;
  isDelete?: boolean;
}

export const getUserApi = async ({
  email, id, isDelete
}: IGetUserAPI): Promise<GetUserApiPayload> => {
  const { conditions, error } = getConditions(id, email);

  if (error) {
    return {
      error,
      user: null,
    };
  }

  let user;
  if (isDelete) {
    user = await User.findOne({
      ...conditions,
    }).select("-password -createdAt -updatedAt").lean();
  } else {
    user = await User.findOne({
      ...conditions,
    }).select(userSelection).lean();
  }

  if (!user) {
    return {
      error: "User not found",
      user: null,
    };
  }

  return {
    error: null,
    user,
  };
};

export const userGet = async (ctx) => {
  const { id } = ctx.params;

  try {
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "You must provide an id",
      };
      return;
    }

    const { user, error } = await getUserApi({id});

    if (error) {
      ctx.status = 400;
      ctx.body = {
        message: error,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      user,
    };

    return;
  } catch (err) {
    console.log("err:", err);

    ctx.body = {
      message: "Unknown error",
    };
  }
};
