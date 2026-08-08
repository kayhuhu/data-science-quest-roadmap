# Data Science Quest

Planner de estudos em Next.js para preparação da prova e da sabatina de Cientista de Dados do Itaú Unibanco. O roadmap v14 segue as 24 semanas do planejamento-base, cobre os 13 blocos oficiais, inclui 24 projetos completos e 240 perguntas técnicas com respostas.

Produção: `https://kayhuhu-roadmap.vercel.app`

## O que mudou na v14

- as semanas voltaram à ordem exata do PDF `planejamento_v10_3_ordem_luiza_ementa_fluxo_continuo.pdf`;
- as semanas 1–20 seguem Luiza p. 1–96; as semanas 21–24 complementam a ementa;
- Avaliação de Modelos mantém suas bases nas semanas 6–8 e reaparece transversalmente nas semanas de regressão, classificação, agrupamento e redes neurais;
- a ementa continua auditável como 61 itens nos 13 blocos oficiais, mesmo quando uma semana conecta mais de um bloco;
- cada semana abre em tela cheia, dentro do aplicativo, e possui exatamente seis áreas;
- teoria inclui fundamentação, formalização em LaTeX e aplicação bancária;
- cada semana mostra sua posição no planejamento-fonte e um protocolo explícito de validação;
- materiais preservam livros anteriores e acrescentam vídeos, artigos e documentação;
- cada semana possui prompts copiáveis para resumo/PDF e simulação de sabatina;
- projetos agora começam no VS Code, passam por venv, dependências, testes e documentação e terminam no GitHub `kayhuhu`;
- a aba Projetos usa o mesmo guia completo de dez etapas.
- o XP é recalculado por evidências salvas; alternar estados ou rever o mesmo cartão não duplica pontos.

## As seis áreas de cada semana

1. **Visão Geral:** tema, itens oficiais, resultados e status de domínio.
2. **Teoria e Aplicação Bancária:** fundamento, matemática, hipóteses, casos e valor de negócio.
3. **Materiais:** livros anteriores, aulas, artigos e documentação.
4. **Estudar com IA:** prompt completo para material didático exportável em PDF.
5. **Projeto (Estrutura Completa CD):** problema, dados, stack, VS Code, venv, requirements, código, testes, documentação e GitHub.
6. **Perguntas de Sabatina:** dez cenários com resposta ideal e prompt para entrevista rigorosa.

## Ementa e distribuição

| Bloco oficial | Semana(s) |
| --- | --- |
| Programação | 4 e 8 |
| Estatística Básica | 1–2 |
| Álgebra | 3 |
| Avaliação de Modelos | 6–20 e 22 (transversal) |
| Data Prep | 3–5 |
| Banco de Dados | 21 |
| Classificação | 11–16 e 22 |
| Regressão | 9–10 e 14 |
| Agrupamento | 17–20 |
| IA Generativa | 23 |
| Pesquisa Operacional | 24 |
| Programação Inteira | 24 |
| MIP | 24 |

## Stack

- Next.js 16.3 (App Router)
- React 19
- TypeScript 5.9
- CSS responsivo próprio
- KaTeX + React Markdown para fórmulas e notas
- Recharts para analytics
- armazenamento local no navegador para progresso e anotações
- Vercel para publicação

## Executar no seu computador

Pré-requisitos: Node.js 22 e npm.

```powershell
git clone https://github.com/kayhuhu/data-science-quest-roadmap.git
Set-Location data-science-quest-roadmap
npm install
npm run dev
```

Abra `http://localhost:3000`.

Se o repositório novo ainda não tiver sido criado, use esta pasta local e siga o guia de migração antes do `git clone`.

## Comandos de qualidade

```powershell
npm run content:audit
npm run typecheck
npm run lint
npm run build
npm run check
```

`content:audit` gera `data/roadmap.json` a partir de `scripts/roadmap-source.mjs` e falha se não houver exatamente 24 semanas, 13 blocos, 61 itens oficiais, 24 projetos, 240 perguntas e 240 respostas.

## Arquitetura relevante

```text
app/                         rotas, layout e CSS global
components/WeekDrawer.tsx    central semanal com as seis áreas
components/ProjectGuidePanel.tsx
                              guia completo compartilhado por Semana e Projetos
data/roadmap.json            artefato canônico gerado para a interface
lib/project-guides.ts        execução iniciante, Engenharia de Software e prompts
lib/quest-data.ts            tipos, paleta e leitura do roadmap
scripts/roadmap-source.mjs   ementa oficial e conteúdo profundo das 24 semanas
scripts/generate-roadmap.mjs geração e auditoria de integridade
docs/MIGRACAO_GITHUB_KAYHUHU.md
                              troca de conta, cópia, push e Vercel passo a passo
```

## GitHub: migração para `kayhuhu`

O projeto foi copiado para a conta `kayhuhu`, e `origin` aponta para o novo repositório. O remoto antigo permanece apenas como `old-origin` para referência.

Siga o guia completo, sem pular as verificações:

**[Migração GitHub anitacr → kayhuhu](docs/MIGRACAO_GITHUB_KAYHUHU.md)**

Resumo dos comandos principais, depois de autenticar `kayhuhu`:

```powershell
gh auth logout -h github.com -u anitacr
gh auth login -h github.com -p https -w --clipboard
gh api user --jq .login
git remote rename origin old-origin
gh repo create kayhuhu/data-science-quest-roadmap --public --source . --remote origin --push
```

## Vercel

Depois do push no repositório novo:

1. abra o projeto no dashboard da Vercel;
2. vá a **Settings → Git**;
3. desconecte o repositório antigo;
4. conecte `kayhuhu/data-science-quest-roadmap`;
5. confirme `main` como branch de produção;
6. faça um novo deployment.

Também é possível usar `vercel git disconnect`, `vercel git connect` e `vercel --prod` na raiz do projeto.

## Conteúdo, privacidade e direitos autorais

O planner registra referências, anotações próprias, imagens permitidas, fórmulas em LaTeX e trechos curtos necessários. Não publique livros/PDFs protegidos, dados bancários, PII, tokens, `.env` ou bases confidenciais. Projetos de portfólio devem usar dados públicos licenciados ou dados sintéticos explicitamente identificados.
