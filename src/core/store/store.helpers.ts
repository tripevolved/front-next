import type { FetchState, FetchStateKeys } from "./store.types";

export const FETCH_STATE: Record<FetchStateKeys, FetchState> = {
  UN_FETCHED: {
    fetched: false,
    fetching: false,
    error: false,
  },
  FETCHED: {
    fetched: true,
    fetching: false,
    error: false,
  },
  FETCHING: {
    fetched: false,
    fetching: true,
    error: false,
  },
  ERROR: {
    fetched: false,
    fetching: false,
    error: true,
  },
};

export const makeState = <T>(defaultState: T): T & FetchState => ({
  ...defaultState,
  ...FETCH_STATE.UN_FETCHED,
});
