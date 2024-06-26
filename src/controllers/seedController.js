const data = require("../data");
const User = require("../models/userModel");
const Balance = require("../models/balanceModel");
const Expense = require("../models/expenseModel");

const seedUser = async (req, res, next) => {
  try {
    await User.deleteMany({});

    const users = await User.insertMany(data.users);
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

const seedBalance = async (req, res, next) => {
  try {
    await Balance.deleteMany({});

    const balance = await Balance.insertMany(data.balance);
    return res.status(201).json(balance);
  } catch (error) {
    next(error);
  }
};

const seedExpense = async (req, res, next) => {
  try {
    await Expense.deleteMany({});

    const expense = await Expense.insertMany(data.expense);
    return res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser, seedBalance, seedExpense };
