import type { RoadmapWeek } from "@/lib/quest-data";

export type ProjectGuideStep = {
  id: string;
  title: string;
  outcome: string;
  actions: string[];
  evidence: string;
  commands?: string;
};

export type ProjectGuide = {
  businessQuestion: string;
  dataPlan: string;
  stack: string[];
  learningOutcomes: string[];
  firstSession: string[];
  repositoryStructure: string[];
  steps: ProjectGuideStep[];
  definitionOfDone: string[];
  aiPrompt: string;
};

const technicalProfile: Record<string, { stack: string[]; install: string; dataPlan: string }> = {
  "ESTATÍSTICA BÁSICA": {
    stack: ["Python", "pandas", "NumPy", "SciPy", "statsmodels", "Matplotlib", "pytest"],
    install: "pandas numpy scipy statsmodels matplotlib seaborn jupyter pytest ruff",
    dataPlan: "Crie uma carteira sintética com data, cliente, produto, exposição, renda, atraso e evento de default. Documente parâmetros e seed; não apresente dados simulados como evidência real.",
  },
  ÁLGEBRA: {
    stack: ["Python", "NumPy", "pandas", "scikit-learn", "pytest"],
    install: "numpy pandas scikit-learn matplotlib jupyter pytest ruff",
    dataPlan: "Use uma tabela sintética de clientes com escalas e correlações distintas, incluindo casos pequenos que possam ser calculados à mão para validar vetores, matrizes e distâncias.",
  },
  "DATA PREP": {
    stack: ["Python", "pandas", "scikit-learn", "Pandera", "pytest"],
    install: "pandas numpy scikit-learn pandera matplotlib jupyter pytest ruff",
    dataPlan: "Use dados tabulares de risco sintéticos, com coluna temporal e problemas injetados de forma rastreável. Separe treino, validação e teste antes de aprender qualquer transformação.",
  },
  PROGRAMAÇÃO: {
    stack: ["Python", "pandas", "Typer", "pytest", "Ruff", "GitHub Actions"],
    install: "pandas pyarrow typer pytest ruff build",
    dataPlan: "Inclua somente fixtures pequenas e sintéticas em tests/fixtures. A aplicação deve aceitar caminhos externos e nunca versionar bases sensíveis ou credenciais.",
  },
  "BANCO DE DADOS": {
    stack: ["SQL", "DuckDB", "Python", "pandas", "pytest"],
    install: "duckdb pandas jupyter pytest ruff",
    dataPlan: "Crie tabelas sintéticas de clientes, contas, transações e pagamentos com relacionamentos 1:N, datas e alguns erros controlados de chave para auditoria.",
  },
  "AVALIAÇÃO DE MODELOS": {
    stack: ["Python", "pandas", "scikit-learn", "Matplotlib", "pytest"],
    install: "pandas numpy scikit-learn matplotlib seaborn jupyter pytest ruff",
    dataPlan: "Gere alvos contínuo e binário, scores e datas para comparar métricas e splits em condições controladas, incluindo desbalanceamento e mudança out-of-time.",
  },
  REGRESSÃO: {
    stack: ["Python", "pandas", "scikit-learn", "statsmodels", "pytest"],
    install: "pandas numpy scikit-learn statsmodels matplotlib seaborn jupyter pytest ruff",
    dataPlan: "Use um alvo contínuo bancário, data de referência e segmentos. Preserve os períodos finais como out-of-time e crie um baseline simples antes dos modelos.",
  },
  CLASSIFICAÇÃO: {
    stack: ["Python", "pandas", "scikit-learn", "Matplotlib", "pytest"],
    install: "pandas numpy scikit-learn matplotlib seaborn jupyter pytest ruff",
    dataPlan: "Use default ou fraude sintéticos com data, classe desbalanceada e custos de falso positivo/negativo. Nenhuma feature pode usar evento posterior à decisão.",
  },
  AGRUPAMENTO: {
    stack: ["Python", "pandas", "scikit-learn", "SciPy", "pytest"],
    install: "pandas numpy scikit-learn scipy matplotlib seaborn jupyter pytest ruff",
    dataPlan: "Use features comportamentais agregadas por cliente, sem identificadores. Reserve outra janela temporal para estabilidade e inclua ruído/outliers controlados.",
  },
  "IA GENERATIVA": {
    stack: ["Python", "sentence-transformers", "ChromaDB", "pytest", "Ruff"],
    install: "pandas sentence-transformers chromadb scikit-learn jupyter pytest ruff",
    dataPlan: "Use apenas textos públicos ou sintéticos, sem PII. Registre origem, versão, permissão, chunks e conjunto de perguntas/respostas esperado para avaliação.",
  },
  "PESQUISA OPERACIONAL": {
    stack: ["Python", "OR-Tools", "PuLP", "pandas", "pytest"],
    install: "pandas ortools pulp matplotlib jupyter pytest ruff",
    dataPlan: "Crie dados sintéticos de retorno, custo, capacidade e limites de risco. Mantenha unidades explícitas e um caso de duas variáveis para validação gráfica.",
  },
  "PROGRAMAÇÃO INTEIRA": {
    stack: ["Python", "OR-Tools", "PuLP", "pandas", "pytest"],
    install: "pandas ortools pulp jupyter pytest ruff",
    dataPlan: "Modele escolhas discretas sintéticas com orçamento, capacidade e dependências. Guarde a solução da relaxação para comparar bound, arredondamento e inteiro.",
  },
  "MIP (MIXED INTEGER PROGRAM)": {
    stack: ["Python", "OR-Tools", "HiGHS", "PuLP", "pytest"],
    install: "pandas ortools highspy pulp jupyter pytest ruff",
    dataPlan: "Combine decisões binárias, quantidades inteiras e orçamento contínuo. Salve instâncias pequenas, configuração do solver, log, incumbent, Best Bound e GAP.",
  },
};

