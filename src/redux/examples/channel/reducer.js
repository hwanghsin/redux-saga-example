import { COUNTDOWN_START, COUNTDOWN_TICK, COUNTDOWN_END } from "../../constants";

const initialState = {
  running: false,
  value: 0,
  done: false,
};

const Channel = (state = initialState, action) => {
  switch (action.type) {
    case COUNTDOWN_START:
      return { running: true, value: action.payload.from, done: false };
    case COUNTDOWN_TICK:
      return { ...state, value: action.payload.value };
    case COUNTDOWN_END:
      return { ...state, running: false, done: true, value: 0 };
    default:
      return state;
  }
};

export default Channel;
