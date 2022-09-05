import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/features/auth/userSlice";

const useToken = () => {
  // select the token from the global state
  const { access_token, email, refresh_token } = useSelector(selectCurrentUser);

  return { access_token, refresh_token, email };
};

export default useToken;
