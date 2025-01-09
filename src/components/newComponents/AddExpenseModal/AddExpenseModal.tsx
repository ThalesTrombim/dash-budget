import { useEffect, useState } from "react";
import { useCategory } from "../../../hooks/useCategories";
import { ICategory } from "../../../types/categories";
import { InputForm } from "./components/InputForm";
import { useExpenses } from "../../../hooks/useExpenses";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  category: string;
  date: string;
  amount: number;
  paymentMethod: string;
};



function AddExpenseModal({ onClose }: { onClose: () => void; }) {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<number | string | null>();
  const [today, setToday] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'credit'>('debit');

  const [categoryId, setCategoryId] = useState<any>('');

  const { categories } = useCategory();
  const { addNewExpense } = useExpenses();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>();

  function handleSubmitLocal(e: any): void {
    addNewExpense(e, categoryId, resetForm);
  }

  function resetForm() {
    reset();
    setAmount(null);
    setDate('');
    onClose();
  }

  function handleTodayCheckbox(checked: boolean): void {
    if(checked) {
      setToday(true);
      setDate(new Date().toISOString().split('T')[0]);
      setValue('date', new Date().toISOString().split('T')[0]);
    } else {
      setDate('');
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value; // Obtém o categoryName do valor do select
    const selectedCategory = categories.find((c: any) => c.name === selectedValue); // Encontra o objeto da categoria correspondente


    console.log('selectedCategory', selectedCategory);

    if (selectedCategory) {
      console.log('here', );
      setValue("category", selectedValue); // Atualiza o categoryName no React Hook Form
      setCategoryId(selectedCategory.categoryId); // Atualiza o categoryId no outro estado
    }
  };

  useEffect(() => {
    console.log('Changing', categoryId);
  }, [categoryId])
  

  return (
    <div className='
      bg-black bg-opacity-30 
      w-full h-full flex absolute items-center justify-center inset-0 animate-fadeInBackground
      p-4 md:p-0'
      onClick={onClose}
      style={{ pointerEvents: "all" }}
    >
      <form style={{ pointerEvents: "auto" }} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(handleSubmitLocal)} className='bg-white p-8 rounded-md w-full md:w-1/3 animate-fadeInUpFaster'>
        <h3 className="text-lg">
          Adicionar gasto
        </h3>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <InputForm errors={errors.name} {...register("name", { required: "O nome é obrigatório." })} label="Nome" placeholder="Digite o nome" handleChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <InputForm errors={errors.amount} value={amount} {...register("amount", { required: "O valor é obrigatório." })} label="Valor" type="monetary" />
          </div>

          <div className="flex flex-col text-start">
            <label className="block mb-2 text-sm text-slate-600">
              Categoria
            </label>
            <select 
              defaultValue=''
              {...register("category", { required: "A categoria é obrigatória." })} 
              onChange={(e) => {handleCategoryChange(e)}}
              className={`${errors.category && 'border-red-500'} bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
            >
              <option value='' disabled>Categorias</option>
              {categories.map((category: ICategory) => (
                <option id={category.categoryId} key={category.name} value={category.name} >{category.name}</option>
              ))}
            </select>
            {errors.category && <span className="text-red-600 font-medium text-xs mt-2 text-start">{errors.category.message}</span>}
          </div>

          <div className="flex flex-col items-start">
            <InputForm errors={errors.date} {...register("date", { required: "A data é obrigatória." })} value={date} label="Data" type="date" handleChange={(e) => setDate(e.target.value)} />

            <label htmlFor="checkbox-today" className="flex gap-2 mt-2">
              <input onChange={(e) => handleTodayCheckbox(e.target.checked)} type="checkbox" id="checkbox-today" />
              Hoje?
            </label>
          </div>

          <div className="flex flex-col items-start">
            <span className="block mb-2 text-sm text-slate-600">
              Forma de pagamento
            </span>

            <div>
              <label className="flex gap-2">
                <input {...register("paymentMethod", { required: "Escolha a forma de pagamento." })} value="debit" onChange={() => setPaymentMethod('debit')} type="radio"/>
                Á vista
              </label>
              <label className="flex gap-2">
                <input {...register("paymentMethod", { required: "Escolha a forma de pagamento." })} value="credit" onChange={() => setPaymentMethod('credit')} type="radio"/>
                Parcelado
              </label>
            </div>

            {errors.paymentMethod && <span className="text-red-600 font-medium text-xs mt-2 text-start">{errors.paymentMethod.message}</span>}
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md w-full">Cancelar</button>
            <button type="submit" className="bg-[#144bff] hover:bg-[#123ee5] text-white py-2 px-4 rounded-md w-full">Adicionar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { AddExpenseModal };
