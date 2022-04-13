import React from 'react';
import { Annotation, ChatAlt2, Users, ViewBoards } from '@kwd/ui';

export const links = [
  {
    title: 'Overview',
    to: '/',
    icon: <ViewBoards />,
  },
  {
    title: 'Anouncement',
    to: '/anouncement',
    icon: <Annotation />,
  },
  {
    title: 'Thread',
    to: '/thread',
    icon: <ChatAlt2 />,
  },
  {
    title: 'User',
    to: '/user',
    icon: <Users />,
  },
];
