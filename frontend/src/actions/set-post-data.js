import { ACTION_TYPE } from './action-type';

export const SetPostData = (postData) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
