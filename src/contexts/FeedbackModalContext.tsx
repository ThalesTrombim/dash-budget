import { createContext, useState } from "react";
interface ISuccessModalContext {
  active: boolean,
  setActive: Function
}

export const FeedbackModalContext = createContext<any>({} as any)

export const FeedbackModalProvider = ({children}: {children: any}) => {
  const [active, setActive] = useState(false);
  const [isErrorFeedback, setIsErrorFeedback] = useState(false);

  return (
    <FeedbackModalContext.Provider value={{ active, isErrorFeedback, setActive, setIsErrorFeedback }}>
      {children}
    </FeedbackModalContext.Provider>
  )
}