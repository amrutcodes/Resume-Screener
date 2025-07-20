const express = require("express");
const {
  createAdmin,
  createUser,
  deleteUser,
  findAll,
  login,
  logout,
  update,
  getUserCount,
  getAllUsers,
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.route("/createUser").post(createUser);
userRouter.route("/findAll").get(findAll);
userRouter.route("/update").patch(update);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/createAdmin").post(createAdmin);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/getUserCount").get(getUserCount);
userRouter.route("/getAllUsers").get(getAllUsers);

module.exports = userRouter;
