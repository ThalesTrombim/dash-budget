import { useContext, useEffect } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { parseDate } from "../utils/date";

export function useExpenses() {
	const { 
		expenses,
		lastExpenses,
		addNewExpense,
		deleteExpense,
		updateExpense,
		updateLastExpenses
	 } = useContext(ExpensesContext);

	function getLastFiveExpenses(expenses: any) {
    const lastFiveExpenses = expenses
      .sort((a: any, b: any) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) // Ordena do mais recente para o mais antigo
      .slice(0, 5);

    updateLastExpenses(lastFiveExpenses);
  }

	useEffect(() => {
		getLastFiveExpenses(expenses);
	}, [expenses])

	return {
		expenses,
		lastExpenses,
		addNewExpense,
		deleteExpense,
		updateExpense,
		updateLastExpenses
	};
}