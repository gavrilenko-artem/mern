import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const document = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await document.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Post not create",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const post = await PostModel.find().populate("user").exec();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve article",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (error, doc) => {
        if (error) {
          return res.status(500).json({
            message: "Failed return article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve article",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndRemove(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          return res.status(500).json({
            message: "Failed remove article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve article",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed update article",
    });
  }
};
