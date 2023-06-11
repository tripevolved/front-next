import { User } from "@/core/types";
import { StoreState } from "../store.types";
import { UpdateState } from "../store.types";

export type UserValue = Partial<User>;

export type UserState = StoreState<UserValue>;

export interface UserSlice {
  user: UserState;
  updateUser: UpdateState<UserValue>;
  setUser: (user: User) => void;
  removeUser: VoidFunction;
}
