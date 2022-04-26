import React from 'react';
import { Annotation, ChatAlt2, Users } from '@kwd/ui';

export const links = [
  {
    title: 'Thread',
    to: '/thread',
    icon: <ChatAlt2 />,
  },
  {
    title: 'Announcement',
    to: '/announcement',
    icon: <Annotation />,
  },
  {
    title: 'User',
    to: '/user',
    icon: <Users />,
  },
];
