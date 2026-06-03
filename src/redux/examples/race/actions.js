import { RACE_FETCH_REQUEST, RACE_FETCH_SUCCESS, RACE_FETCH_TIMEOUT } from "../../constants";

export const raceFetchRequest = () => ({ type: RACE_FETCH_REQUEST });

export const raceFetchSuccess = (data) => ({
  type: RACE_FETCH_SUCCESS,
  payload: { data },
});

export const raceFetchTimeout = () => ({ type: RACE_FETCH_TIMEOUT });
