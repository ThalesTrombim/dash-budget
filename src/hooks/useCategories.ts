import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { useExpenses } from "./useExpenses";

export const useCategory = () => {
  const [categories, setCategories] = useState<any>([]);
  const [categoriesByAmount, setCategoriesByAmount] = useState<any>();
  const [colorsOnly, setColorsOnly] = useState<any>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<any>([]);

  const [categoriesWithAmount, setCategoriesWithAmount] = useState<any>([]);

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


  const totalByCategory = categories.map((category: any) => {
    const total = expenses
      .filter((produto: any) => produto.category === category.name)
      .reduce((acc: any, produto: any) => acc + produto.amount, 0);
    
    return { category: category.name, total, color: category.color, lastExpense: category.lastExpense };
  });

  const groupAndSumByMonthAndYear = (arr: any) => {
    const grouped = arr.reduce((acc: any, current: any) => {
      // Extrair ano, mês e dia da string de data "YYYY-MM-DD"
      const [year, month, day] = current.date.split('-');
  
      // Criar a chave no formato MM-YYYY
      const key = `${month}-${year}`;
  
      // Se a chave não existir, inicializa o total para 0
      if (!acc[key]) {
        acc[key] = { month: `${month}-${year}`, totalAmount: 0 };
      }
  
      // Somar o amount ao total do mês correspondente
      acc[key].totalAmount += current.amount;
  
      return acc;
    }, {});
  
    return Object.values(grouped).sort((a: any, b: any) => {
      const [monthA, yearA] = a.month.split('-').map(Number); // Separar e converter para número
      const [monthB, yearB] = b.month.split('-').map(Number);
  
      // Comparar os anos, depois comparar os meses se os anos forem iguais
      return yearA - yearB || monthA - monthB;
    });
  };

  useEffect(() => {
    const data: any = [];
    data.push(["Elemento", "Gasto", { role: "style" }]);
    
    totalByCategory.map((category: any) => {
      data.push([category.categoria, category.total, category.color])
    })
    
    const colors = data.slice(1).map((item: any) => item[2]);

    setColorsOnly(colors);
    setCategoriesByAmount(data);
  
  }, [expenses, categories])


  // useEffect(() => {
  //   const data: any = [];
    
  //   totalByCategory.map((category: any) => {
  //     data.push({name: category.categoria, totalAmount: category.total, fill: category.color})
  //   })
    
  //   setExpensesByCategory(data);
  // }, [expenses, categories])


  useEffect(() => {
    const data: any = [];
    
    totalByCategory.map((category: any) => {
      data.push({name: category.category, totalAmount: category.total, fill: category.color, lastExpense: category.lastExpense })
    })
    
    setExpensesByCategory(data);
  }, [expenses, categories])

  return {
    categories,
    colorsOnly,
    categoriesByAmount,
    expensesByCategory,
    groupAndSumByMonthAndYear
  }

}