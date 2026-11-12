-- Carga inicial de dados para demonstração do ReVeste (Engenharia de Software / POO)
INSERT INTO itens_doacao (titulo, descricao, categoria, tamanho, quantidade, modalidade, preco, ponto_coleta, doador, whatsapp, status, pontos_sustentaveis, data_cadastro)
VALUES 
('Jaqueta Jeans Vintage Sustentável', 'Jaqueta jeans 100% algodão, higienizada e customizada para upcycling', 'Jaquetas', 'M', 1, 'Doação', NULL, 'Faculdade de Tecnologia (FATEC)', 'Mariana Silva', '15991234567', 'DISPONIVEL', 60, CURRENT_TIMESTAMP),

('Lote de Camisetas Básicas Algodão', 'Kit com 3 camisetas masculinas em perfeito estado para distribuição solidária', 'Camisas', 'G', 3, 'Doação', NULL, 'ONG Mãos Dadas', 'Lucas Pereira', '15998765432', 'AGUARDANDO_COLETA', 90, CURRENT_TIMESTAMP),

('Suéter de Tricô Artesanal Bege', 'Suéter grosso em lã macia para campanha do agasalho de inverno', 'Agasalhos', 'M', 1, 'Doação', NULL, 'Fundo Social de Solidariedade', 'Ana Carolina', '15997654321', 'TRIAGEM', 50, CURRENT_TIMESTAMP),

('Calça Sarja Reta Sustentável', 'Calça casual sem desgastes, excelente para recolocação profissional', 'Calças', '42', 1, 'Troca', NULL, 'Faculdade de Tecnologia (FATEC)', 'Beatriz Melo', '15996543210', 'DISPONIVEL', 40, CURRENT_TIMESTAMP),

('Ecobag Confeccionada em Retalhos', 'Bolsa ecológica produzida por cooperativa a partir de sobras têxteis', 'Acessórios', 'Único', 2, 'Venda', 25.00, 'EcoPonto Central', 'Carlos Eduardo', '15995432109', 'DISPONIVEL', 30, CURRENT_TIMESTAMP);
