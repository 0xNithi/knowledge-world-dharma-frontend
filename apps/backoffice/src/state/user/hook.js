import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initialize as initializeAction,
  fetchLogin,
  fetchRegister,
  fetchUser,
} from '.';

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    dispatch(fetchUser({ accessToken }));
  }, [accessToken, dispatch]);
};

export const useUser = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isLoading, error } = useSelector(
    (state) => state.user,
  );

  const handleRegister = useCallback(
    ({ data }) => {
      dispatch(fetchRegister({ data }));
    },
    [dispatch],
  );

  const handleLogin = useCallback(
    ({ data }) => {
      dispatch(fetchLogin({ data }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  return { user, accessToken, isLoading, error, handleRegister, handleLogin };
};
