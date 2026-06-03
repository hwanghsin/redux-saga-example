import { POLL_START, POLL_STOP, POLL_SUCCESS } from "../../constants";

export const pollStart = () => ({ type: POLL_START });
export const pollStop = () => ({ type: POLL_STOP });
export const pollSuccess = (data) => ({
  type: POLL_SUCCESS,
  payload: { data },
});
