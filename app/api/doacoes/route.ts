import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const doacoes = await prisma.doacao.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(doacoes);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao buscar doações";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const codigo = data.codigo || `REV-${Math.floor(1000 + Math.random() * 9000)}`;
    const pontosGerados = (Number(data.quantidade) || 1) * 30;

    const nova = await prisma.doacao.create({
      data: {
        codigo,
        titulo: data.titulo,
        descricao: data.descricao,
        quantidade: Number(data.quantidade) || 1,
        tamanho: data.tamanho || "M",
        modalidade: data.modalidade || "Doação",
        preco: data.preco ? Number(data.preco) : null,
        pontoDestino: data.pontoDestino,
        whatsapp: data.whatsapp,
        doadorNome: data.doador || "Beatriz Melo",
        fotoUrl: data.fotoUrl,
        status: "Aguardando entrega",
        pontosGerados,
        campanhaId: data.campanhaId || null,
      },
    });

    return NextResponse.json(nova, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao registrar doação";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
