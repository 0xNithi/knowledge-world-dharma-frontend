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
};

export default UserAPI;
