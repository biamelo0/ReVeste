import { prisma } from "../lib/prisma";

async function main() {
  console.log("Iniciando seed do banco de dados ReVeste...");

  // 1. Cria usuário padrão
  const user = await prisma.user.upsert({
    where: { email: "beatriz@fatec.sp.gov.br" },
    update: {},
    create: {
      nome: "Beatriz Melo",
      email: "beatriz@fatec.sp.gov.br",
      documento: "450.123.890-11",
      endereco: "Av. Dr. Cyro de Albuquerque, 4750 - FATEC Itapetininga/SP",
      tipo: "pf",
      pontoColeta: true,
      pontos: 420,
      pecasDoadas: 14,
    },
  });

  // Cria usuário administrador geral
  await prisma.user.upsert({
    where: { email: "admin@reveste.com.br" },
    update: {},
    create: {
      nome: "Administrador Geral",
      email: "admin@reveste.com.br",
      documento: "00.000.000/0001-99",
      endereco: "Central Administrativa ReVeste - FATEC",
      tipo: "admin",
      isAdmin: true,
      pontoColeta: true,
      pontos: 9999,
      pecasDoadas: 520,
    },
  });

  console.log(`Usuário padrão configurado: ${user.nome}`);

  // 2. Limpa e cria Campanhas
  const countCampanhas = await prisma.campanha.count();
  if (countCampanhas === 0) {
    await prisma.campanha.createMany({
      data: [
        {
          nome: "Agasalho Solidário 2026",
          organizador: "Fundo Social de Solidariedade",
          local: "Praça dos Três Poderes, Centro · Itapetininga/SP",
          descricao: "Arrecadação emergencial de agasalhos, cobertores e meias para famílias em vulnerabilidade durante o período de frentes frias.",
          itensPrioritarios: ["Casacos de frio", "Cobertores", "Meias adultas e infantis", "Moletom"],
          periodo: "01 Jun – 30 Out 2026",
          arrecadado: 1420,
          meta: 2000,
          familiasAtendidas: 310,
          status: "Ativa",
        },
        {
          nome: "Volta às Aulas Circular",
          organizador: "ONG Mãos Dadas & FATEC",
          local: "Vila Rio Branco · Itapetininga/SP",
          descricao: "Reaproveitamento de uniformes escolares, mochilas, agasalhos juvenis e calçados infantis para crianças da rede pública.",
          itensPrioritarios: ["Camisetas de uniforme", "Mochilas", "Tênis infantil (28 ao 36)", "Agasalhos escolares"],
          periodo: "15 Ago – 30 Nov 2026",
          arrecadado: 480,
          meta: 600,
          familiasAtendidas: 145,
          status: "Ativa",
        },
        {
          nome: "Moda Consciente no Campus",
          organizador: "FATEC Itapetininga",
          local: "Hall de Entrada - Bloco A · FATEC",
          descricao: "Troca e doação de peças casuais entre estudantes universitários com pontuação no aplicativo e oficinas de costura comunitária.",
          itensPrioritarios: ["Calças jeans", "Camisas sociais", "Jaquetas leves", "Acessórios e ecobags"],
          periodo: "01 Set – 20 Dez 2026",
          arrecadado: 320,
          meta: 500,
          familiasAtendidas: 85,
          status: "Ativa",
        },
      ],
    });
    console.log("Campanhas iniciais semeadas com sucesso!");
  }

  // 3. Limpa e cria Itens da Loja Solidária
  const countLoja = await prisma.lojaItem.count();
  if (countLoja === 0) {
    await prisma.lojaItem.createMany({
      data: [
        {
          nome: "Camisa Linho Upcycling",
          ong: "Cooperativa Fios do Futuro",
          enderecoRetirada: "Rua Monsenhor Soares, 412 - Centro",
          descricao: "Confeccionada artesanalmente a partir do reaproveitamento de sobras têxteis higienizadas.",
          categoria: "camisa",
          tamanho: "M",
          pontos: 120,
          corFundo: "#DCE5CF",
          corPeca: "#66794F",
        },
        {
          nome: "Jaqueta Corta-Vento ReVeste",
          ong: "ONG Mãos Dadas",
          enderecoRetirada: "Vila Rio Branco - Sede Social",
          descricao: "Tecido impermeável leve, revisada e higienizada pronta para os dias frios.",
          categoria: "jaqueta",
          tamanho: "G",
          pontos: 180,
          corFundo: "#EFE3CC",
          corPeca: "#B8613F",
        },
        {
          nome: "Ecobag Algodão Cru Orgânico",
          ong: "Fundo Social de Itapetininga",
          enderecoRetirada: "Praça dos Três Poderes - Centro",
          descricao: "Bolsa resistente para feiras e compras diárias, substituindo sacolas plásticas descartáveis.",
          categoria: "ecobag",
          tamanho: "Único",
          pontos: 60,
          corFundo: "#F1D6C6",
          corPeca: "#2A3A27",
        },
        {
          nome: "Suéter de Lã Aconchego",
          ong: "Fundo Social de Itapetininga",
          enderecoRetirada: "Praça dos Três Poderes - Centro",
          descricao: "Peça de malharia retilínea macia e quente, sem bolinhas ou desfiados.",
          categoria: "sueter",
          tamanho: "P",
          pontos: 140,
          corFundo: "#EFE3CC",
          corPeca: "#9E6D4E",
        },
        {
          nome: "Calça Jeans Tradicional Reta",
          ong: "Cooperativa Fios do Futuro",
          enderecoRetirada: "Rua Monsenhor Soares, 412 - Centro",
          descricao: "Jeans denim resistente 100% algodão, restaurado por costureiras parceiras.",
          categoria: "calca",
          tamanho: "42",
          pontos: 130,
          corFundo: "#D9E1E6",
          corPeca: "#4A6274",
        },
        {
          nome: "Cachecol Tricô Artesanal",
          ong: "ONG Mãos Dadas",
          enderecoRetirada: "Vila Rio Branco - Sede Social",
          descricao: "Ponto canelado em tom terracota quentinho feito à mão.",
          categoria: "cachecol",
          tamanho: "Único",
          pontos: 80,
          corFundo: "#F1D6C6",
          corPeca: "#B8613F",
        },
      ],
    });
    console.log("Itens da Loja Solidária semeados com sucesso!");
  }

  // 4. Cria Doações Iniciais
  const countDoacoes = await prisma.doacao.count();
  if (countDoacoes === 0) {
    await prisma.doacao.createMany({
      data: [
        {
          codigo: "REV-8104",
          titulo: "Casaco de Lã Inverno",
          descricao: "Casaco de inverno feminino higienizado",
          quantidade: 1,
          tamanho: "M",
          modalidade: "Doação",
          pontoDestino: "ONG Mãos Dadas",
          doadorNome: "Beatriz Melo",
          whatsapp: "15999990000",
          status: "Validado pela ONG",
          pontosGerados: 150,
          userId: user.id,
        },
        {
          codigo: "REV-9823",
          titulo: "Camisetas Básicas Algodão",
          descricao: "5 peças de algodão lavadas e higienizadas",
          quantidade: 5,
          tamanho: "M",
          modalidade: "Doação",
          pontoDestino: "Faculdade de Tecnologia (FATEC)",
          doadorNome: "Beatriz Melo",
          whatsapp: "15999990000",
          status: "Aguardando entrega",
          pontosGerados: 150,
          userId: user.id,
        },
      ],
    });
    console.log("Doações iniciais semeadas com sucesso!");
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
