import { useExpenses } from "../../hooks/useExpenses";
import LastExpenseItem from "./LastExpenseItem";

function LastExpensesList() {
  const { lastExpenses } = useExpenses();

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 shadow-md">
      <ul className="w-full">
        {
          lastExpenses.map((expense: any, index: number) => (
            <LastExpenseItem key={index} {...expense } index={index}/>
          ))
        }
      </ul>
    </div>
  )
}

export default LastExpensesList;