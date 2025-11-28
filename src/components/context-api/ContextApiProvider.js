import { createContext } from "react";

export const MyContext = createContext();


import { useState } from "react";
import { MyContext } from "./MyContext";

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState("");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
