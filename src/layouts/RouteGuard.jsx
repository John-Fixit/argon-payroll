/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

function RouteGuard({ element }) {
  const location = useLocation();
  const { userData } = useCurrentUser();

  if (!userData?.data?.CAN_ONBOARD && location.pathname.includes("/onboard")) {
    return <Navigate to="/engage/home" />;
  }
  // if (
  //   !userData?.data?.IS_VARIATION &&
  //   location.pathname.includes("/variation")
  // ) {
  //   return <Navigate to="/engage/home" />;
  // }

  if (
    !userData?.data?.IS_HR &&
    !userData?.data?.IS_ADMINISTRATOR &&
    (location.pathname.includes("/hr") ||
      location.pathname.includes("/administrator"))
  ) {
    return <Navigate to="/engage/home" />;
  }

  if (!userData?.data?.IS_HR && location.pathname.includes("/hr")) {
    return <Navigate to="/engage/home" />;
  }

  if (
    !userData?.data?.IS_ADMINISTRATOR &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/engage/home" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
