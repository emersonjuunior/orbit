"use client";
import { ModalContext } from "@/providers/modal";
import { useContext, useRef, MouseEvent } from "react";

const Modal = () => {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      onClick={handleModalClick}
      className="absolute bg-gray-900/60 w-full min-h-screen"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold md:text-2xl">
              Detalhes do chamado
            </h2>
            <button
              onClick={handleModalVisible}
              className="bg-red-500 py-1 px-2 text-white rounded cursor-pointer hover:bg-red-600 duration-300"
            >
              Fechar
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h3 className="font-semibold">Nome:</h3>
            <p>{ticket?.ticket.name}</p>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="font-semibold">Descrição:</h3>
            <p>{ticket?.ticket.description}</p>
          </div>
          <div className="w-full border-b-1 my-4 border-gray-600"></div>
          <h2 className="text-lg font-semibold md:text-2xl mb-4">
            Detalhes do cliente
          </h2>
          <div className="flex flex-wrap gap-1 mb-2">
            <h3 className="font-semibold">Nome:</h3>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h3 className="font-semibold">Telefone:</h3>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h3 className="font-semibold">Email:</h3>
            <p>{ticket?.customer?.email}</p>
          </div>
          {ticket?.customer?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h3 className="font-semibold">Endereço:</h3>
              <p>{ticket.customer.address}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Modal;
