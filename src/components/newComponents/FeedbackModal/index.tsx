import { useEffect } from 'react'

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useFeedbackModal } from '../../../hooks/useFeedbackModal';
import { VscError } from "react-icons/vsc";


// TODO: Add feedback when delete expense;

function FeedbackModal() {
  const { setActive, isErrorFeedback } = useFeedbackModal();

  useEffect(() => {
    setTimeout(() => setActive(false), 2000);
  }, []);

  return (
    <div className='
      bg-black bg-opacity-30
      w-full h-full flex absolute items-center justify-center inset-0 animate-fadeInBackground
      p-4 md:p-0'
      onClick={() => setActive(false)}
      style={{ pointerEvents: "all" }}
    >
      <div className="bg-white p-6 rounded-md">
        {
          isErrorFeedback ? (
            <div className="flex gap-2 items-center animate-bounce-top-normal">
              <VscError color="red" size={32} />
              <h3>Ocorreu um erro ao adicionar o gasto. Tente novamente.</h3>
            </div>
          ) : (
            <div className="flex gap-2 items-center animate-bounce-top-normal">
              <IoMdCheckmarkCircleOutline color="green" size={32}  />
              <h3>Gasto adicionado com sucesso!</h3>
            </div>
          )
        }
      </div>
    </div>
  )
}

export { FeedbackModal };