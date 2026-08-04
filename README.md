# Data Science Quest

Hub pessoal de preparação para o processo seletivo de Cientista de Dados do Itaú Unibanco. O produto transforma a ementa oficial e o roadmap v12 em uma jornada prática de 22 semanas, entre 03/08/2026 e 31/12/2026.

## O que está incluído

- mapa visual com as 22 semanas, 12 blocos e central detalhada de cada missão;
- auditoria integral de 72 itens oficiais, 22 projetos, 220 perguntas e 220 respostas;
- status de domínio vermelho, amarelo, verde e revisão;
- Pomodoro integrado ao histórico real de estudo;
- editor privado com Markdown, tabelas, código, LaTeX, trechos de leitura e imagens;
- flashcards derivados do dicionário canônico de sabatina;
- simulador de sabatina com autoavaliação e envio de lacunas ao caderno de erros;
- simulador de prova prática de até quatro horas;
- acompanhamento dos 22 repositórios de portfólio;
- analytics baseados apenas nos dados reais do usuário;
- conquistas, XP, busca global e modo claro/escuro;
- backup JSON dos dados pessoais.

## Fontes de verdade

- `data/roadmap-v12.md`: distribuição canônica do conteúdo por semana;
- `data/roadmap.json`: conteúdo estruturado e auditado, gerado automaticamente;
- ementa do processo seletivo: usada como referência de integridade dos 72 itens.

Os PDFs e livros protegidos não são distribuídos neste repositório. O editor permite registrar apenas referências, páginas, capítulos e trechos curtos necessários ao estudo.

## Arquitetura

- Next.js App Router, React 19 e TypeScript estrito;
- vinext/Vite para saída ESM compatível com Cloudflare Workers;
- D1 para progresso, notas, sessões, configurações e histórico;
- R2 privado para imagens adicionadas às notas;
- Drizzle para schema e migrations;
- React Markdown, GFM e KaTeX para o estúdio de notas;
- Recharts para visualização dos dados reais.

O acesso privado do ambiente hospedeiro fornece a identidade. Todos os registros são associados ao identificador autenticado; em preview local é usado um perfil isolado de desenvolvimento.

## Desenvolvimento

Requisitos: Node.js 22.13 ou superior.

```bash
npm ci
npm run content:audit
npm run dev
```

## Validação

```bash
npm run lint
npm test
```

`content:audit` falha se o material não contiver exatamente 22 semanas, 22 projetos, 220 perguntas e 220 respostas. O relatório também preserva a contagem auditada de 72 itens oficiais.

## Persistência e privacidade

- D1 armazena somente dados estruturados do estudo;
- R2 armazena os bytes das imagens; o banco guarda apenas metadados;
- uploads aceitam JPG, PNG, WebP e GIF até 8 MB;
- arquivos são organizados por usuário e servidos por rota autenticada;
- nenhuma chave ou token é exposto no navegador;
- notas, respostas, sessões e imagens são privadas por padrão.

## Publicação

O projeto contém `.openai/hosting.json` com os bindings lógicos `DB` e `STUDY_ASSETS`. O processo de Sites cria e conecta os recursos reais, aplica as migrations de `drizzle/` e publica a saída validada.

## Repositório sugerido

Perfil: [YAKWSZ](https://github.com/YAKWSZ)  
Nome: `data-science-quest-roadmap`

## Créditos e licença

Conteúdo de estudo organizado a partir da ementa fornecida pelo candidato e do roadmap v12. Código disponibilizado sob licença MIT. Materiais externos mantêm suas próprias licenças e direitos autorais.
