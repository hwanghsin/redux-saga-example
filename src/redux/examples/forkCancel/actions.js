import { COUNTER_START, COUNTER_STOP, COUNTER_TICK } from "../../constants";

export const counterStart = () => ({ type: COUNTER_START });
export const counterStop = () => ({ type: COUNTER_STOP });
export const counterTick = () => ({ type: COUNTER_TICK });