const repositoryStructure = [
  ".venv/ — ambiente local ignorado pelo Git",
  "README.md — problema, instalação, dados, método, resultados, limites e reprodução",
  ".gitignore — segredos, ambiente, cache e dados privados",
  "data/README.md — origem, licença, granularidade, schema e obtenção dos dados",
  "notebooks/ — exploração e narrativa; nenhuma regra crítica vive só aqui",
  "src/ — funções, pipelines e código reutilizável com docstrings e type hints",
  "tests/ — testes unitários e fixtures sintéticas pequenas",
  "reports/figures/ — gráficos finais; docs/ — decisões e model/data cards",
  "requirements.txt — dependências reproduzíveis do ambiente",
];

function buildProjectAiPrompt(week: RoadmapWeek, guide: Omit<ProjectGuide, "aiPrompt">) {
  return `Atue como Cientista de Dados sênior, Engenheiro de Software e revisor de risco de modelos. Ajude-me a construir do zero o projeto “${week.project.title}” (repositório kayhuhu/${week.project.repo}). Considere que sou iniciante e não pule comandos nem arquivos.

PROBLEMA E OBJETIVO
${week.project.objective}
Pergunta de negócio: ${guide.businessQuestion}
Dados: ${guide.dataPlan}
Stack: ${guide.stack.join(", ")}.

EMENTA QUE O PROJETO DEVE PROVAR
${week.overview.officialTopics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

TRABALHE EM FASES E PARE AO FINAL DE CADA FASE PARA EU EXECUTAR E COLAR O RESULTADO:
1. confirme decisão, população, unidade, janela, target/saída, baseline, métrica e custo bancário;
2. ensine a criar a pasta no VS Code, venv no PowerShell, .gitignore, estrutura e requirements.txt;
3. gere um README inicial e data card antes do modelo;
4. crie arquivos pequenos em src/ com type hints, docstrings no padrão Google e tratamento explícito de erros;
5. escreva testes pytest antes ou junto das regras críticas, incluindo edge cases e leakage temporal;
6. construa EDA e pipeline sem aprender nada no conjunto de teste;
7. implemente e valide ${week.content.join("; ")};
8. compare baseline e alternativas sob o mesmo protocolo, com análise de erros e segmentos;
9. revise segurança, privacidade, fairness, reprodutibilidade, desempenho e manutenção;
10. finalize README, arquitetura, model/data card, commits, GitHub Actions e publicação em https://github.com/kayhuhu.

REGRAS DE ENGENHARIA
- para cada arquivo, mostre o caminho e o conteúdo completo; para cada comando, diga em qual pasta executá-lo;
- use pathlib, configuração externa, seeds, logging, type hints, funções pequenas e dependências mínimas;
- nunca inclua token, senha, dado bancário real, PII ou arquivo grande no Git;
- explique o porquê de cada escolha e apresente alternativas;
- ao revisar, mostre problemas por severidade e entregue patch corrigido;
- não declare sucesso sem executar testes, lint e uma reprodução do zero;
- não invente resultado: quando faltarem dados, crie fixture sintética marcada como simulação.

CRITÉRIO DE CONCLUSÃO
${guide.definitionOfDone.map((item) => `- ${item}`).join("\n")}

Comece pela Fase 1: faça no máximo cinco perguntas objetivas sobre o escopo e proponha uma versão mínima executável. Não gere todo o projeto de uma vez.`;
}

