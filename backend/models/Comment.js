const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
); // Добавляет поля createdAt, updatedAt

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
