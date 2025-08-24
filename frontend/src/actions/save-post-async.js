import { SetPostData } from './set-post-data';

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
	requestServer('savePost', newPostData).then((updatedPost) => {
		dispatch(SetPostData(updatedPost.res));

		return updatedPost.res;
	});
