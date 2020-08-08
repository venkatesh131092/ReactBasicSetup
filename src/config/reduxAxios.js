import axiosInstance from "./axiosConfig";

const camelCaseToSentence = text => {
  if (text && typeof text === "string") {
    let str = text.toLowerCase();
    str = str[0].toUpperCase() + str.substr(1);
    return str;
  }
  return text;
};

const extractErrorMessage = err => {
  let message = "";
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.message &&
    err.response.data.message.toLowerCase() === "validation failed"
  ) {
    if (
      err.response &&
      err.response.data &&
      err.response.data.error &&
      err.response.data.error.message
    )
      message = err.response.data.error.message;
    message = camelCaseToSentence(message);
    return message;
  }

  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.data &&
    err.response.data.data.length
  ) {
    message = err.response.data.data[0].Message;
  }

  if (err && err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message;
  }

  // message = camelCaseToSentence(message);
  return message;
};

export const reduxAxios = instance => {
  const axiosInstance = instance;
  return async (type, obj = {}) => {
    const { url, putData, postData, putFormData, postFormData, method } = obj;

    const decideMethod =
      putData || putFormData
        ? "put"
        : ((postData || postFormData) && "post") || "get";

    const requestMethod = method || decideMethod;
    const data = putData || postData;
    const formData = putFormData || postFormData;

    try {
      let res;
      if (data || formData) {
        if (data) {
          res = await axiosInstance[requestMethod](url, data);
        } else if (formData) {
          res = await axiosInstance[requestMethod](url, formData, {
            config: { headers: { "Content-Type": "multipart/form-data" } }
          });
        }
      } else {
        res = await axiosInstance[requestMethod](url);
      }
      if (
        (res && res.data && res.data.success === "true") ||
        res.status === 201 ||
        res.status === 200
      ) {
        return {
          type: `${type}`,
          payload: {
            ...(res.data || {}),
            success: true,
            requestInProgress: false
          }
        };
      } else {
        return {
          type: `${type}`,
          payload: {
            ...(res.data || {}),
            success: false,
            requestInProgress: false
          }
        };
      }
    } catch (err) {
      let message = "";
      if (err && err.message) message = err.message;
      if (extractErrorMessage(err)) message = extractErrorMessage(err);
      return {
        type: `${type}`,
        payload: {
          success: false,
          message,
          requestInProgress: false
        }
      };
    }
  };
};

export const rdxFetch = reduxAxios(axiosInstance);

export const action = (type, obj) => async dispatch => {
  dispatch({
    type,
    payload: {
      requestInProgress: true
    }
  });
  const response = await rdxFetch(type, obj);
  dispatch(response);
};
