const errorResponse = (
  res,
  { statusCode = 500, message = "Internal Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload,
  });
};

const createError = require("http-errors");
const mongoose = require("mongoose");

const getOne = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);

    if (!item) throw createError(404, `${Model.modelName} does not exist`);

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid ID");
    }

    throw error;
  }
};

module.exports = { getOne };

module.exports = { errorResponse, successResponse, getOne };
