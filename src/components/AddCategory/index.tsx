
import { useState } from 'react';

import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';

import style from './style.module.scss';
import IconsList from './components/IconsList';
import ColorList from './components/ColorList';

function AddCategory() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [expenseIcon, setExpenseIcon] = useState<string>('');

  const newExpense = {
    name: categoryName,
    icon: expenseIcon,
  }

  async function handleAddItem() {
    const { name, icon } = newExpense;
    const expenseCollection = collection(db, 'categories');
  
    await addDoc(expenseCollection, {
      name,
      icon
    })

    resetStates();
  }

  function resetStates() {
    setCategoryName('');
    setExpenseIcon('')
  }

  function handleSubmit(e:any) {
    e.preventDefault();

    handleAddItem();
  }

  return (
    <div className={style.addCategoryContainer}>
      <div className={style.addCategoryContent}>

        <div className={style.addCategoryFormArea}>
          <h3>Adicionar categoria</h3>

          <form onSubmit={handleSubmit} className={style.addCategoryInputs}>
            <div className={style.addCategoryInput}>
              <label htmlFor="item_name">Nome</label>
              <input 
                type="text" 
                name="item_name" 
                id="item_name" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className={style.addCategoryIcon}>
              <div className={style.addCategoryIconText}>
                <p>Icone</p>
              </div>

              <IconsList />
            </div>

            <div className={style.addCategoryColor}>
              <div className={style.addCategoryColorText}>
                <p>Cor</p>
              </div>

              <ColorList />
            </div>

            <button className={style.addCategorySubmitButton} type="submit">Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCategory