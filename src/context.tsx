import React, { createContext } from "react";

export type CounterContextType = {
  count: number;
  setCount: (count: number) => void;
};

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined,
);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounterContext() {
  const context = React.useContext(CounterContext);
  if (!context) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
}