export function getProjectGuide(week: RoadmapWeek): ProjectGuide {
  const profile = technicalProfile[week.block];
  if (!profile) throw new Error(`Perfil técnico não encontrado para ${week.block}.`);

  const businessQuestion = week.theoryAndBanking.banking.cases[0]?.scenario ?? week.project.objective;
  const base = {
    businessQuestion,
    dataPlan: profile.dataPlan,
    stack: profile.stack,
    learningOutcomes: week.project.learningOutcomes,
    firstSession: [
      `Abra o VS Code na pasta ${week.project.repo}; ainda não comece pelo notebook.`,
      `Copie para o README a pergunta: “${businessQuestion}”`,
      "Crie o venv, instale apenas as dependências sugeridas e confirme o interpretador .venv no VS Code.",
      "Escreva origem, granularidade, data de referência e proibições dos dados antes de modelar.",
    ],
    repositoryStructure,
    steps: [
      {
        id: "prerequisites",
        title: "1. Confira as ferramentas no Windows",
        outcome: "VS Code, Python, Git e GitHub CLI estão visíveis no PowerShell.",
        actions: ["Abra o menu Iniciar, procure PowerShell e abra o aplicativo.", "Execute um comando por linha. Se algum não existir, instale a ferramenta indicada e reabra o terminal.", "No VS Code, instale as extensões oficiais Python, Pylance e Jupyter.", "O login do GitHub deve terminar mostrando a conta kayhuhu."],
        evidence: "Captura ou bloco no README com as versões e gh auth status autenticado em kayhuhu.",
        commands: "code --version\npython --version\ngit --version\ngh --version\ngh auth status",
      },
      {
        id: "vscode",
        title: "2. Crie a pasta e abra no VS Code",
        outcome: "O projeto está aberto como uma pasta isolada, no local correto.",
        actions: ["Copie os comandos, trocando somente o caminho-base se desejar.", "Quando o VS Code abrir, confirme o nome da pasta no topo do Explorer.", "Abra Terminal > New Terminal; o prompt deve terminar no nome do repositório.", "Não salve o projeto dentro da pasta de outro repositório."],
        evidence: `VS Code aberto em ...\\data-science-projects\\${week.project.repo}.`,
        commands: `$baseProjetos = "$env:USERPROFILE\\Documents\\data-science-projects"\nNew-Item -ItemType Directory -Force -Path $baseProjetos\nSet-Location $baseProjetos\nNew-Item -ItemType Directory -Force -Path "${week.project.repo}"\nSet-Location "${week.project.repo}"\ncode .`,
      },
      {
        id: "venv",
        title: "3. Crie e ative o ambiente virtual",
        outcome: "Dependências do projeto ficam isoladas e o terminal mostra (.venv).",
        actions: ["Crie .venv uma única vez; ative-o toda vez que abrir um terminal novo.", "Se o PowerShell bloquear o script, libere somente para a sessão atual.", "No VS Code, pressione Ctrl+Shift+P, escolha Python: Select Interpreter e selecione .venv.", "Para sair do ambiente, use deactivate; não apague a pasta enquanto trabalha."],
        evidence: "where.exe python aponta primeiro para .venv e pip --version usa a mesma pasta.",
        commands: "python -m venv .venv\nSet-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\nwhere.exe python\npython -m pip --version\n# para sair mais tarde: deactivate",
      },
      {
        id: "scaffold",
        title: "4. Monte pastas, Git e arquivos essenciais",
        outcome: "Estrutura limpa, .gitignore seguro e primeiro commit pequeno.",
        actions: ["Crie pastas por responsabilidade; notebooks são apoio, não aplicação.", "No .gitignore, inclua .venv, __pycache__, .env, dados brutos e artefatos grandes.", "Inicie README com problema, decisão, dados, execução e limitações.", "Use branch main local e confirme exatamente o que será versionado."],
        evidence: "git status mostra somente os arquivos intencionais; .venv e dados privados não aparecem.",
        commands: "New-Item -ItemType Directory -Force data,notebooks,src,tests,reports,docs\nNew-Item -ItemType Directory -Force reports\\figures,tests\\fixtures\nNew-Item -ItemType File -Force README.md,.gitignore\ngit init\ngit branch -M main\ngit config user.name \"kayhuhu\"\ngit status --short",
      },
      {
        id: "dependencies",
        title: "5. Instale pacotes e gere requirements.txt",
        outcome: "Outra pessoa consegue recriar as mesmas dependências.",
        actions: ["Confirme que (.venv) aparece antes de instalar.", "Instale somente pacotes necessários ao projeto.", "Gere requirements.txt depois da instalação e atualize-o quando dependências mudarem.", "Registre no README os comandos de ativação e instalação."],
        evidence: "requirements.txt existe; pip check e importações essenciais passam.",
        commands: `python -m pip install ${profile.install}\npython -m pip freeze | Set-Content -Encoding utf8 requirements.txt\npython -m pip check\npython -m pytest --version`,
      },
      {
        id: "scope-data",
        title: "6. Feche o problema e audite os dados",
        outcome: "Decisão, dados permitidos e critérios de sucesso estão definidos antes do algoritmo.",
        actions: [businessQuestion, profile.dataPlan, "Defina população, unidade, período, target/saída, baseline, métrica técnica e consequência de negócio.", "Crie data/README.md com origem/licença, granularidade, dicionário, qualidade, PII e instruções de obtenção.", "Separe treino/validação/teste por tempo quando houver decisão futura."],
        evidence: "README e data card respondem quem decide o quê, usando qual dado disponível em qual data.",
      },
      {
        id: "implementation",
        title: "7. Implemente a solução em módulos pequenos",
        outcome: "O núcleo roda por comando, não depende da ordem de células e está alinhado à ementa.",
        actions: week.content.map((topic) => `Implemente e demonstre: ${topic}.`),
        evidence: "Código em src/, notebook curto de comunicação e artefatos finais em reports/.",
      },
      {
        id: "validation",
        title: "8. Valide, teste e procure falhas",
        outcome: "A recomendação tem baseline, incerteza, análise de erros e testes automatizados.",
        actions: ["Compare alternativas no mesmo split e com o mesmo orçamento de tuning.", "Analise resultado global, out-of-time e por segmento; mostre onde a solução falha.", "Escreva testes para schema, cálculo conhecido, edge case, reprodutibilidade e leakage.", "Execute lint, testes e compilação; corrija a causa, não esconda warnings."],
        evidence: "Tabela comparativa, análise de erros e suite pytest verde.",
        commands: "python -m ruff check .\npython -m pytest -q\npython -m compileall src",
      },
      {
        id: "documentation",
        title: "9. Documente como produto técnico",
        outcome: "Um leigo entende a decisão e um técnico reproduz o resultado do zero.",
        actions: ["README: contexto, decisão, dados, arquitetura, instalação, execução, método, resultados, limitações, ética/privacidade e próximos passos.", "Adicione docstrings com propósito, parâmetros, retornos, exceções e exemplo; use type hints nas funções públicas.", "Crie data card e, quando houver modelo, model card com população, métrica, threshold, riscos e monitoramento.", "Use títulos conclusivos nos gráficos e registre fonte, unidade e período."],
        evidence: "README revisado seguindo os próprios comandos em um ambiente limpo.",
      },
      {
        id: "publish",
        title: "10. Versione e publique na conta kayhuhu",
        outcome: `Repositório público em https://github.com/kayhuhu/${week.project.repo}.`,
        actions: ["Antes, execute gh auth status e confirme que a conta ativa é kayhuhu.", "Revise git diff e git status; nunca publique token, .env, PII, base bancária, livro ou PDF protegido.", "Faça commit intencional e crie o repositório remoto pela GitHub CLI.", "Se o repositório remoto já existir, use os comandos alternativos indicados no guia de migração do site."],
        evidence: "URL pública, README renderizado, testes reproduzíveis e commit na main.",
        commands: `gh auth status\ngit add .\ngit status --short\ngit commit -m "feat: concluir ${week.project.repo}"\ngh repo create kayhuhu/${week.project.repo} --public --source . --remote origin --push\n# próximos envios:\ngit push`,
      },
    ],
    definitionOfDone: [
      ...week.project.deliverables,
      "O README reproduz instalação e execução em um clone limpo.",
      "Docstrings, type hints, lint e testes cobrem regras críticas.",
      "Nenhum segredo, PII, dado bancário real ou material protegido foi versionado.",
      "Resultado inclui baseline, limitações, impacto bancário e plano de monitoramento.",
      "Você defende método, matemática, falhas e decisão em cinco minutos.",
    ],
  } satisfies Omit<ProjectGuide, "aiPrompt">;

  return { ...base, aiPrompt: buildProjectAiPrompt(week, base) };
}
