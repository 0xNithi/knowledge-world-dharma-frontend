import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initialize as initializeAction,
  fetchAnnouncements,
  fetchDeleteAnnouncement,
  fetchCreateAnnouncement,
} from '.';

export const useFetchAnnouncements = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);
};

export const useAnnouncements = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const { announcements, isLoading, error } = useSelector(
    (state) => state.announcements,
  );

  const handleView = useCallback(
    ({ slug }) => {
      const anouncementFound = announcements.find(
        (announcement) => announcement.id.toString() === slug,
      );

      if (!anouncementFound) dispatch(fetchAnnouncements());
      return anouncementFound;
    },
    [announcements, dispatch],
  );

  const handleCreate = useCallback(
    ({ slug }) => {
      dispatch(fetchCreateAnnouncement({ slug, accessToken }));
    },
    [accessToken, dispatch],
  );

  const handleDelete = useCallback(
    ({ slug }) => {
      dispatch(fetchDeleteAnnouncement({ slug, accessToken }));
    },
    [accessToken, dispatch],
  );

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  return {
    announcements,
    isLoading,
    error,
    handleView,
    handleCreate,
    handleDelete,
  };
};
