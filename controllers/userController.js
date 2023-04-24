const usersServices = require("../services/usersServices");

async function usersController(req, res) {
  try {
    const { id } = req.params;
    const users = await usersServices(Number(id));
    res.send({ status: "success", count: users.length, data: users });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Couldn't find users",
    });
  }
}

module.exports = usersController;
