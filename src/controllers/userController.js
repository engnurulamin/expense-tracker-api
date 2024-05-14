const createHttpError = require("http-errors");
const { successResponse } = require("../helpers");
const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users || users.length === 0)
      throw createHttpError(404, "Users Not Found");

    return successResponse(res, {
      statusCode: 200,
      message: "All users return successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
