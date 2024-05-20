const createError = require("http-errors");
const { successResponse, getOne, jsonWebtoken } = require("../helpers");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { JWT_ACTIVATION_KEY } = require("../secret");

const createUser = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const userExist = await User.exists({ email: email });

    if (userExist) {
      throw createError(409, "User already exists");
    }

    const token = jsonWebtoken(
      { name, username, email, password },
      JWT_ACTIVATION_KEY,
      "10m"
    );

    const newUser = { name, username, email, password };
    const user = await User.create(newUser);
    return successResponse(res, {
      statusCode: 200,
      message: "New user has created",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".* ", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { username: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users || users.length === 0) throw createError(404, "Users Not Found");

    return successResponse(res, {
      statusCode: 200,
      message: "All users returned successfully",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await getOne(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "User return successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    await getOne(User, id, options);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { new: true, runValidators: true, context: "query" };
    await getOne(User, id, options);

    let update = {};
    const allowed_fields = ["name", "username", "email", "password"];
    for (let key in req.body) {
      if (allowed_fields.includes(key)) {
        update[key] = req.body[key];
      } else if (key === "email") {
        throw createError(400, "Email can't be updated");
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      update,
      options
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User does not exist");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User has updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser, UpdateUser, createUser };
