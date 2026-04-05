import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // Load from localStorage OR default data
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [
      { id: 1, name: "Netflix", amount: -500, category: "Entertainment" },
      { id: 2, name: "Salary", amount: 5000, category: "Income" },
      { id: 3, name: "Groceries", amount: -2000, category: "Food" },
    ];
  });

  // SAVE to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

   const addTransaction = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };


  const [income, setIncome] = useState(0);

  const deleteTransaction = (id) => {
  setTransactions((prev) => prev.filter((t) => t.id !== id));
};

 return (
    <AppContext.Provider value={{ transactions, addTransaction, income, setIncome, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

// hook
export const useApp = () => useContext(AppContext);