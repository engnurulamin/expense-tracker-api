const createError = require("http-errors");
const {
  successResponse,
  accessTokenCookie,
  refreshTokenCookie,
  jsonWebtoken,
} = require("../helpers");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../secret");

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

    const accessToken = jsonWebtoken({ user }, JWT_ACCESS_KEY, "5m");

    accessTokenCookie(res, accessToken);

    const refreshToken = jsonWebtoken({ user }, JWT_REFRESH_KEY, "7d");

    refreshTokenCookie(res, refreshToken);

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
    res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout };
