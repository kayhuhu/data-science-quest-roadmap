import type { RoadmapWeek } from "@/lib/quest-data";

type ProjectBlueprint = {
  businessQuestion: string;
  dataPlan: string;
  stack: string[];
  install: string;
  implementation: string[];
  validation: string[];
  tests: string[];
};

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
  firstSession: string[];
  repositoryStructure: string[];
  steps: ProjectGuideStep[];
  definitionOfDone: string[];
};

const blueprints: Record<number, ProjectBlueprint> = {
  1: {
    businessQuestion: "Quais características da carteira explicam concentração, assimetria, valores extremos e segmentos que merecem ação?",
    dataPlan: "Use uma base pública anonimizada de clientes ou gere uma carteira sintética com renda, limite, saldo, atraso, segmento e região. Documente no data card que os dados não são reais do banco.",
    stack: ["Python", "pandas", "NumPy", "Seaborn", "Matplotlib", "pytest"],
    install: "pip install pandas numpy matplotlib seaborn scipy jupyter pytest",
    implementation: ["Criar funções reutilizáveis para schema, missing, duplicatas, quantis e outliers.", "Produzir EDA univariada e bivariada por segmento, sem transformar o notebook em uma galeria de gráficos.", "Selecionar cinco achados e conectá-los a uma decisão de carteira.", "Gerar um relatório executivo de uma página com limitações e próximos passos."],
    validation: ["Conferir contagens e estatísticas com pelo menos dois métodos.", "Comparar média e mediana nos grupos assimétricos.", "Verificar se cada gráfico possui pergunta, leitura e consequência."],
    tests: ["Testar medidas para vetor conhecido.", "Testar comportamento com coluna vazia e valores nulos.", "Testar que a rotina não modifica o DataFrame original."],
  },
  2: {
    businessQuestion: "Qual distribuição representa cada fenômeno de risco e quão perto a amostra simulada chega da teoria?",
    dataPlan: "Gere experimentos sintéticos reprodutíveis para Bernoulli, Binomial, Geométrica, Poisson, Uniforme e Normal; salve apenas parâmetros e sementes, não milhões de linhas.",
    stack: ["Python", "NumPy", "SciPy", "pandas", "Matplotlib", "pytest"],
    install: "pip install numpy scipy pandas matplotlib jupyter pytest",
    implementation: ["Definir variável aleatória, suporte, parâmetros e hipótese de uso de cada distribuição.", "Implementar fórmulas de esperança, variância, FDP/FDA ou função de massa.", "Executar Monte Carlo e comparar teoria versus amostra em diferentes tamanhos.", "Criar um mapa de decisão que ajude a escolher e rejeitar distribuições."],
    validation: ["Comparar momentos teóricos e empíricos com tolerância explícita.", "Validar probabilidades acumuladas e quantis com SciPy.", "Mostrar um caso em que uma distribuição aparentemente plausível falha."],
    tests: ["Testar suporte e limites das probabilidades.", "Testar reprodutibilidade com seed fixa.", "Testar aproximação dos momentos em amostra grande."],
  },
  3: {
    businessQuestion: "Uma nova política de crédito melhora conversão sem aumentar inadimplência além do limite aceitável?",
    dataPlan: "Use dados sintéticos de controle e tratamento com conversão, inadimplência, ticket e segmento; registre como os efeitos foram injetados para não fingir evidência real.",
    stack: ["Python", "pandas", "SciPy", "statsmodels", "Seaborn", "pytest"],
    install: "pip install pandas scipy statsmodels seaborn jupyter pytest",
    implementation: ["Escrever hipótese, unidade experimental, métricas primária e de proteção antes de olhar resultados.", "Calcular intervalos, testes de proporção/média e tamanho de efeito.", "Analisar potência, tamanho amostral e diferenças por segmento sem p-hacking.", "Produzir uma decisão: lançar, não lançar ou coletar mais dados."],
    validation: ["Checar balanceamento entre grupos e perdas de observação.", "Separar significância estatística de relevância prática.", "Aplicar correção ou declarar caráter exploratório nas múltiplas comparações."],
    tests: ["Testar cálculo do lift em cenário conhecido.", "Testar decisão nos limites de alfa e margem de negócio.", "Testar tratamento de grupo vazio ou amostra insuficiente."],
  },
  4: {
    businessQuestion: "Quais clientes são realmente semelhantes e como escala e correlação alteram o ranking?",
    dataPlan: "Gere ou use uma tabela anonimizada de clientes com atributos em escalas distintas; inclua variáveis correlacionadas para demonstrar Mahalanobis.",
    stack: ["Python", "NumPy", "pandas", "scikit-learn", "pytest"],
    install: "pip install numpy pandas scikit-learn jupyter pytest",
    implementation: ["Implementar produto interno, normas e distâncias Euclidiana, Manhattan, Minkowski, cosseno e Mahalanobis.", "Comparar cálculo manual, NumPy e scikit-learn.", "Criar ranking de vizinhos antes e depois da padronização.", "Explicar quando correlação e matriz de covariância tornam Mahalanobis instável."],
    validation: ["Comparar funções próprias com referências da biblioteca.", "Verificar simetria, identidade e não negatividade quando aplicável.", "Analisar sensibilidade do ranking à escala e a outliers."],
    tests: ["Testar distâncias com vetores pequenos calculados à mão.", "Testar dimensões incompatíveis.", "Testar covariância singular e tratamento documentado."],
  },
  5: {
    businessQuestion: "Como construir um pipeline de qualidade que trate problemas sem apagar sinal útil nem criar leakage?",
    dataPlan: "Use uma base tabular de risco e injete, de forma rastreável, missings, outliers e categorias raras em cópias de treino e teste.",
    stack: ["Python", "pandas", "scikit-learn", "Pandera", "pytest"],
    install: "pip install pandas scikit-learn pandera jupyter pytest",
    implementation: ["Criar auditoria de schema, duplicatas, faixas, nulos e cardinalidade.", "Comparar imputação simples, por grupo e flags de ausência.", "Comparar remoção, cap, transformação e modelo robusto para outliers.", "Montar ColumnTransformer ajustado somente no treino e gerar data card."],
    validation: ["Comparar distribuição antes/depois por split.", "Provar que estatísticas do teste não entram no fit.", "Avaliar impacto na métrica e em segmentos, não apenas volume tratado."],
    tests: ["Testar schema e faixas proibidas.", "Testar categorias novas no conjunto de teste.", "Testar que transformações preservam número e ordem das linhas."],
  },
  6: {
    businessQuestion: "Quais variáveis permanecem úteis e estáveis quando reduzimos redundância e dimensionalidade?",
    dataPlan: "Use dados tabulares com variáveis contínuas, categóricas, redundantes e temporais; mantenha um período final intocado para estabilidade.",
    stack: ["Python", "pandas", "scikit-learn", "SciPy", "statsmodels", "pytest"],
    install: "pip install pandas scikit-learn scipy statsmodels jupyter pytest",
    implementation: ["Construir mapa de Pearson, Spearman, qui-quadrado e V de Cramér.", "Executar PCA dentro de pipeline com escala e interpretar loadings/scores.", "Comparar filter, RFE, L1 e permutation importance.", "Registrar conjunto final de features, custo de obtenção e risco temporal."],
    validation: ["Executar seleção dentro de cada fold.", "Comparar estabilidade por período e amostras bootstrap.", "Avaliar desempenho e interpretabilidade com e sem PCA."],
    tests: ["Testar associação em relações conhecidas.", "Testar número e ortogonalidade dos componentes.", "Testar ausência de target ou período futuro nas features."],
  },
  7: {
    businessQuestion: "Como transformar notebooks soltos em uma ferramenta de dados instalável, testável e reproduzível?",
    dataPlan: "Inclua pequenos CSV/JSON sintéticos em tests/fixtures e aceite caminhos externos pela CLI; nunca versione uma base sensível.",
    stack: ["Python", "pandas", "Typer", "pytest", "Ruff", "GitHub Actions"],
    install: "pip install pandas typer pytest ruff build",
    implementation: ["Criar pacote src/ com módulos de leitura, validação, resumo e exportação.", "Expor CLI para inspecionar CSV/JSON e salvar relatório.", "Adicionar erros úteis, logging e configuração por argumentos.", "Empacotar, documentar API/CLI e criar release v1.0.0."],
    validation: ["Executar a CLI em fixture válida, arquivo ausente e encoding diferente.", "Instalar o wheel em ambiente limpo.", "Garantir reprodução por requirements ou pyproject travado."],
    tests: ["Testar leitura/escrita e preservação de tipos.", "Testar mensagens de erro e códigos de saída.", "Testar funções puras sem acessar disco real."],
  },
  8: {
    businessQuestion: "Como produzir uma tabela cliente-data correta, auditável e sem multiplicação de linhas ou vazamento temporal?",
    dataPlan: "Crie um banco DuckDB/SQLite com clientes, contas, transações e pagamentos sintéticos, incluindo relacionamentos 1:N e chaves inválidas para auditoria.",
    stack: ["SQL", "DuckDB", "Python", "pandas", "dbt-core", "pytest"],
    install: "pip install duckdb pandas dbt-core dbt-duckdb pytest",
    implementation: ["Desenhar ERD, granularidade e chaves antes das queries.", "Criar DDL com constraints e cargas idempotentes.", "Construir mart cliente-mês com CTEs, joins, agregações e janelas.", "Criar features temporais usando apenas informação disponível na data de referência."],
    validation: ["Auditar unicidade da chave final e cardinalidade de cada join.", "Reconciliar totais com tabelas de origem.", "Usar EXPLAIN e registrar decisões básicas de performance."],
    tests: ["Testar PK/FK, nulos e duplicatas.", "Testar uma linha por cliente-data.", "Testar que nenhuma transação futura entra na feature."],
  },
  9: {
    businessQuestion: "Quão bem um modelo linear prevê gasto ou limite fora do tempo, e onde seus resíduos mostram falhas?",
    dataPlan: "Use uma base tabular pública ou sintética com alvo contínuo, data de referência e segmentos; reserve os períodos finais como out-of-time.",
    stack: ["Python", "pandas", "scikit-learn", "statsmodels", "Seaborn", "pytest"],
    install: "pip install pandas scikit-learn statsmodels seaborn jupyter pytest",
    implementation: ["Criar baseline simples e protocolo de splits antes do modelo.", "Ajustar regressão linear e interpretar coeficientes com cautela.", "Construir diagnóstico de resíduos, heterocedasticidade e influência.", "Comparar MAE, RMSE e R² globalmente e por segmento/período."],
    validation: ["Manter out-of-time intocado até a decisão final.", "Comparar treino, validação e teste com intervalos bootstrap.", "Avaliar extrapolação e estabilidade dos coeficientes."],
    tests: ["Testar métricas em vetores conhecidos.", "Testar pipeline com categoria nova.", "Testar ausência de datas futuras no treino."],
  },
  10: {
    businessQuestion: "Qual família — regularizada, árvore ou GLM — equilibra melhor erro, estabilidade e explicabilidade para severidade?",
    dataPlan: "Use dados de severidade ou contagem com split temporal; inclua exposição quando experimentar GLM Poisson.",
    stack: ["Python", "scikit-learn", "statsmodels", "pandas", "Optuna", "pytest"],
    install: "pip install pandas scikit-learn statsmodels optuna jupyter pytest",
    implementation: ["Criar protocolo único para Ridge, Lasso, Elastic Net, árvore e GLM.", "Padronizar apenas modelos que precisam e tunar dentro da validação.", "Analisar coeficientes, importância, poda e overdispersion.", "Montar tabela champion/challenger incluindo latência e governança."],
    validation: ["Usar os mesmos splits e baseline em todos os modelos.", "Avaliar métricas e estabilidade por período/segmento.", "Verificar resíduos e adequação da família/link do GLM."],
    tests: ["Testar transformações e predição não negativa quando exigida.", "Testar reprodução da busca de hiperparâmetros.", "Testar serialização e inferência do pipeline final."],
  },
  11: {
    businessQuestion: "Qual modelo probabilístico estima inadimplência e qual threshold minimiza o custo de decisão?",
    dataPlan: "Use dados anonimizados ou sintéticos de default com data de referência, classe desbalanceada e custos explícitos de falso positivo/negativo.",
    stack: ["Python", "scikit-learn", "pandas", "Matplotlib", "pytest"],
    install: "pip install pandas scikit-learn matplotlib jupyter pytest",
    implementation: ["Treinar baseline, regressão logística, GaussianNB e BernoulliNB em pipelines adequados.", "Calcular ROC-AUC, PR-AUC, KS, Gini e matriz de confusão.", "Avaliar calibração e curvas de confiabilidade.", "Escolher threshold com matriz de custo e registrar impacto operacional."],
    validation: ["Usar out-of-time e métricas adequadas ao desbalanceamento.", "Comparar discriminação e calibração separadamente.", "Medir resultados e custo por segmento protegido/negócio."],
    tests: ["Testar cálculo de KS/Gini e custo.", "Testar faixa 0–1 das probabilidades.", "Testar pipeline com classe ou categoria rara."],
  },
  12: {
    businessQuestion: "KNN ou SVM detecta melhor fraude quando consideramos escala, dimensionalidade e custo de inferência?",
    dataPlan: "Use base pública anonimizada ou dados sintéticos desbalanceados; se a base for grande, trabalhe com amostra documentada para o KNN.",
    stack: ["Python", "scikit-learn", "pandas", "timeit", "pytest"],
    install: "pip install pandas scikit-learn matplotlib jupyter pytest",
    implementation: ["Criar pipeline obrigatório de escala e baseline.", "Tunar K, métrica e pesos do KNN; C, kernel e gamma do SVM.", "Comparar fronteiras em projeção didática sem confundir com resultado final.", "Medir desempenho, memória e latência de treino/inferência."],
    validation: ["Usar validação estratificada e período final separado.", "Comparar PR-AUC, Recall no orçamento de alertas e custo.", "Testar sensibilidade à dimensão e ao tamanho da amostra."],
    tests: ["Testar que scaler é ajustado apenas no treino.", "Testar inferência em lote e linha única.", "Testar serialização do pipeline escolhido."],
  },
  13: {
    businessQuestion: "Árvore, Random Forest ou Boosting oferece o melhor compromisso entre risco, estabilidade e explicação?",
    dataPlan: "Use um problema tabular de crédito com corte temporal e conjunto de features documentado; preserve um baseline simples.",
    stack: ["Python", "scikit-learn", "pandas", "SHAP opcional", "pytest"],
    install: "pip install pandas scikit-learn matplotlib shap jupyter pytest",
    implementation: ["Treinar árvore controlando profundidade, folhas e poda.", "Treinar Random Forest e Gradient/AdaBoost com orçamento de busca comparável.", "Comparar impurity importance com permutation importance.", "Produzir relatório champion/challenger com estabilidade, latência e governança."],
    validation: ["Fixar splits e orçamento de tunagem.", "Avaliar ROC/PR, KS/Gini, calibração e custo.", "Comparar importância e erro entre períodos e segmentos."],
    tests: ["Testar parâmetros e seeds do pipeline.", "Testar inferência e schema de entrada.", "Testar que artefatos e métricas são reproduzíveis."],
  },
  14: {
    businessQuestion: "Uma MLP agrega valor sobre um ensemble forte em dados tabulares de risco?",
    dataPlan: "Use dados tabulares com treino/validação/teste temporal; normalize numéricas e codifique categorias sem olhar o teste.",
    stack: ["Python", "TensorFlow/Keras", "scikit-learn", "pandas", "pytest"],
    install: "pip install pandas scikit-learn tensorflow matplotlib jupyter pytest",
    implementation: ["Criar baseline de regressão logística e ensemble.", "Definir MLP, função custo, ativações, otimizador e seeds.", "Registrar curvas, early stopping, dropout e regularização.", "Comparar precisão, calibração, latência e custo com o baseline tabular."],
    validation: ["Separar validação do teste final.", "Analisar overfitting pelas curvas e múltiplas seeds.", "Medir calibração e erro por segmento."],
    tests: ["Testar shape e faixa da saída.", "Testar carregamento do modelo salvo.", "Testar pipeline de preprocessing em lote pequeno."],
  },
  15: {
    businessQuestion: "Quais segmentos de clientes são estáveis, interpretáveis e acionáveis — e qual K se justifica?",
    dataPlan: "Use features comportamentais agregadas por cliente, sem identificadores; reserve outra janela temporal para testar estabilidade.",
    stack: ["Python", "scikit-learn", "scikit-learn-extra", "pandas", "pytest"],
    install: "pip install pandas scikit-learn scikit-learn-extra matplotlib jupyter pytest",
    implementation: ["Selecionar features, tratar outliers e padronizar.", "Comparar K-means e K-medoids em vários K.", "Calcular inércia, elbow, silhueta e estabilidade bootstrap.", "Nomear perfis somente após analisar distribuição e criar playbook de ação."],
    validation: ["Combinar índice interno, estabilidade e utilidade de negócio.", "Comparar perfis em outra janela temporal.", "Verificar tamanho mínimo e ausência de cluster definido por erro de dados."],
    tests: ["Testar determinismo com seed.", "Testar atribuição de novos clientes.", "Testar pipeline com outlier extremo e coluna constante."],
  },
  16: {
    businessQuestion: "Qual algoritmo representa melhor grupos de formato irregular e quais pontos merecem investigação como anomalia?",
    dataPlan: "Use dados comportamentais com ruído e densidades variadas; mantenha rótulos sintéticos apenas para diagnóstico, não para treinar clustering.",
    stack: ["Python", "scikit-learn", "SciPy", "pandas", "pytest"],
    install: "pip install pandas scikit-learn scipy matplotlib jupyter pytest",
    implementation: ["Preparar escala/distância e construir gráfico k-distance.", "Comparar DBSCAN, hierárquico e GMM com parâmetros documentados.", "Usar dendrograma, AIC/BIC e probabilidades de pertença.", "Combinar score de anomalia com contexto e criar fila de investigação."],
    validation: ["Avaliar formato, ruído, estabilidade e interpretação.", "Comparar resultados em seeds e períodos.", "Revisar amostra dos extremos antes de chamá-los de fraude."],
    tests: ["Testar classificação core/border/noise em exemplo conhecido.", "Testar soma das probabilidades do GMM.", "Testar score e ordenação de anomalias."],
  },
  17: {
    businessQuestion: "Como classificar reclamações e recuperar casos semanticamente semelhantes respeitando privacidade e vieses?",
    dataPlan: "Use textos públicos ou sintéticos sem PII; crie rótulos de tema e um pequeno conjunto de consultas com documentos relevantes para retrieval@k.",
    stack: ["Python", "scikit-learn", "sentence-transformers", "pandas", "pytest"],
    install: "pip install pandas scikit-learn sentence-transformers jupyter pytest",
    implementation: ["Criar pipeline de limpeza mínima, TF-IDF e classificador baseline.", "Gerar embeddings e índice de similaridade por cosseno.", "Implementar busca semântica com filtros e explicação dos resultados.", "Comparar classificação e retrieval, documentando vieses e privacidade."],
    validation: ["Usar métricas por classe e matriz de confusão.", "Criar conjunto manual de relevância e medir precision/recall@k.", "Inspecionar erros por tamanho, tema e linguagem."],
    tests: ["Testar limpeza sem apagar negação.", "Testar dimensão/normalização dos embeddings.", "Testar busca sem resultado e texto vazio."],
  },
  18: {
    businessQuestion: "Como responder políticas com fonte verificável, recusar quando não há evidência e resistir a prompt injection?",
    dataPlan: "Use documentos próprios ou públicos com permissão; versione pequenos textos de teste, metadados e perguntas esperadas — nunca livros/PDFs protegidos.",
    stack: ["Python", "sentence-transformers", "FAISS/Chroma", "FastAPI", "pytest"],
    install: "pip install sentence-transformers faiss-cpu fastapi uvicorn pydantic pytest",
    implementation: ["Criar ingestão, limpeza, chunking e metadados de origem.", "Indexar embeddings e implementar retrieval com filtros.", "Montar prompt com contexto, citação e regra de recusa.", "Criar avaliação de retrieval, groundedness e ataques de prompt injection."],
    validation: ["Separar avaliação do recuperador e do gerador.", "Medir hit/recall@k, fidelidade e cobertura de citações.", "Testar perguntas sem resposta, conflito de fontes e PII."],
    tests: ["Testar chunking e rastreabilidade de fonte.", "Testar recusa sem evidência suficiente.", "Testar que instrução maliciosa no documento não muda regras do sistema."],
  },
  19: {
    businessQuestion: "Como alocar orçamento sob retorno, risco e capacidade, e quão boa é a solução inteira encontrada?",
    dataPlan: "Crie um cenário sintético de segmentos/propostas com retorno, risco, custo, capacidade e regras; publique os parâmetros, não dados sensíveis.",
    stack: ["Python", "OR-Tools", "pandas", "Matplotlib", "pytest"],
    install: "pip install ortools pandas matplotlib jupyter pytest",
    implementation: ["Escrever conjuntos, parâmetros, variáveis, objetivo e restrições matematicamente.", "Resolver versão LP contínua e interpretar solução/sensibilidade.", "Criar versão binária/integer e comparar arredondamento ingênuo.", "Executar MIP, registrar incumbent, best bound, GAP, tempo e status."],
    validation: ["Checar todas as restrições após a solução.", "Comparar solução com baseline e cenários de orçamento.", "Executar análise de sensibilidade e explicar inviabilidade."],
    tests: ["Testar restrições em solução pequena calculável à mão.", "Testar cenário inviável e status do solver.", "Testar que arredondamento não é aceito sem nova checagem."],
  },
  20: {
    businessQuestion: "Como combinar ETL distribuído, rede de fraude e previsão temporal sem usar Spark quando ele é desnecessário?",
    dataPlan: "Gere transações particionadas por data e relações cliente-dispositivo; use volume local suficiente para demonstrar plano, não para fingir escala real.",
    stack: ["PySpark", "Spark SQL", "NetworkX", "statsmodels", "pytest"],
    install: "pip install pyspark networkx statsmodels pandas pytest",
    implementation: ["Criar ETL PySpark com schema explícito, partições, joins e janelas.", "Inspecionar plano, shuffle, cache e skew; comparar com pandas em amostra.", "Montar grafo cliente-dispositivo e calcular componentes/centralidade.", "Criar lags, split temporal e backtesting para série agregada."],
    validation: ["Reconciliar contagens entre etapas do ETL.", "Medir tempo/partições e justificar uso ou não de Spark.", "Validar grafo e previsão em janelas futuras."],
    tests: ["Testar transformações Spark em fixture pequena.", "Testar ausência de arestas duplicadas indevidas.", "Testar que lags não usam informação futura."],
  },
  21: {
    businessQuestion: "Como combinar sinais de texto, imagem e áudio para priorizar casos sem esconder limitações de cada modalidade?",
    dataPlan: "Use amostras próprias ou públicas permitidas, pequenas e sem PII; para áudio, armazene transcrição e referência, não conteúdo protegido.",
    stack: ["Python", "scikit-learn", "TensorFlow", "OpenCV", "librosa", "pytest"],
    install: "pip install pandas scikit-learn tensorflow opencv-python librosa jupyter pytest",
    implementation: ["Criar baselines independentes para texto, imagem e áudio/transcrição.", "Extrair scores calibrados e definir estratégia de ensemble tardio.", "Construir triagem com limiar, motivo e opção human-in-the-loop.", "Documentar privacidade, viés, falha por modalidade e custo operacional."],
    validation: ["Avaliar cada modalidade antes do ensemble.", "Testar ausência de modalidade e degradação controlada.", "Medir métricas por grupo/canal e revisar falsos positivos."],
    tests: ["Testar shapes, tipos e arquivos inválidos.", "Testar combinação de scores e pesos.", "Testar fallback quando imagem ou áudio não existe."],
  },
  22: {
    businessQuestion: "Como entregar uma decisão bancária ponta a ponta, reproduzível e defensável em até quatro horas de prova?",
    dataPlan: "Escolha um problema único e use dados públicos permitidos ou sintéticos com data, target e granularidade clara. Congele o escopo antes de modelar.",
    stack: ["SQL", "Python", "scikit-learn", "FastAPI/Streamlit opcional", "pytest", "GitHub Actions"],
    install: "pip install pandas scikit-learn duckdb matplotlib pytest fastapi uvicorn",
    implementation: ["Formular decisão, unidade, target, janela, métrica e custo.", "Construir mart SQL, pipeline de qualidade, EDA e baseline.", "Comparar modelos com validação apropriada, threshold e erro por segmento.", "Adicionar um componente extra — clustering, otimização ou RAG — apenas se sustentar a decisão.", "Empacotar, testar, criar arquitetura, relatório executivo, demo e release."],
    validation: ["Executar reprodução do zero em ambiente limpo.", "Fazer simulado cronometrado de quatro horas e registrar lacunas.", "Realizar sabatina gravada cobrindo escolha, risco, monitoramento e limitações."],
    tests: ["Testar schema, transformações, métricas e inferência.", "Testar ausência de leakage com corte temporal.", "Testar comandos do README em clone limpo."],
  },
};

const baseStructure = [
  "README.md — problema, decisão, dados, método, resultados e limitações",
  "data/README.md — origem, licença, schema e instruções de obtenção",
  "notebooks/ — exploração; nenhum código crítico vive apenas aqui",
  "src/ — funções, pipelines e código reutilizável",
  "tests/ — testes unitários e fixtures pequenas",
  "reports/figures/ — gráficos finais versionáveis",
  "requirements.txt ou pyproject.toml — ambiente reproduzível",
];

export function getProjectGuide(week: RoadmapWeek): ProjectGuide {
  const blueprint = blueprints[week.number];
  if (!blueprint) throw new Error(`Guia do projeto da semana ${week.number} não encontrado.`);

  const scaffoldCommands = `git init\ngit checkout -b feat/base-projeto\npython -m venv .venv\n# PowerShell: .\\.venv\\Scripts\\Activate.ps1\n# macOS/Linux: source .venv/bin/activate\npython -m pip install --upgrade pip\n${blueprint.install}\npip freeze > requirements.txt\nmkdir data, notebooks, src, tests, reports\ngit add .\ngit commit -m "chore: estrutura inicial do projeto"`;

  return {
    businessQuestion: blueprint.businessQuestion,
    dataPlan: blueprint.dataPlan,
    stack: blueprint.stack,
    firstSession: [
      `Criar o repositório \`${week.project.repo}\` e uma issue chamada “Definir problema e critério de sucesso”.`,
      `Copiar para o README a pergunta de negócio: “${blueprint.businessQuestion}”`,
      "Criar o ambiente, a estrutura de pastas e o primeiro commit usando os comandos abaixo.",
      "Escolher a fonte dos dados e escrever o data card antes de iniciar qualquer modelo.",
    ],
    repositoryStructure: baseStructure,
    steps: [
      {
        id: "scope",
        title: "1. Feche o problema antes do código",
        outcome: "Um README inicial que deixa claro qual decisão o projeto sustenta.",
        actions: [blueprint.businessQuestion, "Defina unidade de análise, população, janela temporal, alvo/saída e restrições.", "Escolha uma métrica técnica e uma consequência de negócio.", "Liste três riscos: leakage, viés/representatividade e limitação operacional."],
        evidence: "README com seção Problema, Critério de sucesso, Hipóteses e Fora de escopo.",
      },
      {
        id: "scaffold",
        title: "2. Prepare um repositório reproduzível",
        outcome: "Um clone novo consegue instalar dependências e executar a estrutura inicial.",
        actions: ["Crie branch de trabalho; não programe tudo diretamente na main.", "Separe exploração, código reutilizável, testes, dados e relatórios.", "Adicione .gitignore para ambiente, cache, segredos e dados grandes.", "Faça um commit pequeno antes de começar a análise."],
        evidence: "Primeiro commit com ambiente, pastas, README e instrução de execução.",
        commands: scaffoldCommands,
      },
      {
        id: "data",
        title: "3. Obtenha e audite os dados",
        outcome: "Uma entrada rastreável, permitida e compreendida antes de qualquer transformação.",
        actions: [blueprint.dataPlan, "Registre origem, licença, data, granularidade e dicionário das colunas.", "Crie relatório de schema, nulos, duplicatas, faixas, cardinalidade e período.", "Separe treino/validação/teste antes de aprender estatísticas quando houver modelagem."],
        evidence: "data/README.md e relatório de qualidade executável.",
      },
      {
        id: "build",
        title: "4. Implemente o núcleo do projeto",
        outcome: "Uma solução funcional, modular e explicável — não apenas células executadas fora de ordem.",
        actions: blueprint.implementation,
        evidence: "Pipeline em src/, notebook narrativo curto e artefatos finais em reports/.",
      },
      {
        id: "validate",
        title: "5. Valide antes de escolher a resposta",
        outcome: "Métricas e diagnósticos que sustentam a decisão e mostram onde ela falha.",
        actions: blueprint.validation,
        evidence: "Tabela comparativa, gráficos de diagnóstico e seção de análise de erros.",
      },
      {
        id: "quality",
        title: "6. Transforme confiança em testes",
        outcome: "Erros silenciosos importantes passam a quebrar o pipeline automaticamente.",
        actions: [...blueprint.tests, "Execute pytest em ambiente limpo e registre o comando no README.", "Fixe seeds quando possível e não use tolerâncias arbitrárias sem justificativa."],
        evidence: "Suite pytest verde e fixtures pequenas sem dados sensíveis.",
        commands: "pytest -q\npython -m compileall src\ngit status --short",
      },
      {
        id: "communicate",
        title: "7. Converta resultado em decisão",
        outcome: "Uma pessoa técnica ou de negócio entende o que fazer, por quê e com quais ressalvas.",
        actions: ["Escreva um resumo executivo com contexto, resultado, impacto, risco e recomendação.", "Mostre baseline e alternativas rejeitadas.", "Inclua limitações, ética/privacidade, monitoramento e próximo experimento.", "Revise gráficos: título conclusivo, unidade, fonte e leitura em uma frase."],
        evidence: "README final e relatório executivo de uma página.",
      },
      {
        id: "publish",
        title: "8. Publique e prepare a defesa",
        outcome: "Repositório público navegável e uma explicação oral de cinco minutos.",
        actions: ["Abra pull request, revise o diff e faça merge na main.", "Crie tag/release com instruções reproduzíveis.", "Responda sem consulta: problema, método, métrica, resultado, maior erro e limitação.", "Confirme que nenhum token, dado sensível, PDF ou livro foi versionado."],
        evidence: "URL pública, release, README completo e gravação/roteiro de sabatina.",
        commands: "git add .\ngit commit -m \"feat: concluir projeto da semana\"\ngit push -u origin HEAD\n# depois do merge:\ngit tag v1.0.0\ngit push origin v1.0.0",
      },
    ],
    definitionOfDone: [
      ...week.project.deliverables,
      "O README permite reproduzir o resultado do zero.",
      "Os testes passam e nenhum dado/segredo protegido está no Git.",
      "Você explica escolhas, métricas, limitações e aplicação bancária sem consultar.",
      "O repositório possui commit final, release e link registrado no planner.",
    ],
  };
}
