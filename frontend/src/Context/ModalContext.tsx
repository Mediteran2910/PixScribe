import { createContext, useContext, useState, ReactNode } from "react";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  showModal: boolean;
  toogleModalVisibility: () => void;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);

  const toogleModalVisibility = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ showModal, toogleModalVisibility }}>
      {children}
    </ModalContext.Provider>
  );
}

const useModalCtx = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalCtx must be used within a ModalProvider");
  }

  return context;
};

export default useModalCtx;
