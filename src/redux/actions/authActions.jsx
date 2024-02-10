import axios from "axios";
import { dispatch } from "../store";
import {
  getSigninSuccess,
  hasError,
  startLoading,
} from "../reducers/authReducer";
import { machineUrl } from "../../utils/constant";

// Header to send in API

const header = {
  Authorization: import.meta.env.VITE_AUTHORIZATION,
};

// Actions
export function signIn(user) {
  return async () => {
    dispatch(startLoading());

    try {
      const response = await axios.post(`${machineUrl}/login`, user, {
        headers: header,
      });
      dispatch(getSigninSuccess(response.data));
      return response?.data;
    } catch (error) {
      dispatch(hasError(error?.response?.data));
      return error?.response?.data;
    }
  };
}
