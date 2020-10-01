const express = require("express");
const userController = require("../Controllers/userController");

const authenticateUser = require("../Middlewares/authenticate");

const router = express.Router();

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);

module.exports = router;
