import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";
import Ticket from "./components/Ticket";
import prisma from "@/lib/prisma";
import ButtonRefresh from "./components/ButtonRefresh";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  // buscando tickets no banco
  const tickets = await prisma.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session?.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // protegendo a rota
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="mt-9 mb-2">
      <Container>
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <ButtonRefresh />
            <Link
              href="/dashboard/new"
              className="bg-blue-500 px-4 py-1 rounded text-white"
            >
              Abrir chamado
            </Link>
          </div>
        </div>

        {tickets.length === 0 ? (
          <p className="text-gray-600 px-2 md:px-0 md:text-lg font-medium">
            Nenhum ticket aberto foi encontrado.
          </p>
        ) : (
          <table className="min-w-full my-2 md:my-4">
            <thead>
              <tr>
                <th className="font-medium text-left pl-1">CLIENTE</th>
                <th className="font-medium text-left hidden sm:block">
                  CADASTRO
                </th>
                <th className="font-medium text-left">STATUS</th>
                <th className="font-medium text-left">#</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  customer={ticket.customer}
                />
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </main>
  );
};

export default Customer;
