import { User } from "@/core/types";
import { StoreState } from "../store.types";
import { UpdateState } from "../store.types";

export type UserValue = Partial<User>;

export interface UserSlice {
  user: StoreState<UserValue>;
  updateUser: UpdateState<UserValue>;
  setUser: (user: User) => void;
  removeUser: VoidFunction;
}
