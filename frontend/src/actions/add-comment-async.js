import { SetPostData } from './set-post-data';

export const addCommentAsync = (requestServer, userId, postId, content) => (dispatch) => {
	requestServer('addPostComment', userId, postId, content).then((postData) => {
		dispatch(SetPostData(postData.res));
	});
};
