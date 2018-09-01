const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Import models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

//@route GET request to api/posts/test
//@desc: Tests Post route
//@access: public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//@route POST request to api/posts
//@desc: Create Post
//@access: Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation:
    if (!isValid) {
      //If any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE request to api/posts
//@desc: DELETE Post
//@access: Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    newPost.save().then(post => res.json(post));
  }
);

//@route GET request to api/posts
//@desc: GET (all) Post
//@access: Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nonpostsfound: "No posts found" }));
});

//@route GET request to api/posts/:id
//@desc: GET (all) Post
//@access: Public
router.get("/:id", (req, res) => {
  const error = "Post not found";
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(error));
});

//@route DELETE request to api/posts/:id
//@desc: DELETE a post
//@access: Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = "Can't Delete, Post not found";

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ error: "User not authorized to delete post" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json(error));
    });
  }
);

//TODO: PUT REQUEST FOR UPDATE:

//@route POST request to api/posts/like/:id
//@desc: Like a Post
//@access: Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = "Can't Like, Post not found";

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User has already liked this post" });
          }
          // Add User id to like array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(error));
    });
  }
);

//@route POST request to api/posts/unlike/:id
//@desc: Unlike a Post
//@access: Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = "Can't Like, Post not found";

    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ haventliked: "You can't unlike a post you never liked" });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(error));
    });
  }
);

module.exports = router;
