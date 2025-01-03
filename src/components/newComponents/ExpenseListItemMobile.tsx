import { convertNumberToBRL } from '../../utils/monetary';

import { FaTrashAlt } from "react-icons/fa";

type IProps = {
  name: string
  amount: number
  date: string
  paymentMethod?: string
  handleDeleteExpense: () => void;
}

function ExpenseListItem({ name, amount, date, paymentMethod, handleDeleteExpense } : IProps) {

  const treatedPaymentMethod = () => {
    if(paymentMethod == 'debit') return 'À vista';
    return 'Parcelado';
  }

  const formattedAmount = convertNumberToBRL(amount);
  
  return (
    <div className='flex rounded-md border border-solid border-[#dfe1e8] p-2 items-center text-xs gap-2'>
      <div className='flex flex-col gap-2 w-1/3'>
        <span>{ name }</span>
        <span>{ formattedAmount }</span>
      </div>

      <span className='w-1/3'>{ date }</span>
      <div className='flex w-1/3 items-center justify-between'>
        <span>{ treatedPaymentMethod() }</span>
        <FaTrashAlt color='6b7280' onClick={handleDeleteExpense} className='cursor-pointer hover:!text-red-600'/>
      </div>
    </div>
  )
}

export default ExpenseListItem;