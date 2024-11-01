import { useTotals } from '../../hooks/useTotals';
import TotalCard from '../TotalCard';

function TotalsArea() {
  const { everTotal, currentMonthTotal, lastMonthTotal } = useTotals();

  const totalItems = [
    {
      title: 'Total gasto',
      amount: everTotal,
      icon: 'GiPayMoney'
    },
    {
      title: 'Gastos nesse mês',
      amount: currentMonthTotal,
      icon: 'MdToday',
      iconColor: '#72DEF6'
    },
    {
      title: 'Gastos no mês passado',
      amount: lastMonthTotal,
      icon: 'MdCalendarMonth',
      iconColor: '#FFB26A'
    }
  ]
  

  return (
    <div className='flex gap-4'>
      {
        totalItems.map((item: any) => (
          <TotalCard 
            key={item.title}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            iconColor={item.iconColor}
          />
        ))
      }
    </div>
  )
}

export default TotalsArea;