import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { useExpenses } from "./useExpenses";

export const useCategory = () => {
  const [categories, setCategories] = useState<any>([]);
  const [categoriesByAmount, setCategoriesByAmount] = useState<any>();

  const { expenses } = useExpenses();

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
  
    return data;
  }

  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCategories();
      
      setCategories(data);
    }

    getCategoriesFirestore();
  }, [])


  const totalByCategory = categories.map((categoria: any) => {
    const total = expenses
      .filter((produto: any) => produto.category === categoria.name)
      .reduce((acc: any, produto: any) => acc + produto.amount, 0);
    
    return { categoria: categoria.name, total, color: categoria.color };
  });

  useEffect(() => {
    const data: any = [];
    data.push(["Elemento", "Gasto", { role: "style" }]);
    
    totalByCategory.map((category: any) => {
      data.push([category.categoria, category.total, category.color])
    })
    
    setCategoriesByAmount(data);
  
  }, [expenses, categories])

  return {
    categories,
    categoriesByAmount
  }

}