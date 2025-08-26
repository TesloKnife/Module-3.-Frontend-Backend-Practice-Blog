import { request } from '../utils';
import { SetPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`/api/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(SetPostData(postData.data));
		}
		return postData;
	});
