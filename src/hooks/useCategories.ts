import { useContext, useEffect } from "react";

import { CategoriesContext } from "../contexts/CategoriesContext";
import { useExpenses } from "./useExpenses";

import { Category } from "../types/categories";
import { ExpenseFirebase } from "../types/expenses";

export const useCategory = () => {
  const { 
    categories,
    expensesByCategory,
    categoriesOrderByAmount,
    addNewCategory,
    updateExpensesByCategory,
    updateCategoriesOrderByAmount 
  } = useContext(CategoriesContext);

  const { expenses } = useExpenses();

  const totalByCategory = categories.map((category: Category) => {
    const total = expenses
      .filter((expense: ExpenseFirebase) => expense.category === category.name)
      .reduce((acc: number, expense: ExpenseFirebase) => acc + expense.amount, 0);
    
    return { category: category.name, icon: category.icon, total, color: category.color, lastExpense: category.lastExpense };
  });

  useEffect(() => {
    const orderedByAmount: any = [];
    const orderedByCategory: any = [];

    orderedByAmount.push(["Elemento", "Gasto", { role: "style" }]);
    
    totalByCategory.map((category: any) => {
      orderedByAmount.push([category.category, category.total, category.color]);
      orderedByCategory.push({name: category.category, icon: category.icon, totalAmount: category.total, fill: category.color, lastExpense: category.lastExpense })
    })
    
    updateCategoriesOrderByAmount(orderedByAmount);
    updateExpensesByCategory(orderedByCategory);
  
  }, [expenses, categories])

  return {
    categories,
    categoriesOrderByAmount,
    expensesByCategory,
    addNewCategory
  };
}