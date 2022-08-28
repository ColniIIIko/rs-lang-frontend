import { useAppSelector } from '../redux/hooks';
import { selectIsAuth, selectIsError, selectIsLoading } from '../redux/reducers/auth';

export const useAuth = () => {
  const isError = useAppSelector(selectIsError);
  const isLoading = useAppSelector(selectIsLoading);
  const isAuth = useAppSelector(selectIsAuth);

  return {
    isError,
    isLoading,
    isAuth,
  };
};
