import { useLoginMutation } from '../store/features/auth/loginAPI';

const useLogin = () => {
  const [triggerLogin, { isLoading, isError, isSuccess }] = useLoginMutation();

  return { triggerLogin, isLoading, isError, isSuccess };
};

export default useLogin;
