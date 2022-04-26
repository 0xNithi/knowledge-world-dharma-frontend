import { api } from './index';

const LikeAPI = {
  like: ({ accessToken, data }) =>
    api({
      method: 'post',
      url: '/api/like',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }),
  unlike: ({ slug, accessToken }) =>
    api({
      method: 'delete',
      url: `/api/like/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default LikeAPI;
