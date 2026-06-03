import { COUNTER_START, COUNTER_STOP, COUNTER_TICK } from "../../constants";

const initialState = {
  running: false,
  count: 0,
};

const ForkCancel = (state = initialState, action) => {
  switch (action.type) {
    case COUNTER_START:
      return { ...state, running: true, count: 0 };
    case COUNTER_STOP:
      return { ...state, running: false };
    case COUNTER_TICK:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

export default ForkCancel;
