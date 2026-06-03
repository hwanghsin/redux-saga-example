import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  API_FINISHED,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  form: {
    usr: "",
    pwd: "",
  },
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        form: { ...state.form, usr: action.payload.usr },
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        form: { ...state.form, pwd: action.payload.pwd },
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: true,
        form: { usr: "", pwd: "" },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case API_FINISHED:
      return {
        ...state,
        loading: false,
        form: { usr: "", pwd: "" },
      };
    default:
      return state;
  }
};

export default Login;
