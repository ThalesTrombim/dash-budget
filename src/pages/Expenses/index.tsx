import ExpenseCategory from '../../components/ExpenseCategory'

function Expenses({categories}: any) {

  return (
    <>
      {
        categories.map((category: any) => (
          <div key={category.name}>
            <ExpenseCategory name={category.name} color={category.color} icon={category.icon} />
          </div>
        ))
      }
      
    </>
  )
}

export default Expenses