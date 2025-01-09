import { convertNumberToBRL } from '../../utils/monetary';
import DynamicCategoryIcon from '../DynamicIcon/DynamicCategoryIcon';
import { HiPencil } from "react-icons/hi";

import { FaTrashAlt } from "react-icons/fa";
import { formatDateToPTBR } from '../../utils/date';

type IProps = {
  name: string
  icon: string
  totalAmount: number
  lastExpenseName?: string
  // lastExpenseDate: string
  // handleDeleteExpense: () => void;
  // handleEdit: () => void;
}

function CategoryListItem({ name, icon, totalAmount, lastExpenseName } : IProps) {

  const formattedAmount = convertNumberToBRL(totalAmount);
  
  return (
    <div className='flex rounded-md border border-solid border-[#dfe1e8] md:p-4 items-center '>
      <HiPencil onClick={() => console.log('Edit click')} color='6b7280' size={20} className='cursor-pointer hover:!text-[#123ee5] hover:scale-125' />

      <div className='flex gap-2 w-1/3 ml-4'>
        <DynamicCategoryIcon icon={icon} color='6b7280'/>
        <span>{ name }</span>
      </div>
      <span className='w-1/5'>{ formattedAmount }</span>
      <span className='w-1/5'>{ formatDateToPTBR('2025-01-08') }</span>
      {/* <span className='w-1/5'>{ formatDateToPTBR(lastExpenseDate) }</span> */}
      <div className='flex w-1/4 items-center justify-between'>
        <span>{ lastExpenseName }</span>
        <FaTrashAlt color='6b7280' onClick={() => console.log('Delete click')} className='cursor-pointer hover:!text-red-600 hover:scale-110'/>
      </div>
    </div>
  )
}

export { CategoryListItem };