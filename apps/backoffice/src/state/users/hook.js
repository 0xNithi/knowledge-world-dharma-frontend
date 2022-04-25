import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '.';

export const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
};

export const useUsers = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  return { users, isLoading, error };
};
