export type FetchStateKeys = "UN_FETCHED" | "FETCHED" | "FETCHING" | "ERROR";
export type FetchState = {
  fetched: boolean;
  fetching: boolean;
  error: boolean;
};

export type StoreState<T> = T & FetchState;

export type UpdateState<T> = (state: Partial<StoreState<T>> | StoreState<T>) => void;
