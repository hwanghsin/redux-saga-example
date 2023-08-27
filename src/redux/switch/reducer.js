import { TOGGLE_SWITCH } from "../constants";

const initialState = {
  isTurnOn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        isTurnOn: !state.isTurnOn,
      };
    default:
      return state;
  }
};
