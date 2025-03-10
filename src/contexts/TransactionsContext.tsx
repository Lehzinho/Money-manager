import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface newTransactionFormInputs {
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
}

interface TransactionContextProps {
  children: ReactNode;
}

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransactions: (transactions: newTransactionFormInputs) => Promise<void>;
}
export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvicer = ({ children }: TransactionContextProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: {
        q: query,
      },
    });
    setTransactions(response.data);
  }, []);

  const createTransactions = useCallback(
    async (transactions: newTransactionFormInputs) => {
      const { data } = await api.post("/transactions", {
        ...transactions,
        createdAt: new Date().toISOString(),
      });

      setTransactions((prev) => [...prev, data]);
    },
    []
  );
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
