const usersController = require("../controllers/userController");

const router = require("express").Router();

router.route("/:id").get(usersController);

module.exports = router;
