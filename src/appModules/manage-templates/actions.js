import { rdxFetch } from "../../config/reduxAxios";

export const ADD_TEMPLATE = "ADD_TEMPLATE";
export const EDIT_TEMPLATE = "EDIT_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const GET_TEMPLATES = "GET_TEMPLATES";
export const ADD_PROJECT = "ADD_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const GET_PROJECTS = "GET_PROJECTS";
export const OPEN_DIALOG = "OPEN_DIALOG";
export const PROJECT_ID = "PROJECT_ID";

export const action = (actionType, obj) => async dispatch => {
  dispatch({
    actionType,
    payload: {
      requestInProgress: true
    }
  });
  const response = await rdxFetch(actionType, {
    obj
  });

  dispatch(response);
};

export const getTemplatesMethod = projectId => async dispatch => {
  const response = await rdxFetch(GET_TEMPLATES, {
    url: `/projects/${projectId}/templates`
  });
  dispatch(response);
};

export const addTemplateMethod = data => async dispatch => {
  const response = await rdxFetch(ADD_TEMPLATE, {
    url: `/projects/${data.projectId}/templates`,
    postData: data
  });
  dispatch(response);
};

export const editTemplatesMethod = data => async dispatch => {
  const response = await rdxFetch(EDIT_TEMPLATE, {
    url: `/templates/${data._id}`,
    putData: data
  });
  dispatch(response);
};

export const deleteTemplatesMethod = id => async dispatch => {
  const response = await rdxFetch(DELETE_TEMPLATE, {
    url: `/templates/${id}`,
    method: "delete"
  });
  dispatch(response);
};

export const getProjectsMethod = () => async dispatch => {
  const response = await rdxFetch(GET_PROJECTS, { url: `/projects/` });
  dispatch(response);
};

export const addProjectMethod = data => async dispatch => {
  const response = await rdxFetch(ADD_PROJECT, {
    url: "/projects",
    postData: data
  });
  dispatch(response);
};

export const deleteProjectsMethod = id => async dispatch => {
  const response = await rdxFetch(DELETE_PROJECT, {
    url: `/projects/${id}`,
    method: "delete"
  });
  dispatch(response);
};

export const editProjectsMethod = data => async dispatch => {
  const response = await rdxFetch(EDIT_PROJECT, {
    url: `/projects/${data._id}`,
    putData: data
  });
  dispatch(response);
};

export const toggleDialog = bool => ({
  type: OPEN_DIALOG,
  payload: !bool
});

export const updateProjectID = id => ({
  type: PROJECT_ID,
  payload: id
});
