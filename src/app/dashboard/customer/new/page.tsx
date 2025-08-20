import Container from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import NewCustomer from "../components/NewCustomer";

const NewCustomerPage = async () => {
  const session = await getServerSession(authOptions);

  // protegendo a rota
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="flex flex-col mt-9 mb-2">
      <Container>
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href="/dashboard/customer"
            className="bg-gray-900 px-4 py-1 rounded text-white"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo cliente</h1>
        </div>
        <NewCustomer userId={session?.user?.id} />
      </Container>
    </main>
  );
};

export default NewCustomerPage;
