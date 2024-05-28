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

const jsonWebtoken = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be a non-empty string");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Failed to sing tke JWT :", error);
    throw error;
  }
};

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    // secure: true,
    sameSite: "none",
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true,
    sameSite: "none",
  });
};

module.exports = {
  errorResponse,
  successResponse,
  getOne,
  jsonWebtoken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
};
