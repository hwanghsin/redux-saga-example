import { POLL_START, POLL_STOP, POLL_SUCCESS } from "../../constants";

const initialState = {
  polling: false,
  data: null,
  lastUpdated: null,
};

const Poll = (state = initialState, action) => {
  switch (action.type) {
    case POLL_START:
      return { ...state, polling: true };
    case POLL_STOP:
      return { ...state, polling: false };
    case POLL_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        lastUpdated: new Date().toLocaleTimeString(),
      };
    default:
      return state;
  }
};

export default Poll;
