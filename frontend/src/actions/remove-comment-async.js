import { SetPostData } from './set-post-data';

export const removeCommentAsync = (requestServer, postId, id) => (dispatch) => {
	requestServer('removePostComment', postId, id).then((postData) => {
		dispatch(SetPostData(postData.res));
	});
};
