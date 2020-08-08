export const SET_SETTINGS = "SET_SETTING";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

export const setSettings = settings => ({
  type: SET_SETTINGS,
  payload: settings
});
export const showMessage = (message, variant) => {
  console.log(message, "message");
  return async dispatch => {
    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        open: true,
        message,
        variant
      }
    });

    // this snackbar will disappear after 5 seconds
    setTimeout(() => {
      dispatch({
        type: HIDE_MESSAGE,
        payload: {
          open: false,
          message: ""
        }
      });
    }, 5000);
  };
};
