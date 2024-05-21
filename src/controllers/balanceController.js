const createError = require("http-errors");
const Balance = require("../models/balanceModel");
const { successResponse, getOne } = require("../helpers");

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
        amount: Number(search),
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

const addBalance = async (req, res, next) => {
  try {
    const { date, amount, note } = req.body;

    const addBalance = await Balance.create({ date, amount, note });
    return successResponse(res, {
      statusCode: 200,
      message: "Balance has added",
      payload: { addBalance },
    });
  } catch (error) {
    next(error);
  }
};
const getBalance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const balance = await getOne(Balance, id);
    return successResponse(res, {
      statusCode: 200,
      message: "Balance return successfully",
      payload: { balance },
    });
  } catch (error) {
    next(error);
  }
};

const UpdateBalance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { new: true, runValidators: true, context: "query" };
    await getOne(Balance, id, options);

    let update = {};
    const allowed_fields = ["date", "amount", "note"];
    for (let key in req.body) {
      if (allowed_fields.includes(key)) {
        update[key] = req.body[key];
      }
    }
    const updatedBalance = await Balance.findByIdAndUpdate(id, update, options);

    if (!updatedBalance) {
      throw createError(404, "Blance does not exist");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Blance has updated successfully",
      payload: updatedBalance,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBalance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    await getOne(Balance, id, options);

    await Balance.findByIdAndDelete({ _id: id });

    return successResponse(res, {
      statusCode: 200,
      message: "Balance deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allBalances,
  getBalance,
  UpdateBalance,
  deleteBalance,
  addBalance,
};
