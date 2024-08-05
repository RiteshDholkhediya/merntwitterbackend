import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }

    const user = await User.findById(id).select("-password");

    await Tweet.create({
      description,
      userId: id,
      userDetails: user,
    });

    return res.status(201).json({
      message: "Tweet created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Tweet.findByIdAndDelete(id);
    res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const tweetId =  req.params.id;
    const loggedInUserId = req.body.id;
    const tweet = await Tweet.findById(tweetId);
    // console.log(tweet);
    if (tweet.like.includes(loggedInUserId)) {
      //dislike
      const response = await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });

      res.status(200).json({
        message: "User disliked your tweet.",
        success: true,
        response,
      });
    } else {
      //Like
      const response = await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });

      res.status(200).json({
        message: "User liked your tweet",
        success: true,
        response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async (req, res) => {
  //loggedInUser tweets + following users tweets
  try {
    const loggedInUserId = req.params.id;
    const loggedInUser = await User.findById({ _id: loggedInUserId });
    const loggedInUserTweets = await Tweet.find({ userId: loggedInUserId });

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );

    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweets),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const loggedInUser = await User.findById({ _id: loggedInUserId });

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );

    return res.status(200).json({
      message: "fetched following users tweets",
      tweets: [].concat(...followingUserTweets),
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
