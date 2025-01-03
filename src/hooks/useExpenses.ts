import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";

export function useExpenses() {
	const value = useContext(ExpensesContext);

	return value;
}