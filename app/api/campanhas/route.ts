import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const campanhas = await prisma.campanha.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(campanhas);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao buscar campanhas";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const nova = await prisma.campanha.create({
      data: {
        nome: data.nome,
        organizador: data.organizador || "Instituição Parceira",
        local: data.local || "Itapetininga/SP",
        descricao: data.descricao,
        itensPrioritarios: data.itensPrioritarios || [],
        periodo: data.periodo,
        meta: Number(data.meta) || 500,
        status: "Ativa",
      },
    });
    return NextResponse.json(nova, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao criar campanha";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
