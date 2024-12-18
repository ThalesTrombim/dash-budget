
import { useState } from 'react';

import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';

import style from './style.module.scss';
import IconsList from './components/IconsList';
import ColorList from './components/ColorList';

function AddCategory() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryIcon, setCategoryIcon] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  const newCategory = {
    name: categoryName,
    icon: categoryIcon,
    color: categoryColor
  }

  async function handleAddItem() {
    const { name, icon, color } = newCategory;
    const expenseCollection = collection(db, 'categories');
  
    await addDoc(expenseCollection, {
      name,
      icon,
      color
    })

    resetStates();
  }

  function resetStates() {
    setCategoryName('');
    setCategoryIcon('');
    setCategoryColor('');
  }

  function handleSubmit(e:any) {
    e.preventDefault();

    handleAddItem();
  }

  function handleSelectedIcon(icon: string) {
    setCategoryIcon(icon);
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

              <IconsList sendSelectedIcon={handleSelectedIcon} />
            </div>

            <button className={style.addCategorySubmitButton} type="submit">Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCategory