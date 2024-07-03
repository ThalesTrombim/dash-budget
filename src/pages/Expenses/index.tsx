import ExpenseCategory from '../../components/ExpenseCategory'

// const categories = [
//   {
//     name: 'Eletro',
//     color: '#ED820E'
//   },
//   {
//     name: 'Decor',
//     color: '#ED820E'
//   },
//   {
//     name: 'Revestimento',
//     color: '#ED820E'
//   },
//   {
//     name: 'Marcenaria',
//     color: '#ED820E'
//   }
// ]


function Expenses({categories}: any) {

  console.log(categories)

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