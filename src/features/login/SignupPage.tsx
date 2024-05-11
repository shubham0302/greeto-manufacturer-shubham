import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";
// import { useAuth, useToggle } from "../../common/hooks";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { isEmpty, omit } from "lodash";
import { SignUpRequest, useAuth, useToggle } from "../../common";
import AppLogo from "../../common/components/AppLogo";
import { HomePageRedirect } from "../home/HomePage";

const SignupPage = () => {
  const { isLoggedIn, loginInProgress, otpSubmit, signUpSubmit } = useAuth();
  const { isOpen: isOtpVisible, open: showOtp, close: hideOtp } = useToggle();

  const [signUpReq, setSignUpReq] = useState<SignUpRequest>(null);
  const { email } = signUpReq || {};
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const redirectFrom = useMemo(() => {
    return searchParams.get("redirectTo");
  }, [searchParams]);

  const { errors, isValid } = useMemo(() => {
    const errors: {
      email?: string;
      phone?: string;
      name?: string;
      password?: string;
    } = {
      email: null,
      phone: null,
      name: null,
      password: null,
    };
    const { companyName, email, phone } = signUpReq || {};
    if (isEmpty(email)) {
      errors.email = "Cannot be empty!";
    }
    if (isEmpty(phone)) {
      errors.phone = "Cannot be empty!";
    } else if (phone.length !== 10) {
      errors.phone = "Should have 10 digit";
    }
    if (isEmpty(companyName)) {
      errors.name = "Cannot be empty!";
    }
    if (password.length !== 6) {
      errors.password = "Should have only 6 digit";
    }

    const withoutOtp = omit(errors, ["password"]);

    return {
      errors,
      isValid: !isOtpVisible
        ? Object.values(withoutOtp).filter((e) => e).length === 0
        : Object.values(errors).filter((e) => e).length === 0,
    };
  }, [signUpReq, password.length, isOtpVisible]);

  const {
    isOpen: loginInitiated,
    open: startLogin,
    close: stopLogin,
  } = useToggle();

  const onSave = useCallback(async () => {
    startLogin();
    if (isValid) {
      const valid = await signUpSubmit(signUpReq);
      stopLogin();
      setPassword("");
      if (valid) {
        showOtp();
      } else {
        hideOtp();
      }
    }
  }, [
    hideOtp,
    isValid,
    showOtp,
    signUpReq,
    signUpSubmit,
    startLogin,
    stopLogin,
  ]);

  const onSaveOtp = useCallback(async () => {
    startLogin();
    if (isValid) {
      await otpSubmit(email, password);
    }
  }, [isValid, otpSubmit, password, email, startLogin]);

  const onChangeReq = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpReq((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const getErrorComponent = useCallback(
    (key: "email" | "phone" | "name" | "password") => {
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
  const phoneError = useMemo(
    () => getErrorComponent("phone"),
    [getErrorComponent]
  );
  const nameError = useMemo(
    () => getErrorComponent("name"),
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
              Register your account
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}>Company name</Typography>
              <TextField
                fullWidth
                placeholder="Enter your company name"
                value={signUpReq?.companyName}
                name="companyName"
                type="text"
                onChange={onChangeReq}
                disabled={isOtpVisible}
              />
              {nameError}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}>Email</Typography>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={signUpReq?.email}
                name="email"
                type="email"
                onChange={onChangeReq}
                disabled={isOtpVisible}
              />
              {emailError}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}>Phone Number</Typography>
              <TextField
                fullWidth
                placeholder="Enter your phone number"
                value={signUpReq?.phone}
                name="phone"
                type="number"
                onChange={onChangeReq}
                disabled={isOtpVisible}
              />
              {phoneError}
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
            <Link
              to={routeConstants.checkUser}
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ color: "primary.main" }}>
                Forgot password?
              </Typography>
            </Link>
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
                  ? routeConstants.login + "?redirectTo=" + redirectFrom
                  : routeConstants.login
              }
              // to="http://localhost:5025/api/user/google"
            >
              Sign In to your account
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
            <Link
              style={{ width: "100%" }}
              to=""
              // to="http://localhost:5025/api/user/google"
            >
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Google />}
              >
                Continue with Google
              </Button>
            </Link> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
