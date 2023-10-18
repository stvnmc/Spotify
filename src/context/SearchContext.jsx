import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const SearchProvider = ({ children }) => {
 

  return (
    <SearchContext.Provider value={{ }}>
      {children}
    </SearchContext.Provider>
  );
};
