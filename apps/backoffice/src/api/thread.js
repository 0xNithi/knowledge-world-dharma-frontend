import { api } from './index';

const ThreadAPI = {
  all: () => api({ method: 'get', url: '/api/post' }),
  get: ({ slug }) => api({ method: 'get', url: `/api/post/${slug}` }),
  create: ({ accessToken, data }) =>
    api({
      method: 'post',
      url: '/api/post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }),
  update: ({ slug, accessToken, data }) =>
    api({
      method: 'put',
      url: `/api/post/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }),
  delete: ({ slug, accessToken }) =>
    api({
      method: 'delete',
      url: `/api/post/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default ThreadAPI;
