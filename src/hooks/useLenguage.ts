import { useContext } from "react";
import { LenguageContext } from "../context/LenguageContext";

export function useLenguage() {
  const context = useContext(LenguageContext)

  if (!context) {
    throw new Error('useLenguage must be used within an LenguageProvider');
  };

  return context;
}