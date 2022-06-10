import React, { useEffect, useState, createContext, ReactNode } from "react";
import { LenguagePropsReturn } from "./type";

import { lenguagePortugues } from "./portuguese";
import { lenguageIngles } from "./ingles";

type LenguagesProps = "en" | "pt-br";

interface LenguageProviderProps {
  children: ReactNode;
}

interface LenguageContextData {
  lenguageState: LenguagesProps;
  lenguageTexts: LenguagePropsReturn;
  setLenguageState: (event: LenguagesProps) => void;
}

export const LenguageContext = createContext({} as LenguageContextData); 

export function LenguageProvider({ children }: LenguageProviderProps) {
  const [lenguageState, setLenguageState] = useState<LenguagesProps>("pt-br");
  const [lenguageTexts, setLenguageTexts] = useState<LenguagePropsReturn>(lenguagePortugues);

  useEffect(() => {
    switch(lenguageState) {
      case "en":
        setLenguageTexts(lenguageIngles);
        break;
      
      case "pt-br":
        setLenguageTexts(lenguagePortugues);
        break;
    }
  }, [lenguageState]);

  return (
    <LenguageContext.Provider value={{ lenguageState, lenguageTexts, setLenguageState }}>    
      {children}
    </LenguageContext.Provider>
  )
}