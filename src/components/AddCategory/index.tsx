import { useState } from "react";

import { GoPlus } from "react-icons/go";
import { useExpenses } from "../../hooks/useExpenses";
import ConfirmationModal from "../newComponents/ConfirmationModal";
import { useFeedbackModal } from "../../hooks/useFeedbackModal";
import { FeedbackModal } from "../newComponents/FeedbackModal";
import { EditExpenseModal } from "../newComponents/EditExpenseModal/EditExpenseModal";
import { useCategory } from "../../hooks/useCategories";
import { CategoryListItem } from "../newComponents/CategoryListItem";
import { AddCategoryModal } from "../newComponents/AddCategoryModal";

// TODO: Adicionar state para exibir as categorias com os dados que esse componente pede.

function CategoriesView() {
  const { expenses, deleteExpense } = useExpenses();
  const { categories, expensesByCategory } = useCategory();
  
  const { active } = useFeedbackModal();

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState<boolean>(false);
  const [isConfirmationDeleteModalOpen, setIsConfirmationDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState('');
  const [selectedExpense, setSelectedExpense] = useState<any>();

  const { deleteCategory } = useCategory();
  function handleDelete(expenseId: string) {
    deleteCategory(expenseId);
  }

  // TODO: Ao remover uma categoria, remover todos os gastos dela

  return (
    <>
      {
        isAddExpenseModalOpen && <AddCategoryModal onClose={() => setIsAddExpenseModalOpen(false)} />
      }

      {
        isConfirmationDeleteModalOpen && <ConfirmationModal onClose={() => setIsConfirmationDeleteModalOpen(false)} onConfirm={() => deleteExpense(selectedExpenseId)} />
      }

      {
        isEditModalOpen && 
        <EditExpenseModal
          id={selectedExpense.id}
          name={selectedExpense.name}
          expenseCategory={selectedExpense.category}
          oldAmount={selectedExpense.amount}
          oldDate={selectedExpense.date}
          paymentMethod={selectedExpense.paymentMethod}
          onClose={() => setIsEditModalOpen(false)}
        />
      }

      {
        active && <FeedbackModal />
      }

      <div className="flex w-full h-full bg-[#f7f7f7]">

        <div className="flex flex-col w-full rounded-md border bg-white p-2 md:p-4 shadow-md">

          {/* HEADER */}
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-bold text-start mb-6">Categorias</h2>
            <div className="flex justify-between w-full">
              <div className="flex w-full justify-end items-end">

                <button className="bg-[#144bff] hover:bg-[#123ee5] text-white py-2 px-4 rounded-md flex gap-2" onClick={() => setIsAddExpenseModalOpen(true)}>
                  <GoPlus className="h-6 w-6 text-white" />
                  <span>Adicionar Categoria</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <ul className="flex items-center bg-gray-100 rounded-md shadow-md p-4 mt-6 text-start text-sm select-none">
              <li className="flex items-center w-1/3">Nome</li>
              <li className="flex items-center w-1/5">Total gasto</li>
              <li className="flex items-center w-1/5">Nome da ultima despesa</li>
              <li className="flex items-center w-1/4">Data da ultima despesa</li>
            </ul>
          </div>

          {/* BODY */}
          <div className="mt-8">
            <ul className="flex-col text-start gap-2 hidden md:flex">
              {
                expensesByCategory.map((category: any) => 
                  (
                  // return category.totalAmount > 0 ? (
                    <CategoryListItem
                      name={category.name}
                      icon={category.icon}
                      totalAmount={category.totalAmount}
                      lastExpenseName={category.lastExpense?.name}
                      lastExpenseDate={category.lastExpense?.date}
                      handleDeleteCategory={() => handleDelete(category.categoryId)}
                    />
                  // ) : null
                  )
              )
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export { CategoriesView };