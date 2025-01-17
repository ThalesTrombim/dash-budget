import { convertNumberToBRL } from '../../utils/monetary';
import DynamicCategoryIcon from '../DynamicIcon/DynamicCategoryIcon';

import { FaTrashAlt } from "react-icons/fa";
import { formatDateToPTBR } from '../../utils/date';

type IProps = {
  name: string
  icon: string
  totalAmount: number
  lastExpenseName?: string
  lastExpenseDate?: string
  handleDeleteCategory: () => void;
}

function CategoryListItem({ name, totalAmount, lastExpenseName, lastExpenseDate, handleDeleteCategory } : IProps) {

  const formattedAmount = convertNumberToBRL(totalAmount);

  return (
    <div className='flex rounded-md border border-solid border-[#dfe1e8] md:p-4 items-center '>
      <div className='flex gap-2 w-1/3'>
        <DynamicCategoryIcon icon={name} className='000'/>
        <span>{ name }</span>
      </div>
      <span className='w-1/5'>{ formattedAmount }</span>
      <span className='w-1/5'>{ lastExpenseName }</span>
      <div className='flex w-1/4 items-center justify-between'>
        {
          lastExpenseDate &&
          <span>{formatDateToPTBR(lastExpenseDate)}</span>
        }
        {
          totalAmount === 0 &&
          <FaTrashAlt color='6b7280' onClick={handleDeleteCategory} className='cursor-pointer hover:!text-red-600 hover:scale-110'/>
        }
      </div>
    </div>
  )
}

export { CategoryListItem };