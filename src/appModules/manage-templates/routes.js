import AddTemplate from "./pages/AddTemplate";
import Projects from "./pages/projects";
import Templates from "./pages/templates";
import { templateRouteConstants } from "../../constants/route-constants";

export const templateModuleRoutes = [

  {
    path: templateRouteConstants.ADD_TEMPLATE,
    component: AddTemplate,
    exact: true
  },
  {
    path: templateRouteConstants.PROJECTS,
    component: Projects,
    exact: true
  },
  {
    path: templateRouteConstants.SINGLE_PROJECT_TEMPLATES,
    component: Templates,
    exact: true
  },
  {
    path: templateRouteConstants.SINGLE_TEMPLATE_VIEW,
    component: AddTemplate,
    exact: true
  },
  { path: "/", component: Projects, exact: true },

];
