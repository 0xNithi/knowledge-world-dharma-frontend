import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initialize as initializeAction,
  fetchCreateUser,
  fetchDeleteUser,
  fetchUser,
  fetchUsers,
  fetchUpdateUser,
  fetchBanUser,
} from '.';

export const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
};

export const useUsers = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const { users, isLoading, error } = useSelector((state) => state.users);

  const handleView = useCallback(
    ({ slug }) => {
      const userFound = users.find((user) => user.id.toString() === slug);

      if (!userFound) {
        dispatch(fetchUser({ slug }));
      }
      return userFound;
    },
    [users, dispatch],
  );

  const handleCreate = useCallback(
    ({ data }) => {
      dispatch(fetchCreateUser({ data }));
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    ({ slug, data }) => {
      dispatch(fetchUpdateUser({ slug, accessToken, data }));
    },
    [accessToken, dispatch],
  );

  const handleDelete = useCallback(
    ({ slug }) => {
      dispatch(fetchDeleteUser({ slug, accessToken }));
    },
    [accessToken, dispatch],
  );

  const handleBan = useCallback(
    ({ slug }) => {
      dispatch(fetchBanUser({ slug, accessToken }));
    },
    [accessToken, dispatch],
  );

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  return {
    users,
    isLoading,
    error,
    handleView,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleBan,
  };
};
