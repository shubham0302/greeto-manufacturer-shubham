import { useCallback, useEffect, useMemo } from "react";
import { authActions, useAppDispatch, useAppSelector } from "../../../store";
import { useAlert } from "../../alerts";
import { useToggle } from "../useToggle";
import { SignUpRequest, User } from "../../types";
import { authService } from "../../../infrastructure";
import { isEmpty } from "lodash";
import { getEmailError, getPhoneError } from "../../utils";

export const useAuth = (updateProfile = false) => {
  const authState = useAppSelector((state) => state.auth);
  const { error: showError } = useAlert();
  const { errorMessage, isLoggedIn, status, user } = authState;
  const isProfileIncomplete = useMemo(() => {
    if (isEmpty(user?.companyName)) {
      return true;
    }
    if (isEmpty(user?.address)) {
      return true;
    }
    if (getEmailError(user?.email)) {
      return true;
    }
    if (getPhoneError(user?.phoneNumber)) {
      return true;
    }
    if (isEmpty(user?.gstCertificate)) {
      return true;
    }
    if (isEmpty(user?.gstNumber)) {
      return true;
    }
    if (isEmpty(user?.legalStructure)) {
      return true;
    }
    return false;
  }, [user]);
  // const isFetching = useMemo(() => status === "loading", [status]);
  const isAppLoading = useMemo(() => status === "initial", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const {
    isOpen: loginInProgress,
    open: startLogin,
    close: finishLogin,
  } = useToggle();
  const {
    isOpen: isFetching,
    open: startFetching,
    close: finishFetching,
  } = useToggle();
  const {
    isOpen: logoutInProgress,
    open: startLogout,
    close: stopLogout,
  } = useToggle();
  const dispatch = useAppDispatch();
  const logoutSubmit = useCallback(
    async (cb?: () => void) => {
      startLogout();
      const loginResponse = await authService.logout();
      const { success, error } = loginResponse;
      if (success) {
        dispatch(authActions.setLogout());
        if (cb) {
          cb();
        }
      } else {
        showError(error?.message || "Something went wrong");
      }
      stopLogout();
    },
    [dispatch, showError, startLogout, stopLogout]
  );
  const signInSubmit = useCallback(
    async (identifier: string) => {
      startLogin();
      const loginResponse = await authService.login(identifier);
      const { success, error } = loginResponse;
      if (success) {
        finishLogin();
        return true;
      } else {
        finishLogin();
        showError(error?.message || "Something went wrong");
        return false;
      }
    },
    [finishLogin, showError, startLogin]
  );

  const signUpSubmit = useCallback(
    async (body: SignUpRequest) => {
      startLogin();
      const loginResponse = await authService.signup(body);
      const { success, error } = loginResponse;
      if (success) {
        finishLogin();
        return true;
      } else {
        finishLogin();
        showError(error?.message || "Something went wrong");
        return false;
      }
    },
    [finishLogin, showError, startLogin]
  );

  const otpSubmit = useCallback(
    async (identifier: string, password: string, cb?: () => void) => {
      startLogin();
      const loginResponse = await authService.verifyOtp(identifier, password);
      const { data, success, error } = loginResponse;
      if (success) {
        dispatch(authActions.setSuccessUser(data));
        if (cb) {
          cb();
        }
      } else {
        showError(error?.message || "Something went wrong");
      }
      finishLogin();
    },
    [dispatch, finishLogin, showError, startLogin]
  );
  const fetchProfile = useCallback(async () => {
    startFetching();
    // await new Promise((res) =>
    //   setTimeout(() => {
    //     return res(true);
    //   }, 3000)
    // );
    const loginResponse = await authService.fetchProfile();
    const { data, success } = loginResponse;
    if (success) {
      dispatch(authActions.setSuccessUser(data));
    }
    finishFetching();
  }, [dispatch, finishFetching, startFetching]);

  useEffect(() => {
    if (updateProfile) {
      fetchProfile();
    }
  }, [fetchProfile, updateProfile]);

  const changeUser = useCallback(
    (user: User) => {
      dispatch(authActions.setUser(user));
    },
    [dispatch]
  );

  return {
    fetchProfile,
    signInSubmit,
    otpSubmit,
    signUpSubmit,
    logoutSubmit,
    changeUser,
    user,
    isAppLoading,
    loginInProgress,
    logoutInProgress,
    isError,
    isFetching,
    isLoggedIn,
    errorMessage,
    isProfileIncomplete,
  };
};
