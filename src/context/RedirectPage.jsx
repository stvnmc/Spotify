import { createContext, useContext } from "react";

export const RedirectPageContext = createContext();

export const useRedirectPage = () => {
  const context = useContext(RedirectPageContext);

  if (!context) {
    console.log("need context");
  }
  return context;
};

export const RedirectPageProvider = ({ children }) => {
  return (
    <RedirectPageContext.Provider value={{}}>
      {children}
    </RedirectPageContext.Provider>
  );
};
