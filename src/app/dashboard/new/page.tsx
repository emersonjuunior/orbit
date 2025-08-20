import Container from "@/components/Container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const NewTicket = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const handleRegisterTicket = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) return;

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session.user.id,
      },
    });

    redirect("/dashboard");
  };

  return (
    <main className="mt-9 mb-2">
      <Container>
        <div className="flex items-center gap-3 my-3 md:my-5">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>
        <form
          action={handleRegisterTicket}
          className="flex flex-col gap-2 md:gap-4"
        >
          <label className="flex flex-col gap-1 md:gap-2">
            <span className="text-lg font-medium">Nome do chamado</span>
            <input
              type="text"
              required
              placeholder="Digite o nome do chamado"
              className="outline-none w-full border-1 border-gray-400 rounded-md h-10 px-2 bg-gray-50"
              name="name"
            />
          </label>
          <label className="flex flex-col gap-1 md:gap-2">
            <span className="text-lg font-medium">Descreva o problema</span>
            <textarea
              required
              placeholder="Descreva o problema..."
              className="outline-none w-full border-1 border-gray-400 rounded-md h-24 resize-none px-2 bg-gray-50"
              name="description"
            ></textarea>
          </label>
          {customers.length > 0 && (
            <label className="flex flex-col gap-1 md:gap-2">
              <span className="text-lg font-medium">Selecione o cliente</span>
              <select
                name="customer"
                className="outline-none w-full border-1 border-gray-400 rounded-md h-10 resize-none px-2 bg-gray-50"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-sky-500 cursor-pointer font-medium">
                clique aqui para cadastrar um cliente
              </span>
              .
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-10 rounded-md cursor-pointer my-4 hover:bg-blue-600 duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </Container>
    </main>
  );
};

export default NewTicket;
