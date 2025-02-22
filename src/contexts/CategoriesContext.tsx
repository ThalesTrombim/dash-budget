import { createContext, ReactNode, useEffect, useState } from "react";

import { Category } from "../types/categories";
import { useFirebaseMethods } from "../hooks/useFirebaseMethods";

interface CategoriesContext {
  categories: any[];
  categoriesOrderByAmount: any;
  expensesByCategory: any;
  updateCategoriesOrderByAmount: (value: any) => void;
  updateExpensesByCategory: (value: any) => void;
}

export const CategoriesContext = createContext({} as CategoriesContext)

// TODO: Criar função padrão para bater no firebase;

function CategoriesContextProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category []>([]);
  const [categoriesOrderByAmount, setCategoriesOrderByAmount] = useState<Category []>();
  const [expensesByCategory, setExpensesByCategory] = useState<Category []>([]);

  const { getCollectionData } = useFirebaseMethods();

  function updateCategoriesOrderByAmount(value: Category[]): void {
    setCategoriesOrderByAmount(value);
  }

  function updateExpensesByCategory(value: Category[]): void {
    setExpensesByCategory(value);
  }

  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCollectionData('categories');
      
      setCategories(data);
    }
    if(!categories.length) getCategoriesFirestore();
  }, [])

  return (
    <CategoriesContext.Provider value={{
      categories,
      categoriesOrderByAmount,
      // totalByCategory,
      expensesByCategory,
      updateCategoriesOrderByAmount,
      updateExpensesByCategory
    }}>
      { children }
    </CategoriesContext.Provider>
  )

}

export { CategoriesContextProvider };