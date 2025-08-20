"use client";
import Modal from "@/components/Modal";
import { ICustomer } from "@/interfaces/Customer";
import { ITicket } from "@/interfaces/Ticket";
import { createContext, ReactNode, useState } from "react";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setTicket: React.Dispatch<React.SetStateAction<TicketInfo | undefined>>;
  setTicketDetails: (detail: TicketInfo) => void;
}

interface TicketInfo {
  customer: ICustomer | null;
  ticket: ITicket;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  const handleModalVisible = () => {
    setVisible((prev) => !prev);
  };

  const setTicketDetails = (detail: TicketInfo) => {
    setTicket(detail);
  };

  return (
    <ModalContext.Provider
      value={{
        visible,
        handleModalVisible,
        ticket,
        setTicket,
        setTicketDetails,
      }}
    >
      {visible && <Modal />}
      {children}
    </ModalContext.Provider>
  );
};
