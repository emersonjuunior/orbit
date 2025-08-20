import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";
import CustomerCard from "./components/CustomerCard";
import prisma from "@/lib/prisma";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  // protegendo a rota
  if (!session || !session.user) {
    redirect("/");
  }

  // busca os clientes no banco de dados
  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  console.log(customers);

  return (
    <main className="mt-9 mb-2">
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
          {customers &&
            customers.length > 0 &&
            customers.map((customer) => (
              <CustomerCard key={customer.phone} customer={customer} />
            ))}
        </section>
        {customers.length === 0 && (
          <h2 className="text-lg md:text-xl text-gray-600">Você ainda não possui nenhum cliente.</h2>
        )}
      </Container>
    </main>
  );
};

export default Customer;
