import Container from "@/components/Container";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 py-2 md:py-3 px-2 md:px-4 rounded-lg flex items-center gap-4 text-white">
        <Link href="/dashboard" className="duration-300 hover:font-semibold">
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className="duration-300 hover:font-semibold"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
};

export default DashboardHeader;
