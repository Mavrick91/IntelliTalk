import { createContext, useCallback, useContext, useState } from "react";
import { Historic } from "../types/historic";

type HistoricContextType = [
  historic: Historic[],
  setHistoric: (historic?: Historic) => void,
  removeLastMessage: () => void
];

const HistoricContext = createContext<HistoricContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const HistoricProvider = ({ children }: Props) => {
  const [historic, setHistoric] = useState<Historic[]>([]);

  const updateHistoric = useCallback((newHistoric?: Historic) => {
    if (!newHistoric) {
      setHistoric([]);
    } else setHistoric((prev) => [...prev, newHistoric]);
  }, []);

  const removeLastMessage = useCallback(() => {
    setHistoric((prev) => prev.slice(0, prev.length - 1));
  }, []);

  return (
    <HistoricContext.Provider
      value={[historic, updateHistoric, removeLastMessage]}
    >
      {children}
    </HistoricContext.Provider>
  );
};

export const useHistoric = () => {
  const context = useContext(HistoricContext);
  if (context === null) {
    throw new Error("useHistoric must be used within a HistoricProvider");
  }
  return context;
};

export default HistoricProvider;
