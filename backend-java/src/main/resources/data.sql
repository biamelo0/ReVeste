-- Carga inicial de dados para demonstração do ReVeste (Engenharia de Software / POO)
INSERT INTO itens_doacao (codigo, titulo, descricao, categoria, tamanho, quantidade, modalidade, preco, ponto_coleta, doador, whatsapp, status, pontos_sustentaveis, data_cadastro)
VALUES 
('REV-8841', 'Lote de Inverno Sustentável', '3 Casacos, 2 Calças em ótimo estado higienizadas para doação', 'Jaquetas', 'M / G', 5, 'Doação', NULL, 'ONG Mãos Dadas', 'Beatriz Melo', '15999990000', 'Validado pela ONG', 150, CURRENT_TIMESTAMP),

('REV-9823', 'Camisetas Básicas Algodão', 'Kit com 3 camisetas masculinas em perfeito estado para distribuição solidária', 'Camisas', 'G', 3, 'Doação', NULL, 'Faculdade de Tecnologia (FATEC)', 'Beatriz Melo', '15998765432', 'Aguardando entrega', 90, CURRENT_TIMESTAMP),

('REV-8104', 'Suéter de Tricô Artesanal Bege', 'Suéter grosso em lã macia para campanha do agasalho de inverno', 'Agasalhos', 'M', 1, 'Doação', NULL, 'Fundo Social de Solidariedade', 'Ana Carolina', '15997654321', 'Recebido no ponto', 50, CURRENT_TIMESTAMP),

('REV-7412', 'Calça Sarja Reta Sustentável', 'Calça casual sem desgastes, excelente para recolocação profissional', 'Calças', '42', 1, 'Troca', NULL, 'Faculdade de Tecnologia (FATEC)', 'Beatriz Melo', '15996543210', 'Aguardando entrega', 40, CURRENT_TIMESTAMP),

('REV-6320', 'Ecobag Confeccionada em Retalhos', 'Bolsa ecológica produzida por cooperativa a partir de sobras têxteis', 'Acessórios', 'Único', 2, 'Venda', 25.00, 'EcoPonto Central', 'Carlos Eduardo', '15995432109', 'Validado pela ONG', 30, CURRENT_TIMESTAMP);
