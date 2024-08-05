import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
export default router;
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);

router.route("/alltweets/:id").get(isAuthenticated, getAllTweets); // id will be of loggedInUser

router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets); // id will be of loggedInUser
