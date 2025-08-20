import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// rota para cadastrar clientes
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucessso!" });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Erro ao cadastrar novo cliente: ${error}`,
      },
      { status: 400 }
    );
  }
}

// rota para deletar clientes
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      {
        error: "Erro ao deletar cliente.",
      },
      { status: 400 }
    );
  }

  const findTickets = await prisma.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });

  if (findTickets) {
    return NextResponse.json(
      {
        error:
          "Erro ao deletar cliente: Existem tickets abertos para esse cliente.",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.customer.delete({
      where: {
        id: userId!,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao deletar cliente: " + error,
      },
      { status: 400 }
    );
  }
}

// rota para buscar um cliente
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: customerEmail as string,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar cliente: " + error },
      { status: 400 }
    );
  }
}
