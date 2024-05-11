import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  NavigateProps,
  useSearchParams,
} from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";
// import { useAuth, useToggle } from "../../common/hooks";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";
import { useAuth, useToggle } from "../../common";
import AppLogo from "../../common/components/AppLogo";
import { HomePageRedirect } from "../home/HomePage";

const LoginPage = () => {
  const { isLoggedIn, signInSubmit, loginInProgress, otpSubmit } = useAuth();
  const { isOpen: isOtpVisible, open: showOtp, close: hideOtp } = useToggle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const redirectFrom = useMemo(() => {
    return searchParams.get("redirectTo");
  }, [searchParams]);

  const { errors, isValid } = useMemo(() => {
    const errors: {
      email?: string;
      password?: string;
    } = {
      email: null,
      password: null,
    };
    if (isEmpty(email)) {
      errors.email = "Cannot be empty!";
    }
    if (password.length !== 6) {
      errors.password = "Should have only 6 digit";
    }

    return {
      errors,
      isValid: !isOtpVisible
        ? isEmpty(errors.email)
        : Object.values(errors).filter((e) => e).length === 0,
    };
  }, [email, isOtpVisible, password.length]);

  const {
    isOpen: loginInitiated,
    open: startLogin,
    close: stopLogin,
  } = useToggle();

  const onSave = useCallback(async () => {
    startLogin();
    if (isValid) {
      const valid = await signInSubmit(email);
      stopLogin();
      setPassword("");
      if (valid) {
        showOtp();
      } else {
        hideOtp();
      }
    }
  }, [email, hideOtp, isValid, showOtp, signInSubmit, startLogin, stopLogin]);

  const onSaveOtp = useCallback(async () => {
    startLogin();
    if (isValid) {
      await otpSubmit(email, password);
    }
  }, [email, isValid, otpSubmit, password, startLogin]);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const getErrorComponent = useCallback(
    (key: "email" | "password") => {
      const err = errors[key];
      if (loginInitiated && err) {
        return (
          <Typography variant="bodyTn" color={"error.main"}>
            {err}
          </Typography>
        );
      }
      return <></>;
    },
    [errors, loginInitiated]
  );

  const emailError = useMemo(
    () => getErrorComponent("email"),
    [getErrorComponent]
  );
  const passwordError = useMemo(
    () => getErrorComponent("password"),
    [getErrorComponent]
  );

  if (isLoggedIn) {
    if (redirectFrom) {
      return <Navigate to={redirectFrom} />;
    }
    return <HomePageRedirect />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          py: 2,
          borderBottomWidth: "1px",
          borderBottomColor: "gray.100",
          borderBottomStyle: "solid",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            mx: "auto",
          }}
        >
          <AppLogo />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row-reverse",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "55%",
            height: "100%",
            bgcolor: "gray.100",
          }}
        >
          <img
            src="/LoginPage.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="h3"
              textAlign={"center"}
              sx={{ width: "100%", mb: 4 }}
            >
              Sign in to your account
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}>Email</Typography>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                name="email"
                type="email"
                onChange={onChangeEmail}
                disabled={isOtpVisible}
              />
              {emailError}
            </Box>
            {isOtpVisible && (
              <Box sx={{ width: "100%" }}>
                <Typography mb={1}>Otp</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your 6 digit OTP"
                  value={password}
                  onChange={onChangePassword}
                  type={"number"}
                />
                {passwordError}
              </Box>
            )}
            <Button
              variant="contained"
              onClick={isOtpVisible ? onSaveOtp : onSave}
              disabled={loginInProgress}
              disableElevation
              endIcon={<ArrowRightAltOutlined />}
              size="medium"
              sx={{ width: "30%", textTransform: "capitalize" }}
            >
              Submit
            </Button>

            <Link
              style={{ width: "100%" }}
              to={
                redirectFrom
                  ? routeConstants.signup + "?redirectTo=" + redirectFrom
                  : routeConstants.signup
              }
              // to="http://localhost:5025/api/user/google"
            >
              Register your account
            </Link>
            {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Divider sx={{ flex: 1 }} />
              <Typography variant="labelLr" color={"gray.main"}>
                SIGN IN WITH
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
             */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  redirectFrom?: string;
};

export const LoginRedirect: React.FC<Props> = (props) => {
  const { redirectFrom } = props;
  const newUrl = useMemo<NavigateProps["to"]>(() => {
    const newUrl: NavigateProps["to"] = {
      pathname: routeConstants.login,
      search: redirectFrom
        ? `?redirectTo=${encodeURIComponent(redirectFrom)}`
        : "",
    };
    return newUrl;
  }, [redirectFrom]);

  return <Navigate to={newUrl} />;
};

export const ChangeProfileRedirect: React.FC<Props> = (props) => {
  const { redirectFrom } = props;
  const newUrl = useMemo<NavigateProps["to"]>(() => {
    const newUrl: NavigateProps["to"] = {
      pathname: routeConstants.completeProfile,
      search: redirectFrom
        ? `?redirectTo=${encodeURIComponent(redirectFrom)}`
        : "",
    };
    return newUrl;
  }, [redirectFrom]);

  return <Navigate to={newUrl} />;
};

export default LoginPage;
