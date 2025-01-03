import { createContext, useState } from "react";

interface ISuccessModalContext {
  active: boolean,
  setActive: Function
}

export const SuccessModalContext = createContext<ISuccessModalContext>({
  active: false,
  setActive: () => {}
})

export const SuccessModalProvider = ({children}: {children: any}) => {
  const [active, setActive] = useState(false);

  return (
    <SuccessModalContext.Provider value={{ active, setActive }}>
      {children}
    </SuccessModalContext.Provider>
  )
}