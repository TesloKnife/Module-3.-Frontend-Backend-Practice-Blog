export const deletePost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'DELETE',
	});
