import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import {
  ChangeProfileRedirect,
  LoginRedirect,
} from "../../features/login/LoginPage";
import { routeHandler } from "./routeHendler";
import { routeConstants } from "./routeConstants";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn, isProfileIncomplete } = useAuth();
  const { pathname, search } = useLocation();
  const isProfileRoute = useMemo(() => {
    return routeHandler.isCurrentRoute(
      routeConstants.completeProfile,
      pathname
    );
  }, [pathname]);

  if (isLoggedIn) {
    if (!isProfileRoute && isProfileIncomplete) {
      return <ChangeProfileRedirect redirectFrom={pathname + search} />;
    }
    return <Outlet />;
  }
  return <LoginRedirect redirectFrom={pathname + search} />;
};

export default PrivateRoute;
