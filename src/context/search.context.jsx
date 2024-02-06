import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function Provider({ children }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AppContext.Provider value={{ search, setSearch, currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
