const User = require("../models/userModel");

const queries = [
  {},
  {
    $and: [{ income: { $lt: "$5" } }, { car: { $in: ["BMW", "Mercedes"] } }],
  },
  {
    gender: "Male",
    $expr: {
      $gt: [{ $toInt: "$phone_price" }, 10000],
    },
  },
  {
    last_name: /^M/,
    $expr: { $gt: [{ $strLenCP: "$quote" }, 15] },
    $expr: {
      $regexMatch: {
        input: "$email",
        regex: "$last_name",
        options: "i",
      },
    },
  },
  {
    $and: [
      {
        car: {
          $in: ["BMW", "Mercedes", "Audi"],
        },
      },
      {
        email: {
          $not: /\d/,
        },
      },
    ],
  },
  [
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
        average_income: {
          $avg: { $toDouble: { $substr: ["$income", 1, -1] } },
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 10,
    },
  ],
];

async function usersServices(id) {
  if (id === 5) {
    return await User.aggregate(queries[5]);
  } else return await User.aggregate([{ $match: queries[id] }]);
}

module.exports = usersServices;
