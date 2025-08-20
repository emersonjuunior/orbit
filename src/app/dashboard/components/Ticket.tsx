"use client";

import { FiCheckSquare, FiFile } from "react-icons/fi";
import { ITicket } from "@/interfaces/Ticket";
import { ICustomer } from "@/interfaces/Customer";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketProps {
  ticket: ITicket;
  customer: ICustomer | null;
}

const Ticket = ({ customer, ticket }: TicketProps) => {
  const router = useRouter();
  const { handleModalVisible, setTicketDetails } = useContext(ModalContext);

  const handleChangeStatus = async () => {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    handleModalVisible();
    setTicketDetails({ customer: customer, ticket: ticket });
  };

  return (
    <>
      <tr className="border-b-2 border-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="cursor-pointer mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#151515" />
          </button>
          <button onClick={handleOpenModal} className="cursor-pointer">
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Ticket;
