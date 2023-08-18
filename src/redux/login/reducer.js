import {
  LOGIN,
  LOGIN_SUCCESS,
  API_FINISHED,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
} from "../constants";

const initialState = {
  loading: false,
  form: {
    usr: "kminchelle",
    pwd: "0lelplR",
  },
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        form: {
          ...state.form,
          usr: action.payload.usr,
        },
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        form: {
          ...state.form,
          pwd: action.payload.pwd,
        },
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case API_FINISHED:
      return {
        ...state,
        form: {
          usr: "",
          pwd: "",
        },
      };
    default:
      return state;
  }
};

export default Login;
