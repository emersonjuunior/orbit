import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// rota para alterar o status de um ticket
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Ticket não encontrado." },
      { status: 400 }
    );
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Chamado atualizado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Algo deu errado ao atualizar o ticket: " + error },
      { status: 400 }
    );
  }
}

// rota para cadastrar um novo ticket
export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      {
        error:
          "Erro ao cadastrar novo chamado: Existem propriedades que não foram informadas.",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.ticket.create({
      data: {
        name: name,
        description: description,
        status: "ABERTO",
        customerId: customerId,
      },
    });

    return NextResponse.json({ message: "Chamado registrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar novo chamado: " + error },
      { status: 400 }
    );
  }
}
