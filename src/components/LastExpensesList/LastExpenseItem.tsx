import { dateToPTBR } from '../../utils/date';
import { convertNumberToBRL } from '../../utils/monetary';
import DynamicCategoryIcon from '../DynamicIcon/DynamicCategoryIcon';

interface IProps {
  index: number
  name: string
  date: string
  amount: number,
  category: string
}

function LastExpenseItem({ index, name, date, amount, category }: IProps ) {
  return (
    <div className={` flex items-center justify-between border-t border-t-[#f0f0f5] p-2 ${index > 0 ? 'border-solid' : ''}`}>
      <div className="flex items-center gap-3">
        <div>
          <DynamicCategoryIcon icon={category} color="#6B7280" size={16} />
        </div>

        <div className="flex flex-col text-start">
          <span className="text-sm text-ellipsis">{ name }</span>
          <span className="text-xs">{ dateToPTBR(date) }</span>
        </div>
      </div>

      <span className="text-xs">{ convertNumberToBRL(amount) }</span>
    </div>
  )
}

export default LastExpenseItem;