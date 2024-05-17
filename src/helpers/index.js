const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const mongoose = require("mongoose");

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

const jsonWebtoken = (payload, secretyKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof secretyKey !== "string" || secretyKey === "") {
    throw new Error("Secret key must be a non-empty string");
  }

  try {
    const token = jwt.sign(payload, secretyKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("error", "Failed to sing tke JWT", error);
    throw error;
  }
};

module.exports = { errorResponse, successResponse, getOne, jsonWebtoken };
