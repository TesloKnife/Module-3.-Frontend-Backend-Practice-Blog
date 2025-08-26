import { request } from '../utils';

export const removePostAsync = (id) => () => request(`/api/posts/${id}`, 'DELETE');
