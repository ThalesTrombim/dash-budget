import { convertNumberToBRL } from '../../utils/monetary';
import DynamicCategoryIcon from '../DynamicIcon/DynamicCategoryIcon';

import { FaTrashAlt } from "react-icons/fa";

type IProps = {
  name: string
  amount: number
  date: string
  paymentMethod?: string
  category: string
  handleDeleteExpense: () => void;
}

function ExpenseListItem({ name, amount, date, paymentMethod, category, handleDeleteExpense } : IProps) {

  const treatedPaymentMethod = () => {
    if(paymentMethod == 'debit') return 'Pagamento à vista';
    return 'Pagamento parcelado';
  }

  const formattedAmount = convertNumberToBRL(amount);
  
  return (
    <div className='flex rounded-md border border-solid border-[#dfe1e8] md:p-4 items-center '>
      <div className='flex gap-2 w-1/3'>
        <DynamicCategoryIcon icon={category} color='6b7280'/>
        <span>{ name }</span>
      </div>
      <span className='w-1/5'>{ formattedAmount }</span>
      <span className='w-1/5'>{ date }</span>
      <div className='flex w-1/4 items-center justify-between'>
        { paymentMethod && <span>{ treatedPaymentMethod() }</span> }
        <FaTrashAlt color='6b7280' onClick={handleDeleteExpense} className='cursor-pointer hover:!text-red-600 hover:scale-110'/>
      </div>
    </div>
  )
}

export default ExpenseListItem;