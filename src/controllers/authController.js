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

    const accessToken = jsonWebtoken({ _id: user._id }, JWT_ACCESS_KEY, "1m");

    res.cookie("accessToken", accessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const refreshToken = jsonWebtoken({ _id: user._id }, JWT_REFRESH_KEY, "7d");

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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
    const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);

    if (!decodedToken) {
      throw createError(401, "Invalid refresh token");
    }

    const accessToken = createJsonWebToken(
      decodedToken.user,
      jwtAccessKey,
      "5m"
    );
    setAccessTokenCookie(res, accessToken);
    // res.cookie("accessToken", accessToken, {
    //   maxAge: 5 * 60 * 1000,
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "none",
    // });
    return successResponse(res, {
      statusCode: 200,
      message: "New access token is generated",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, refreshToken };
