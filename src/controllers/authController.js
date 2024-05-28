const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const {
  successResponse,
  jsonWebtoken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helpers");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../secret");
const { http } = require("winston");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User does not exist. Please register");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Email/Password did not match");
    }

    if (user.isBanned) {
      throw createError(
        403,
        "Your account is banned. Please contact with authority"
      );
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const accessToken = jsonWebtoken({ user }, JWT_ACCESS_KEY, "1m");

    setAccessTokenCookie(res, accessToken);

    const refreshToken = jsonWebtoken({ user }, JWT_REFRESH_KEY, "7d");

    setRefreshTokenCookie(res, accessToken);

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    // res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    const decodedToken = jwt.verify(oldRefreshToken, JWT_REFRESH_KEY);
    console.log("OLDD", decodedToken);

    if (!decodedToken) {
      throw createError(401, "Invalid refresh token");
    }

    const accessToken = jsonWebtoken(decodedToken.user, JWT_ACCESS_KEY, "1m");

    setAccessTokenCookie(res, accessToken);

    return successResponse(res, {
      statusCode: 200,
      message: "New access token has been generated",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, refreshToken };
