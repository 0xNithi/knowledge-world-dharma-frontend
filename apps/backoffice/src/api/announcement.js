import { api } from './index';

const AnouncementAPI = {
  all: () =>
    api({
      method: 'get',
      url: '/api/annoucements',
    }),
  create: ({ slug, accessToken }) =>
    api({
      method: 'post',
      url: `/api/annoucements/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  delete: ({ slug, accessToken }) =>
    api({
      method: 'delete',
      url: `/api/annoucements/${slug}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default AnouncementAPI;
