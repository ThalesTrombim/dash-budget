import { createContext, ReactNode, useEffect, useState } from "react";

import { Category } from "../types/categories";
import { useFirebaseMethods } from "../hooks/useFirebaseMethods";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

interface CategoriesContext {
  categories: any[];
  categoriesOrderByAmount: any;
  expensesByCategory: any;
  addNewCategory: (newCategory: { name: string; icon: string }) => void;
  updateCategoriesOrderByAmount: (value: any) => void;
  updateExpensesByCategory: (value: any) => void;
  deleteCategory: (category: string) => void;
}

export const CategoriesContext = createContext({} as CategoriesContext)

// TODO: Criar função padrão para bater no firebase;

function CategoriesContextProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category []>([]);
  const [categoriesOrderByAmount, setCategoriesOrderByAmount] = useState<Category []>();
  const [expensesByCategory, setExpensesByCategory] = useState<Category []>([]);

  const { getCollectionData, AddFirebaseDoc } = useFirebaseMethods();

  function updateCategoriesOrderByAmount(value: Category[]): void {
    setCategoriesOrderByAmount(value);
  }

  function updateExpensesByCategory(value: Category[]): void {
    setExpensesByCategory(value);
  }

  async function addNewCategory(newCategory: { name: string; icon: string }){
    const res = await AddFirebaseDoc('categories', newCategory);
    console.log('res', res);
    
    await updateDoc(doc(db, "categories", res.id), {
      categoryId: res.id,
    });

    setCategories((prevCategories: any) => [...prevCategories, newCategory]);
  }

  async function deleteCategory(id: string): Promise<void> {
    await deleteDoc(doc(db, 'categories', id));
    
    setCategories(categories.filter(category => category.categoryId!== id));
  }
  
  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCollectionData('categories');
      
      setCategories(data);
    }
    if(!categories.length) getCategoriesFirestore();
  }, [])

  return (
    <CategoriesContext.Provider value={{
      categories,
      categoriesOrderByAmount,
      // totalByCategory,
      expensesByCategory,
      addNewCategory,
      updateCategoriesOrderByAmount,
      updateExpensesByCategory,
      deleteCategory
    }}>
      { children }
    </CategoriesContext.Provider>
  )

}

export { CategoriesContextProvider };