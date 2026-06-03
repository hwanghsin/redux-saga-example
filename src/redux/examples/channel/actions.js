import { COUNTDOWN_START, COUNTDOWN_TICK, COUNTDOWN_END } from "../../constants";

export const countdownStart = (from) => ({
  type: COUNTDOWN_START,
  payload: { from },
});

export const countdownTick = (value) => ({
  type: COUNTDOWN_TICK,
  payload: { value },
});

export const countdownEnd = () => ({ type: COUNTDOWN_END });
