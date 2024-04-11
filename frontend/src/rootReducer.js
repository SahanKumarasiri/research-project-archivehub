import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer";
import * as actions from "./auth/authActionsTypes";

const appReducer = (history) =>
  combineReducers({
    auth: authReducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === actions.LOG_OUT) {
    state = undefined;
  }

  return appReducer(history)(state, action);
};

export default createRootReducer;
