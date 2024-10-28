import { useEffect, useState } from "react";
import { useExpenses } from "./useExpenses";
import { convertNumberToBRL } from "../utils/monetary";

export const useTotals = () => {
  const [everTotal, setEverTotal] = useState<any>(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState<any>(null);
  const [lastMonthTotal, setLastMonthTotal] = useState<any>(null);
  const { expenses } = useExpenses();

  async function getEverTotal() {
    const totalSum = expenses.reduce((accumulator: any, item: any) => {
      return accumulator + item.amount;
    }, 0);

    setEverTotal(convertNumberToBRL(totalSum));
  }

  async function getCurrentMonthTotal() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const expensesCurrentMonth =  expenses.filter((item: any) => {
      const [day, month, year] = item.date.split("-").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    });

    const totalSum = expensesCurrentMonth.reduce((accumulator: any, item: any) => {
      return accumulator + item.amount;
    }, 0);

    setCurrentMonthTotal(convertNumberToBRL(totalSum));
  }

  async function getLastMonthTotal() {
    const currentDate = new Date();
    let previousMonth = currentDate.getMonth() - 1;
    let previousYear = currentDate.getFullYear();

    if (previousMonth < 0) {
      previousMonth = 11; 
      previousYear -= 1;
    }

    const lastMonthTotal = expenses.filter((item: any) => {
      const [day, month, year] = item.date.split("-").map(Number);
      return month - 1 === previousMonth && year === previousYear;
    });

    const totalSum = lastMonthTotal.reduce((accumulator: any, item: any) => {
      return accumulator + item.amount;
    }, 0);

    setLastMonthTotal(convertNumberToBRL(totalSum));
  }

  useEffect(() => {
    getEverTotal();
    getCurrentMonthTotal();
    getLastMonthTotal();
  }, [expenses])
  
  return {
    everTotal,
    currentMonthTotal,
    lastMonthTotal
  }
}