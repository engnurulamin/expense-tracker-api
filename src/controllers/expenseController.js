const createError = require("http-errors");
const Expense = require("../models/expenseModel");
const { successResponse, getOne } = require("../helpers");

const allexpenses = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".* ", "i");

    let dateFilter = {};
    let expenseFilter = {};

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
      expenseFilter = {
        amount: Number(search),
      };
    }
    const filter = {
      $or: [dateFilter, expenseFilter, { note: { $regex: searchRegExp } }],
    };

    const expense = await Expense.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Expense.find(filter).countDocuments();

    if (!expense || expense.length === 0)
      throw createError(404, "Expense Not Found");

    return successResponse(res, {
      statusCode: 200,
      message: "All expense returned successfully",
      payload: {
        expense,
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

const getExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expense = await getOne(Expense, id);
    return successResponse(res, {
      statusCode: 200,
      message: "Balance return successfully",
      payload: { expense },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allexpenses,
  getExpense,
};
