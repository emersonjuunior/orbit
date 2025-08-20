"use client";

import Input from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório."),
  description: z.string().min(1, "Descreva o seu problema."),
});

type FormData = z.infer<typeof schema>;

const FormTicket = ({ customerId }: { customerId: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleRegisterTicket = async (data: FormData) => {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customerId,
    });

    setValue("name", "");
    setValue("description", "");
  };

  return (
    <form
      className="px-2 sm:px-4 py-4 sm:py-6 rounded bg-slate-100 mt-5 md:mt-7 flex flex-col gap-4"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="flex flex-col gap-1">
        <span className="text-lg font-medium">Nome do chamado</span>
        <Input
          register={register}
          placeholder={"Digite o nome do chamado..."}
          name="name"
          error={errors.name?.message}
          type="text"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-lg font-medium">Descreva o problema</span>
        <textarea
          {...register("description")}
          placeholder="Descreva o seu problema..."
          className="outline-none w-full border-1 border-gray-400 rounded-md h-24 resize-none px-2 bg-gray-50"
          id="description"
        ></textarea>
        {errors.description?.message && (
          <p className="text-red-400 my-1 font-medium">
            {errors.description.message}
          </p>
        )}
      </label>
      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full py-1 text-lg font-semibold cursor-pointer hover:bg-blue-600 duration-300 text-white"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormTicket;
