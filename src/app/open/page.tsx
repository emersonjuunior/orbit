"use client";
import Input from "@/components/Input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import FormTicket from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar.")
    .min(1, "O campo email é obrigatório."),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

const OpenTicket = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const handleClearCustomer = () => {
    setCustomer(null);
    setValue("email", "");
  };

  const handleSearchCustomer = async (data: FormData) => {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", {
        type: "custom",
        message: "Ops, cliente não foi encontrado!",
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  };

  return (
    <main className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24 mb-4">
        Abrir chamado
      </h1>
      {customer ? (
        <>
          <section className="px-2 sm:px-4 py-4 sm:py-6 rounded bg-slate-100 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button
              onClick={handleClearCustomer}
              className="bg-red-600 cursor-pointer px-2 h-10 items-center justify-center flex"
            >
              <FiX size={24} color="#FFF" />
            </button>
          </section>
          <FormTicket customerId={customer.id} />
        </>
      ) : (
        <form
          className="px-2 sm:px-4 py-4 sm:py-6 rounded bg-slate-100"
          onSubmit={handleSubmit(handleSearchCustomer)}
        >
          <fieldset className="mb-4">
            <Input
              name="email"
              placeholder="Digite o email do cliente..."
              type="text"
              error={errors.email?.message}
              register={register}
            />
          </fieldset>
          <button className="bg-blue-500 w-full h-11 flex items-center justify-center gap-2 text-lg text-white font-semibold rounded-md cursor-pointer duration-300 hover:bg-blue-600">
            Procurar clientes <FiSearch size={24} color="#ffffff" />
          </button>
        </form>
      )}
    </main>
  );
};

export default OpenTicket;
