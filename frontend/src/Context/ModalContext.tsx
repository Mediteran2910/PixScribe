import { createContext, useContext, useState, ReactNode } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  toggleModalVisibility: (modalName: string) => void;
  modals: ModalState;
};

type ModalState = {
  [key: string]: boolean;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState>({});

  const toggleModalVisibility = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: !prevModals[modalName],
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, toggleModalVisibility }}>
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
