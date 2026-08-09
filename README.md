# Data Science Quest

Planner de estudos em Next.js para preparação da prova e da sabatina de Cientista de Dados do Itaú Unibanco. O roadmap v16 segue as 24 semanas do planejamento-base, cobre os 61 itens dos 13 blocos oficiais, inclui 24 projetos completos, 240 perguntas semanais, 51 perguntas de uma sabatina real e 84 questões de duas provas recebidas.

Produção: `https://kayhuhu-roadmap.vercel.app`

## O que mudou na v16

- os 61 itens oficiais agora possuem guias aplicados individuais: **o que é**, **por que importa**, **quando usar**, **quando não usar**, **como aplicar no banco** e **foco de prova/sabatina**;
- a central semanal recebeu tipografia maior e mais confortável, sem alterar a escala das demais páginas do planner;
- a identificação de páginas do PDF-base foi retirada da interface semanal; a ordem das semanas continua preservada internamente;
- o bloco **Estudar com IA** passou a pedir teoria necessária, aplicação em Ciência de Dados, prática em Python/pandas/SQL e casos bancários, sem exigir matemática acadêmica desnecessária;
- as perguntas semanais foram reescritas no estilo observado nas provas e na sabatina: finalidade, escolha, comparação, pipeline, métrica, limitação, produção e aplicação bancária.

### Avaliações finais preservadas da v15

- uma nova página **Sabatina teste** reúne 51 perguntas reais como avaliação final geral, sem vínculo com semanas, com respostas em quatro camadas e prioridade baseada no desempenho original;
- **Prova Itaú 1** virou um teste de 47 questões e **Prova Itaú 2** um teste de 37 questões, com modos estudo/simulado e gabarito comentado;
- cinco CSVs didáticos foram reconstruídos para as questões práticas porque os arquivos originais não vieram com o notebook;
- a ementa oficial passou a aparecer na ordem das semanas e como checklist de domínio;
- cada semana explicita “o que é”, “para que serve”, “como funciona” e “como usar no banco”;
- a inicialização funciona mesmo quando o navegador bloqueia armazenamento local;

### Base preservada da v14

- as semanas voltaram à ordem exata do PDF `planejamento_v10_3_ordem_luiza_ementa_fluxo_continuo.pdf`;
- as semanas 1–20 seguem Luiza p. 1–96; as semanas 21–24 complementam a ementa;
- Avaliação de Modelos mantém suas bases nas semanas 6–8 e reaparece transversalmente nas semanas de regressão, classificação, agrupamento e redes neurais;
- a ementa continua auditável como 61 itens nos 13 blocos oficiais, mesmo quando uma semana conecta mais de um bloco;
- cada semana abre em tela cheia, dentro do aplicativo, e possui exatamente seis áreas;
- teoria inclui fundamentação aplicada, limites, apoio opcional em LaTeX e aplicação bancária;
- cada semana mostra os itens oficiais relacionados e um protocolo explícito de validação;
- materiais preservam livros anteriores e acrescentam vídeos, artigos e documentação;
- cada semana possui prompts copiáveis para resumo/PDF e simulação de sabatina;
- projetos agora começam no VS Code, passam por venv, dependências, testes e documentação e terminam no GitHub `kayhuhu`;
- a aba Projetos usa o mesmo guia completo de dez etapas.
- o XP é recalculado por evidências salvas; alternar estados ou rever o mesmo cartão não duplica pontos.

## As seis áreas de cada semana

1. **Visão Geral:** tema, itens oficiais, resultados e status de domínio.
2. **Teoria e Aplicação Bancária:** guia individual de cada item oficial, critérios de uso, limites, apoio matemático opcional, casos e valor de negócio.
3. **Materiais:** livros anteriores, aulas, artigos e documentação.
4. **Estudar com IA:** prompt completo para material didático exportável em PDF.
5. **Projeto (Estrutura Completa CD):** problema, dados, stack, VS Code, venv, requirements, código, testes, documentação e GitHub.
6. **Perguntas de Sabatina:** dez cenários autorais da semana, respostas ideais e prompt para entrevista rigorosa. A sabatina real permanece separada como avaliação final geral.

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

`content:audit` gera `data/roadmap.json`, reconstrói os cinco datasets didáticos e falha se o roadmap-base não tiver exatamente 24 semanas, 13 blocos, 61 itens oficiais, 24 projetos, 240 perguntas e 240 respostas. O teste adicional audita separadamente as 51 perguntas reais e as 84 questões importadas.

## Arquitetura relevante

```text
app/                         rotas, layout e CSS global
components/WeekDrawer.tsx    central semanal com as seis áreas
components/ProjectGuidePanel.tsx
                              guia completo compartilhado por Semana e Projetos
components/AssessmentViews.tsx sabatina real e duas provas interativas
data/roadmap.json            artefato canônico gerado para a interface
data/assessments.json        47 + 37 questões, alternativas e gabaritos
lib/project-guides.ts        execução iniciante, Engenharia de Software e prompts
lib/syllabus-study-guides.ts guias aplicados dos 61 itens oficiais
lib/real-sabatina.ts         51 perguntas reais, prioridade e respostas estruturadas
lib/quest-data.ts            tipos, paleta e leitura do roadmap
public/datasets/             cinco CSVs didáticos reconstruídos
scripts/roadmap-source.mjs   ementa oficial e conteúdo profundo das 24 semanas
scripts/generate-roadmap.mjs geração e auditoria de integridade
scripts/import-assessments.py importação auditável do notebook recebido
scripts/generate-assessment-datasets.mjs
                              geração determinística dos CSVs de prática
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
