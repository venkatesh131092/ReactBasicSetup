import { SET_SETTINGS, SHOW_MESSAGE, HIDE_MESSAGE } from "./css-actions";

const initialState = {
  layoutSettings: {},
  showMessage: ""
};
const cssReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        layoutSettings: {
          ...action.payload
        }
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        showMessage: {
          ...action.payload
        }
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        showMessage: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};
export default cssReducer;
