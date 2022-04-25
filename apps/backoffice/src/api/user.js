import { api } from './index';

const UserAPI = {
  all: () => api({ method: 'get', url: '/auth/profiles' }),
  login: ({ data }) =>
    api({
      method: 'post',
      url: '/auth/login',
      data,
    }),
  register: ({ data }) =>
    api({
      method: 'post',
      url: '/auth/register',
      data,
    }),
  profile: ({ accessToken }) =>
    api({
      method: 'get',
      url: '/auth/profile',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  ban: ({ slug, accessToken }) =>
    api({
      method: 'put',
      url: `/auth/ban/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  update: ({ slug, accessToken, data }) =>
    api({
      method: 'put',
      url: `/auth/editProfile/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    }),
  delete: ({ slug, accessToken }) =>
    api({
      method: 'delete',
      url: `/auth/banish/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default UserAPI;
