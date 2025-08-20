import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h1 className="font-medium text-2xl mb-2">Gerencie sua empresa</h1>
      <h2 className="font-bold text-3xl md:text-4xl mb-8 text-blue-500">Atendimentos, clientes</h2>
      <Image src="/hero.svg" alt="Imagem principal do Orbit" width={600} height={600} className="max-w-sm md:max-w-xl" />
    </main>
  );
}
