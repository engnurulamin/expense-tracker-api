const createHttpError = require("http-errors");
const { successResponse } = require("../helpers");
const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find({});
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
