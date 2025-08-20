"use client";

import { ICustomer } from "@/interfaces/Customer";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const CustomerCard = ({ customer }: { customer: ICustomer }) => {
  const router = useRouter();

  const handleDeleteCustomer = async () => {
    try {
      await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex flex-col bg-gray-100 border-gray-400 border-1 p-2 rounded-lg gap-2 duration-300 hover:bg-gray-200">
      <h2>
        <span className="font-medium">Nome:</span> {customer.name}
      </h2>
      <p>
        <span className="font-medium">Email:</span> {customer.email}
      </p>
      <p>
        <span className="font-medium">Telefone:</span> {customer.phone}
      </p>
      <button
        onClick={handleDeleteCustomer}
        className="cursor-pointer bg-red-500 duration-300 hover:bg-red-600 py-1 px-4 rounded text-white mt-2 self-start"
      >
        Deletar
      </button>
    </article>
  );
};

export default CustomerCard;
