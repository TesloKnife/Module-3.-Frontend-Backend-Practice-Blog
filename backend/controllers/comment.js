const Comment = require("../models/Comment");
const Post = require("../models/Post");

// add
async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);

  // Добавляем в нужный пост комментарий
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

  // Методами mongoose заменяем id пользователя на имя
  await newComment.populate("author");

  return newComment;
}

// delete
async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  // Удаляем из поста коммент
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

module.exports = {
  addComment,
  deleteComment,
};
