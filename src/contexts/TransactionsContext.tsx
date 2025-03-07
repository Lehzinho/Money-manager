import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
}
const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvicer = ({ children }: TransactionContextProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const loadTransactions = async () => {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();
    console.log(data);
    setTransactions(data);
  };
  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
