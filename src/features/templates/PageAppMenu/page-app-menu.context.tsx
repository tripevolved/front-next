import { createContext } from "react";

export interface PageAppMenuValue {
  title?: string;
  subtitle?: string;
  image?: string;
  backUrl?: string;
}

export interface PageAppMenuContextValue extends PageAppMenuValue {
  setValue: (value: PageAppMenuValue) => void;
}

export const PageAppMenuContext = createContext<PageAppMenuContextValue>({
  setValue: () => {},
});
