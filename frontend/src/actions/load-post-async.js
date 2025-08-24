import { SetPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('fetchPost', postId).then((postData) => {
		if (postData.res) {
			dispatch(SetPostData(postData.res));
		}
		return postData;
	});
