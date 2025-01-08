import { useEffect, useState } from "react";
import { useCategory } from "../../../hooks/useCategories";
import { ICategory } from "../../../types/categories";
import { InputForm } from "../AddExpenseModal/components/InputForm";
import { useExpenses } from "../../../hooks/useExpenses";
import { useForm } from "react-hook-form";
import { convertDateToISO, getTodayDate } from "../../../utils/date";

type FormValues = {
  name: string;
  category: string;
  date: string;
  amount: number;
  paymentMethod: string;
};

type IProps = {
  id: string;
  name: string;
  expenseCategory: string;
  oldDate: string;
  oldAmount: number;
  paymentMethod: 'debit' | 'credit';
  onClose: () => void;
}

// TODO: check date validation from add new expense modal

function EditExpenseModal({ id, name, expenseCategory, oldDate, oldAmount, paymentMethod, onClose }: IProps) {
  const [newName, setNewName] = useState<string>(name);
  const [category, setCategory] = useState<string>(expenseCategory);
  const [date, setDate] = useState<string>(oldDate);

  const [amount, setAmount] = useState<number | string | null>(oldAmount);
  const [newToday, setNewToday] = useState<boolean>(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState<'debit' | 'credit'>(paymentMethod);

  const { categories } = useCategory();
  const { updateExpense } = useExpenses();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      amount: oldAmount,
    },
  });

  useEffect(() => {
    console.log("expenseCategory", expenseCategory)
    setValue("category", expenseCategory); // Atualiza o valor do select via props
  }, [expenseCategory, setValue, categories]);
 
  function handleSubmitLocal(e: any): void {
    console.log('id', e);
    updateExpense(id, e, resetForm);
  }

  function resetForm() {
    reset();
    setAmount(null);
    setDate('');
    onClose();
  }

  function handleTodayCheckbox(checked: boolean): void {
    if(checked) {
      setNewToday(true);
      setDate(getTodayDate());
      setValue('date', new Date().toISOString().split('T')[0]);
    } else {
      setDate(date);
    }
  }

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
          Editar gasto
        </h3>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <InputForm errors={errors.name} {...register("name", { required: "O nome é obrigatório." })} value={newName} label="Nome" placeholder="Digite o nome" handleChange={(e) => setNewName(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <InputForm errors={errors.amount} value={amount} {...register("amount", { required: "O valor é obrigatório." })} label="Valor" type="monetary" />
          </div>

          <div className="flex flex-col text-start">
            <label className="block mb-2 text-sm text-slate-600">
              Categoria
            </label>
            <select
              {...register("category", { required: "A categoria é obrigatória." })} 
              className={`${errors.category && 'border-red-500'} bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
            >
              <option value='' disabled>Categorias</option>
              {categories.map((category: ICategory) => (
                <option value={category.name} key={category.name}>{category.name}</option>
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
                <input checked={ newPaymentMethod === 'debit'} {...register("paymentMethod", { required: "Escolha a forma de pagamento." })} value="debit" onChange={() => setNewPaymentMethod('debit')} type="radio"/>
                Á vista
              </label>
              <label className="flex gap-2">
                <input checked={ newPaymentMethod === 'credit'} {...register("paymentMethod", { required: "Escolha a forma de pagamento." })} value="credit" onChange={() => setNewPaymentMethod('credit')} type="radio"/>
                Parcelado
              </label>
            </div>

            {errors.paymentMethod && <span className="text-red-600 font-medium text-xs mt-2 text-start">{errors.paymentMethod.message}</span>}
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button type="button" onClick={onClose} className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md w-full">Cancelar</button>
            <button type="submit" className="bg-[#144bff] hover:bg-[#123ee5] text-white py-2 px-4 rounded-md w-full">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { EditExpenseModal };
