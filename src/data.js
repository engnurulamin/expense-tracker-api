const data = {
  users: [
    {
      name: "Nurul Amin",
      username: "nurulmin",
      email: "amin@gmail.com",
      password: "Amin@1234",
    },
    {
      name: "Khairul Amin",
      username: "kamin",
      email: "kamin@gmail.com",
      password: "Amin@1234",
    },
    {
      name: "Mahia Ahmed",
      username: "mahia",
      email: "mahia@gmail.com",
      password: "Amin@1234",
    },
  ],

  balance: [
    {
      date: new Date("2024-05-01T00:00:00Z"),
      balance: 1000.0,
      note: "Initial deposit",
    },
    {
      date: new Date("2024-05-10T00:00:00Z"),
      balance: 500.0,
      note: "Withdrawal",
    },
    {
      date: new Date("2024-05-05T00:00:00Z"),
      balance: 2000.0,
      note: "Salary",
    },
    {
      date: new Date("2024-05-15T00:00:00Z"),
      balance: 1800.0,
      note: "Groceries",
    },
    {
      date: new Date("2024-05-03T00:00:00Z"),
      balance: 1500.0,
      note: "Freelance payment",
    },
    {
      date: new Date("2024-05-20T00:00:00Z"),
      balance: 1200.0,
      note: "Shopping",
    },
  ],

  expense: [
    {
      date: new Date("2024-05-01T00:00:00Z"),
      expense: 1000.0,
      note: "In",
    },
    {
      date: new Date("2024-05-10T00:00:00Z"),
      expense: 500.0,
      note: "W",
    },
    {
      date: new Date("2024-05-05T00:00:00Z"),
      expense: 2000.0,
      note: "S",
    },
    {
      date: new Date("2024-05-15T00:00:00Z"),
      expense: 1800.0,
      note: "G",
    },
    {
      date: new Date("2024-05-03T00:00:00Z"),
      expense: 1500.0,
      note: "F",
    },
    {
      date: new Date("2024-05-20T00:00:00Z"),
      expense: 1200.0,
      note: "S",
    },
  ],
};

module.exports = data;
