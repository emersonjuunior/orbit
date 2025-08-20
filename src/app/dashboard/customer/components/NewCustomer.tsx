"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório."),
  email: z
    .string()
    .email("Digite um email válido.")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message:
        "O número de telefone deve estar em um formato válido. (DD) 999999999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

const NewCustomer = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const handleRegisterCustomer = async (data: FormData) => {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      userId,
    });

    router.refresh();
    router.replace("/dashboard/customer");
  };

  return (
    <form
      className="flex flex-col gap-2 md:gap-5 mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="flex flex-col gap-1 md:gap-2">
        <span className="text-lg font-medium">Nome completo</span>
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome completo"
          error={errors.name?.message}
          register={register}
        />
      </label>
      <fieldset className="flex flex-col sm:flex-row gap-2 md:gap-4">
        <label className="flex flex-col gap-1 md:gap-2 flex-1">
          <span className="text-lg font-medium">Telefone</span>
          <Input
            type="text"
            name="phone"
            placeholder="(DD) 98212-0912"
            error={errors.phone?.message}
            register={register}
          />
        </label>
        <label className="flex flex-col gap-1 md:gap-2 flex-1">
          <span className="text-lg font-medium">Email</span>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email"
            error={errors.email?.message}
            register={register}
          />
        </label>
      </fieldset>
      <label className="flex flex-col gap-1 md:gap-2">
        <span className="text-lg font-medium">Endereço</span>
        <Input
          type="text"
          name="address"
          placeholder="Digite o endereço do cliente"
          error={errors.address?.message}
          register={register}
        />
      </label>
      <button
        className="bg-blue-500 px-2 h-11 rounded text-white text-lg font-semibold cursor-pointer duration-300 hover:bg-blue-600"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default NewCustomer;
