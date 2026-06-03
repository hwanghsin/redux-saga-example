import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "../../constants";

export const searchRequest = (query) => ({
  type: SEARCH_REQUEST,
  payload: { query },
});

export const searchSuccess = (results) => ({
  type: SEARCH_SUCCESS,
  payload: { results },
});

export const searchFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: { error },
});
