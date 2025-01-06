import { MdWarningAmber } from "react-icons/md";

function ConfirmationModal({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) {
  return (
    <div className='
      bg-black bg-opacity-30 
      w-full h-full flex absolute items-center justify-center inset-0
      p-4 md:p-0'
      onClick={onClose}
      style={{ pointerEvents: "all" }}
    >
      <div className="bg-white p-6 rounded-md">
        <div className="flex gap-2 items-center">
          <MdWarningAmber color="red" size={32} />
          <h3>Tem certeza que deseja excluir esse gasto?</h3>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="button" onClick={onClose} className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md w-full">Cancelar</button>
          <button type="button" onClick={onConfirm} className="bg-[#144bff] hover:bg-[#123ee5] text-white py-2 px-4 rounded-md w-full">Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal