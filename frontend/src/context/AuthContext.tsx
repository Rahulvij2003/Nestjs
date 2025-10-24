import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { refreshToken } from "../features/auth/authSlice";

export const useAuthRefresh = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 14 * 60 * 1000); // every 14 mins
    return () => clearInterval(interval);
  }, [dispatch]);
};
