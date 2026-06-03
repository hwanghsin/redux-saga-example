import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "../../constants";

const initialState = {
  loading: false,
  results: [],
  error: null,
  query: "",
};

const Search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true, error: null, query: action.payload.query };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload.results };
    case SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default Search;
