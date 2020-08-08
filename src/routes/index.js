import React from "react";
import { Redirect } from "react-router-dom";
import { getAccessToken } from "../utils";
import { authRouteConstants } from "../constants/route-constants";
import { templateModuleRoutes } from "../appModules/manage-templates/routes";
import NotFound from "../components/NotFoundPage";
import { authRoutes } from "../appModules/auth/routes";

const appRoutes = [
  ...authRoutes,
  ...templateModuleRoutes,
  { path: "*", component: NotFound, loginNotRequired: true }
];

const checkAuth = ({ route, ...props }) =>
  !route.loginNotRequired && !getAccessToken() ? (
    <Redirect to={authRouteConstants.LOGIN} />
  ) : (
    <route.component {...props} />
  );

const modifiedRoutesArr = appRoutes.map(routeObj => {
  if (!routeObj.loginNotRequired) {
    return {
      ...routeObj,
      render: checkAuth
    };
  }
  return routeObj;
});
export default modifiedRoutesArr;
