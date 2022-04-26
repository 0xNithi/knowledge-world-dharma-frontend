import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initialize as initializeAction,
  fetchThread,
  fetchThreads,
  fetchUpdateThread,
  fetchDeleteThread,
  fetchCreateThread,
} from '.';

export const useFetchThreads = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);
};

export const useThreads = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const { threads, isLoading, error } = useSelector((state) => state.threads);

  const handleView = useCallback(
    ({ slug }) => {
      const threadFound = threads.find(
        (thread) => thread.post.id.toString() === slug,
      );

      if (!threadFound) dispatch(fetchThread({ slug }));
      return threadFound;
    },
    [threads, dispatch],
  );

  const handleCreate = useCallback(
    ({ data }) => {
      dispatch(fetchCreateThread({ accessToken, data }));
    },
    [accessToken, dispatch],
  );

  const handleUpdate = useCallback(
    ({ slug, data }) => {
      dispatch(fetchUpdateThread({ slug, accessToken, data }));
    },
    [accessToken, dispatch],
  );

  const handleDelete = useCallback(
    ({ slug }) => {
      dispatch(fetchDeleteThread({ slug, accessToken }));
    },
    [accessToken, dispatch],
  );

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  return {
    threads,
    isLoading,
    error,
    handleView,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
