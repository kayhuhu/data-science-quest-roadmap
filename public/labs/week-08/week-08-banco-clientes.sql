-- Semana 8 — execute as consultas e valide o grão após cada join.
CREATE TABLE clientes (cliente_id INTEGER PRIMARY KEY, nome TEXT, segmento TEXT);
CREATE TABLE contas (conta_id INTEGER PRIMARY KEY, cliente_id INTEGER, data_abertura TEXT, FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id));
CREATE TABLE transacoes (transacao_id INTEGER PRIMARY KEY, conta_id INTEGER, data_evento TEXT, valor REAL, tipo TEXT, FOREIGN KEY(conta_id) REFERENCES contas(conta_id));

-- Exercício 1: uma linha por cliente com quantidade e valor total de transações.
-- Escreva sua consulta abaixo.
