import express from "express";
import {
  bookmark,
  follow,
  getMyProfile,
  getOtherUsers,
  getAllUsers,
  Login,
  logout,
  Register,
  unfollow,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(bookmark);

router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/allusers").get(getAllUsers);
router.route("/otherusers/:id").get(isAuthenticated, getOtherUsers); // id will be of loggedin user

router.route("/follow/:id").post(isAuthenticated, follow);

router.route("/unfollow/:id").post(isAuthenticated, unfollow);
export default router;
