import * as types from "./actions";

const initialState = {
  getTemplates: {},
  addTemplate: {},
  editTemplate: {},
  deleteTemplate: {},
  getProjects: {},
  addProject: {},
  editProject: {},
  deleteProject: {},
  projectId: {},
  openDialog: false
};

export const templatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TEMPLATES:
      return { ...state, getTemplates: action.payload };

    case types.ADD_TEMPLATE:
      return { ...state, addTemplate: action.payload };

    case types.EDIT_TEMPLATE:
      return { ...state, editTemplate: action.payload };

    case types.DELETE_TEMPLATE:
      return { ...state, deleteTemplate: action.payload };

    case types.GET_PROJECTS:
      return { ...state, getProjects: action.payload };

    case types.ADD_PROJECT:
      return { ...state, addProject: action.payload };

    case types.EDIT_PROJECT:
      return { ...state, editProject: action.payload };

    case types.DELETE_PROJECT:
      return { ...state, deleteProject: action.payload };

    case types.OPEN_DIALOG:
      return { ...state, openDialog: action.payload };

    case types.PROJECT_ID:
      return { ...state, projectId: action.payload };

    default:
      return state;
  }
};
