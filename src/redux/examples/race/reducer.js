import { RACE_FETCH_REQUEST, RACE_FETCH_SUCCESS, RACE_FETCH_TIMEOUT } from "../../constants";

const initialState = {
  loading: false,
  data: null,
  timedOut: false,
};

const Race = (state = initialState, action) => {
  switch (action.type) {
    case RACE_FETCH_REQUEST:
      return { ...state, loading: true, data: null, timedOut: false };
    case RACE_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload.data, timedOut: false };
    case RACE_FETCH_TIMEOUT:
      return { ...state, loading: false, timedOut: true };
    default:
      return state;
  }
};

export default Race;
