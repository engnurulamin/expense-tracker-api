const createError = require("http-errors");
const Balance = require("../models/balanceModel");
const { successResponse } = require("../helpers");

const allBalances = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".* ", "i");

    let dateFilter = {};
    let balanceFilter = {};

    if (!isNaN(Date.parse(search))) {
      const searchDate = new Date(search);
      const nextDate = new Date(searchDate);
      nextDate.setDate(searchDate.getDate() + 1);
      dateFilter = {
        date: {
          $gte: searchDate,
          $lt: nextDate,
        },
      };
    }
    if (!isNaN(search)) {
      balanceFilter = {
        balance: Number(search),
      };
    }
    const filter = {
      $or: [dateFilter, balanceFilter, { note: { $regex: searchRegExp } }],
    };

    const balance = await Balance.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Balance.find(filter).countDocuments();

    if (!balance || balance.length === 0)
      throw createError(404, "Balance Not Found");

    return successResponse(res, {
      statusCode: 200,
      message: "All Balance returned successfully",
      payload: {
        balance,
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

module.exports = { allBalances };
