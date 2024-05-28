const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw createError(401, "Access token not found, Please login");
    }
    const decoded = jwt.verify(token, JWT_ACCESS_KEY);
    console.log("Decoded token:", decoded);
    if (!decoded) {
      throw createError(401, "Invalid access token, Please login again");
    }
    req.user = { _id: decoded.user._id };
    // req.body.userId = decoded._id;
    return next();
  } catch (error) {
    return next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    try {
      if (token) {
        const decoded = jwt.verify(token, JWT_ACCESS_KEY);
        if (decoded) {
          throw createError(400, "User is already logged in");
        }
      }
    } catch (error) {
      console.log(error);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw createError(403, "Forbidden. Only admin can access");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = { isLoggedIn, isLoggedOut, isAdmin };
