# Data Science Quest

Planner de estudos em Next.js para a prova e a sabatina de Cientista de Dados do Itaú Unibanco. O roadmap v18 preserva a ordem pedagógica de 22 semanas, cobre os 72 itens literais da ementa em nível Júnior e prioriza compreensão, escolha, interpretação e aplicação bancária.

Produção: `https://kayhuhu-roadmap.vercel.app`

## Escopo da v18

- 22 semanas na ordem canônica do planejamento;
- 72 itens literais em 14 blocos, com semana principal, cobertura transversal e referências cruzadas;
- quatro abas semanais, exatamente: **Estudar, Praticar, Sabatina e Revisar**;
- progresso, status e horas sempre disponíveis no cabeçalho, sem uma aba própria;
- checkpoint permanente em `/fundamentos-machine-learning` entre as Semanas 8 e 9;
- 176 flashcards-semente atômicos, separados das 220 perguntas semanais;
- 51 perguntas preservadas de uma sabatina real e 84 questões de duas provas recebidas;
- Mini Labs de 1–3 horas em todas as semanas e seis projetos maiores nos marcos de portfólio;
- cinco CSVs didáticos reconstruídos para as questões práticas cujos dados não acompanharam o notebook;
- progresso, notas, PDFs anexados, flashcards, erros, provas e tentativas salvos no navegador.

“100% da ementa” significa que cada item é coberto no nível necessário para uma vaga Júnior: o que é, para que serve, como funciona, quando usar, quando evitar, como aparece em Ciência de Dados, aplicação bancária, interpretação, matemática necessária, prática mínima, limitações e sabatina. Isso não significa aprofundamento acadêmico indiscriminado.

## As quatro abas de cada semana

1. **Estudar:** começa pela ementa literal; depois mostra mapa compacto de conceitos, prompt para gerar a apostila, PDF anexado e três materiais prioritários.
2. **Praticar:** Mini Lab de 1–3 horas, checklist, estrutura mínima de arquivos, README, exemplo de código e fluxo Git/GitHub.
3. **Sabatina:** dez perguntas aplicadas, resposta ideal, metadados, confiança, criação de flashcard e registro no caderno de erros.
4. **Revisar:** flashcards atômicos, itens pendentes, erros e critério compacto de domínio.

O status verde exige ementa oficial estudada, Mini Lab, entrega mínima, desempenho satisfatório na sabatina, flashcards essenciais revisados e capacidade declarada de explicar, aplicar e interpretar. Livros extras, vídeos opcionais e projetos grandes não bloqueiam a conclusão.

## Ementa e distribuição

| Bloco | Semana(s) |
| --- | --- |
| Estatística Básica | 1–3 |
| Álgebra | 4 |
| Data Prep | 5–6 |
| Programação | 7 |
| Banco de Dados | 8 |
| Avaliação de Modelos | 9–16, aplicada ao tipo de modelo |
| Regressão | 9–10 |
| Classificação | 11–14 |
| Agrupamento | 15–16 |
| IA Generativa | 17–18 |
| Pesquisa Operacional, Programação Inteira e MIP | 19 |
| Outros: Big Data, grafos, séries, anomalia, ensembles, texto, deep learning, imagem e speech | 13, 20–21 |
| Consolidação | 22, sem teoria nova |

Casos auditados automaticamente:

- Semana 1: Propriedades de Distribuições, sem virar uma EDA completa;
- Semana 9: somente MAE, RMSE, R² e validações aplicáveis à regressão;
- Semana 16: anomalia é contexto, não item oficial;
- Semana 17: text mining é contexto, não item oficial;
- Ensemble modelling aponta para a Semana 13 e não é reensinado na Semana 21.

## Avaliações e revisão

- **Sabatina por semana:** treino autoral ligado ao conteúdo semanal.
- **Sabatina teste:** avaliação final geral com as 51 perguntas reais, filtros e respostas estruturadas.
- **Provas reais:** 47 + 37 questões no texto original, em modo estudo ou simulado, com filtros e histórico local.
- **Flashcards:** filtros por bloco, semana, ementa/conceito/modelo, tipo, estado e fonte.
- **Caderno de erros:** resposta dada, correta, erro conceitual, tema, próxima revisão e conversão em flashcard.

## Stack

- Next.js 16.3, App Router
- React 19
- TypeScript 5.9
- CSS responsivo próprio
- KaTeX e React Markdown
- Recharts
- armazenamento local e IndexedDB para dados pessoais e PDFs
- GitHub e Vercel

## Executar localmente

Pré-requisitos: Node.js 22 e npm.

```powershell
git clone https://github.com/kayhuhu/data-science-quest-roadmap.git
Set-Location data-science-quest-roadmap
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Qualidade

```powershell
npm run content:audit
npm run typecheck
npm run lint
npm run build
npm run check
```

`content:audit` reconstrói o roadmap e os datasets e falha se não encontrar exatamente 22 semanas, 14 blocos, 72 itens, 6 marcos de portfólio, 220 perguntas, 220 respostas e 176 flashcards-semente. Os testes também auditam as 51 perguntas reais, as 84 questões importadas e os casos especiais de cobertura.

## Arquitetura

```text
app/weekly-study.css             layout responsivo das quatro abas
components/WeekDrawer.tsx       central semanal
components/MlFundamentalsView.tsx
                                 checkpoint entre as Semanas 8 e 9
components/AssessmentViews.tsx  sabatina final e provas interativas
data/roadmap.json               artefato canônico gerado
data/assessments.json           47 + 37 questões originais
lib/real-sabatina.ts            51 perguntas reais e metadados
lib/use-quest-workspace.ts      persistência e regras de evidência
scripts/canonical-study-scope.mjs
                                 escopo pedagógico das 22 semanas
scripts/roadmap-source.mjs      ementa literal e ordem do roadmap
scripts/generate-roadmap.mjs    geração e auditoria automática
public/datasets/                cinco CSVs didáticos reconstruídos
```

## GitHub e Vercel

O remoto principal deve ser `https://github.com/kayhuhu/data-science-quest-roadmap.git`. O passo a passo para trocar de conta e preservar o histórico está em [docs/MIGRACAO_GITHUB_KAYHUHU.md](docs/MIGRACAO_GITHUB_KAYHUHU.md).

Depois do push, conecte esse repositório e a branch `main` ao projeto da Vercel. O domínio de produção esperado é `kayhuhu-roadmap.vercel.app`.

## Privacidade e direitos autorais

O planner pode armazenar referências, anotações próprias, imagens permitidas, fórmulas em LaTeX e trechos curtos necessários. Não publique livros ou PDFs protegidos, dados bancários, PII, tokens, `.env` ou bases confidenciais. Projetos devem usar dados públicos licenciados ou dados sintéticos identificados.
