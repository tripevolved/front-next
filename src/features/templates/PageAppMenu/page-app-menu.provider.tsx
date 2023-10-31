import { useState } from "react";
import { PageAppMenuContext, type PageAppMenuValue } from "./page-app-menu.context";

interface ProviderProps extends PageAppMenuValue {
  children: React.ReactNode;
  headerOptions?: PageAppMenuValue
}

export const PageAppMenuProvider = ({ children, headerOptions = {} }: ProviderProps) => {
  const [value, setValue] = useState<PageAppMenuValue>(headerOptions);

  return (
    <PageAppMenuContext.Provider value={{ ...value, setValue }}>
      {children}
    </PageAppMenuContext.Provider>
  );
};
