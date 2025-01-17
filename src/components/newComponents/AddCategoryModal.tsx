import { useForm } from "react-hook-form";
import { InputForm } from "./AddExpenseModal/components/InputForm";
import { useCategory } from "../../hooks/useCategories";
import IconsList from "../AddCategory/components/IconsList";

type FormValues = {
  name: string;
  icon: string;
};

function AddCategoryModal({ onClose }: { onClose: () => void; }) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>();

  const { addNewCategory } = useCategory();

  function handleSubmitLocal(e: any): void {
    addNewCategory(e);
    resetForm();
  }

  function handleSelectedIcon(icon: string) {
    setValue('icon', icon)
  }

  function resetForm() {
    reset();
    onClose();
    setValue('icon', '');
  }

  return (
    <div className='
      bg-black bg-opacity-30 
      w-full flex fixed items-center justify-center inset-0.5 animate-fadeInBackground
      p-4 md:p-0 h-full'
      onClick={onClose}
      style={{ pointerEvents: "all", zIndex: 1000 }}
    >
      <form style={{ pointerEvents: "auto" }} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(handleSubmitLocal)} className='bg-white p-8 rounded-md w-full md:w-1/3 animate-fadeInUpFaster'>
        <h3 className="text-lg">
          Adicionar gasto
        </h3>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <InputForm errors={errors.name} {...register("name", { required: "O nome é obrigatório." })} label="Nome" placeholder="Digite o nome" />
          </div>

          <div className="text-start flex flex-col gap-4 mt-4">
            <label htmlFor="" className="text-sm text-slate-600">Escolha um icone</label>
            <IconsList {...register("icon", { required: "É obrigatório escolher um icone." })} sendSelectedIcon={(item) => handleSelectedIcon(item)} />
            {errors.icon && <span className="text-red-500 text-xs mt-2 text-start">{errors.icon.message}</span>}
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

export { AddCategoryModal };
