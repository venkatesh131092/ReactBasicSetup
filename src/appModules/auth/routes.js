import Login from "./pages/login";
import { authRouteConstants } from "../../constants/route-constants";

export const authRoutes = [
  {
    path: authRouteConstants.LOGIN,
    component: Login,
    loginNotRequired: true,
    exact: true
  }
];
