import { useContext, useEffect } from "react";
import { PageAppMenuContext, type PageAppMenuValue } from "./page-app-menu.context";

export const useAppMenu = (value?: PageAppMenuValue) => {
  const context = useContext(PageAppMenuContext);

  useEffect(() => {
    if (!value) return;
    context.setValue(value);
    return () => {
      context.setValue({});
    };
  }, [value]);

  return context;
};
