const flashcardTypes = [
  "conceito",
  "interpretação",
  "comparação",
  "quando usar",
  "cenário",
  "fórmula essencial",
  "erro comum",
  "interpretação",
  "quando usar",
  "cenário",
];

const cardIds = [
  "seed-1-definition",
  "seed-1-interpretation",
  "seed-2-definition",
  "seed-2-interpretation",
  "seed-3-definition",
  "seed-3-interpretation",
  "seed-4-definition",
  "seed-4-interpretation",
  "seed-5-definition",
  "seed-5-interpretation",
];

function buildStudyPrompt(week) {
  return `Quero aprender do zero a Semana ${week.number} — ${week.title}, em nível de Cientista de Dados Júnior.

EMENTA DESTA SEMANA:
${week.syllabusFocus.map((item) => `- ${item}`).join("\n")}

Comece por esta intuição, sem assumir conhecimento prévio: ${week.study.opening}

Ensine em uma sequência coerente e específica:
${week.study.sequence.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Para cada conceito, explique o que é e para que serve, por que existe, como funciona, quando usar e quando não usar. Mostre como aparece em Ciência de Dados, como interpretar a saída e como defender a escolha em uma sabatina. Diferencie termos que costumam ser confundidos.

MATEMÁTICA E MECANISMO NECESSÁRIOS:
${week.study.math}
Antes de qualquer fórmula, explique os símbolos, a unidade e a intuição. Use exemplos numéricos pequenos e depois uma aplicação mínima em Python ou SQL, quando fizer sentido.

INTERPRETAÇÃO QUE PRECISO DOMINAR:
${week.study.interpretation}

CASO BANCÁRIO CONDUTOR:
${week.study.bankCase}
Mostre a população, a unidade de análise, as entradas, a saída, a decisão apoiada, o custo do erro e a limitação operacional.

ERROS E LIMITAÇÕES A DISCUTIR:
${week.study.mistakes.map((item) => `- ${item}`).join("\n")}

LIMITE DE ESCOPO:
${week.study.boundary}

Entregue uma apostila autossuficiente com exemplos resolvidos, exercícios curtos com gabarito, aplicação mínima comentada, perguntas de sabatina aplicada com respostas ideais, resumo, mapa “quando usar / quando evitar” e checklist de domínio. O material só estará completo se eu conseguir explicar, aplicar e interpretar cada item da ementa sem depender do código.`;
}

function buildPracticePrompt(week) {
  return `Atue como meu tutor no Mini Lab da Semana ${week.number} — ${week.title}.

Vou trabalhar com: ${week.starterAssets.map((asset) => asset.label).join(", ")}.

OBJETIVO PRÁTICO:
${week.practice.objective}

NÃO entregue o Mini Lab inteiro pronto. Trabalhe comigo uma etapa por vez nesta ordem:
${week.practice.sequence.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Em cada etapa: explique o que faremos e por quê; apresente somente o código ou consulta indispensável; peça para eu executar; espere o resultado; pergunte “O que esse resultado significa?”; corrija minha interpretação; e só então avance.

Durante o trabalho, cobre estas decisões específicas: ${week.practice.decisions.join("; ")}.

Ao final, ajude-me a escrever conclusões sobre ${week.practice.conclusion}. Depois revise comigo o README, os arquivos entregáveis e os comandos git add, commit, push, abertura de Pull Request e merge. Termine com cinco perguntas curtas para verificar se eu realmente aprendi. Não resolva etapas futuras antes da minha tentativa.`;
}

function makeAssets(week, assets) {
  return assets.map(([label, type, description]) => ({
    label,
    type,
    url: `/labs/week-${String(week).padStart(2, "0")}/${label}`,
    description,
  }));
}

const blueprints = [
  {
    number: 1,
    title: "Propriedades de Distribuições",
    syllabusFocus: ["Propriedades de distribuições: médias, medianas, quartis, moda, variância e medidas relacionadas"],
    whyThisMatters: "Antes de modelar, um Cientista de Dados precisa saber onde os valores se concentram, quanto variam e se poucos extremos estão distorcendo a leitura. Essas medidas sustentam descrições honestas da carteira e evitam decisões baseadas em um cliente ‘médio’ que quase não existe.",
    dataScienceUse: ["resumir uma variável antes de modelar", "comparar carteiras e segmentos", "escolher medidas robustas diante de assimetria", "detectar extremos que exigem investigação"],
    bankingContext: "Em renda, saldo, limite e valor de transação, média e mediana podem contar histórias muito diferentes. Quartis e percentis ajudam a dimensionar políticas; dispersão e IQR mostram heterogeneidade e extremos.",
    study: { opening: "o que significa observar uma distribuição, localizar seu centro e medir sua dispersão", sequence: ["média, mediana e moda e como escolher entre elas", "quartis, percentis e leitura de P90", "amplitude, variância, desvio padrão e suas unidades", "IQR, assimetria e influência de valores extremos", "histograma e boxplot apenas como apoio à interpretação"], math: "Calcule cada medida em amostras pequenas; explique por que a variância fica na unidade ao quadrado e o desvio padrão volta à unidade original.", interpretation: "Decidir qual medida descreve o cliente típico, comparar dispersões e explicar o efeito de remover temporariamente um extremo.", bankCase: "Uma carteira de clientes com rendas assimétricas e poucas transações muito altas.", mistakes: ["tratar todo extremo como erro", "usar média sem observar assimetria", "confundir variância com desvio padrão"], boundary: "Não transforme a semana em EDA completa, análise bivariada, correlação, dashboard ou storytelling." },
    practice: { objective: "calcular e interpretar centro, percentis e dispersão em uma carteira simples", sequence: ["carregar o CSV e conferir tipos", "calcular média, mediana e moda", "calcular Q1, Q3 e P90", "calcular amplitude, variância, desvio padrão e IQR", "comparar resultados antes e depois do maior valor", "registrar conclusões bancárias"], decisions: ["média versus mediana", "medida robusta", "extremo legítimo versus possível erro"], conclusion: "qual medida representa melhor o cliente típico e como os extremos alteram a decisão" },
    assets: [["week-01-propriedades-distribuicoes.csv", "csv", "Base sintética com 80 clientes, assimetria e poucos valores altos para praticar centro e dispersão."]],
    cards: ["Quando a mediana representa melhor o cliente típico que a média?", "O que significa dizer que um cliente está no P90?", "O que o IQR mede e quais observações ele resume?", "Como quartis diferem de uma divisão em faixas arbitrárias?", "Duas carteiras têm a mesma média e dispersões diferentes: o que muda?", "Por que a variância tem unidade ao quadrado e o desvio padrão não?", "Qual é o erro de remover todo valor extremo automaticamente?", "Como um extremo afeta média e mediana de maneiras diferentes?", "Quando a moda acrescenta informação útil?", "Que medida usaria para resumir renda muito assimétrica e por quê?"],
  },
  {
    number: 2,
    title: "Variáveis Aleatórias, FDP/FDA e Distribuições",
    syllabusFocus: ["Variáveis aleatórias contínuas e discretas", "Função densidade de probabilidade e distribuição acumulada", "Normal, Bernoulli, Binomial, Uniforme, Poisson e Geométrica"],
    whyThisMatters: "Modelos probabilísticos começam ao traduzir um fenômeno incerto em uma variável com suporte e distribuição coerentes. Saber distinguir probabilidade, densidade e acumulada evita usar uma distribuição conveniente em um processo que ela não representa.",
    dataScienceUse: ["representar alvos binários, contagens e valores contínuos", "simular cenários incertos", "calcular probabilidades e percentis", "avaliar se uma hipótese de distribuição é plausível"],
    bankingContext: "Default individual é Bernoulli; quantidade de defaults em uma carteira pode ser Binomial; eventos por intervalo podem ser aproximados por Poisson; tempos de espera discretos podem ser Geométricos.",
    study: { opening: "incerteza, resultado possível e a ideia de associar um número a um experimento aleatório", sequence: ["variável aleatória discreta versus contínua e suporte", "probabilidade versus densidade", "FDP/PMF e FDA e como lê-las", "Normal e Uniforme", "Bernoulli, Binomial, Poisson e Geométrica", "como escolher uma distribuição pelo mecanismo gerador"], math: "Use soma para probabilidades discretas, área para contínuas e P(X≤x) para a FDA; explique parâmetros e compare média/variância sem derivações longas.", interpretation: "Reconhecer o tipo de variável, ler probabilidades acumuladas e justificar por que uma distribuição serve ou não serve ao fenômeno.", bankCase: "Modelar default, número de chamados e tempo até um evento em operações bancárias.", mistakes: ["interpretar altura da densidade como probabilidade", "assumir Normal para perdas com cauda pesada", "confundir Bernoulli com Binomial"], boundary: "Não avance para inferência acadêmica nem provas formais; mantenha foco em mecanismo, leitura e escolha." },
    practice: { objective: "simular as seis distribuições e relacionar cada formato a um fenômeno bancário", sequence: ["abrir o notebook inicial", "simular variáveis discretas", "simular variáveis contínuas", "comparar frequências e densidades", "calcular acumuladas e probabilidades", "justificar uma distribuição por caso"], decisions: ["discreto versus contínuo", "probabilidade versus densidade", "mecanismo gerador da distribuição"], conclusion: "qual distribuição representa cada caso e quais premissas limitam a aproximação" },
    assets: [["week-02-simulacao-distribuicoes.ipynb", "ipynb", "Notebook inicial com células vazias e parâmetros para simular as distribuições da ementa."]],
    cards: ["Por que default individual é Bernoulli e não Binomial?", "Qual é a diferença entre variável discreta e contínua?", "O que a FDA responde em qualquer ponto x?", "Por que a altura de uma densidade não é uma probabilidade isolada?", "Quando a Normal é uma aproximação razoável?", "Como interpretar os parâmetros n e p da Binomial?", "Qual erro ocorre ao usar Poisson quando a taxa varia muito?", "O que a Geométrica mede em um processo de tentativas?", "Quando a Uniforme é uma hipótese defensável?", "Qual distribuição escolheria para quantidade de fraudes por hora e por quê?"],
  },
  {
    number: 3,
    title: "Testes de Hipóteses",
    syllabusFocus: ["Testes de hipóteses"],
    whyThisMatters: "Diferenças entre grupos aparecem mesmo quando não existe efeito real. Testes de hipóteses ajudam a quantificar quão compatível o resultado é com uma referência, mas a decisão só é útil quando efeito, incerteza e custo de negócio são interpretados juntos.",
    dataScienceUse: ["avaliar experimentos e políticas", "comparar médias e proporções", "verificar associação entre categorias", "separar significância estatística de relevância prática"],
    bankingContext: "Um banco pode testar se uma nova abordagem de cobrança elevou a recuperação ou se uma política de crédito alterou a inadimplência, sem concluir causalidade apenas por um p-valor pequeno.",
    study: { opening: "a pergunta ‘a diferença observada pode ser apenas variação aleatória?’", sequence: ["H0, H1 e definição prévia da pergunta", "alfa, p-valor e estatística de teste", "erros Tipo I e II e poder em intuição", "teste unilateral versus bilateral", "teste t, proporções e qui-quadrado", "intervalo de confiança, tamanho do efeito e decisão"], math: "Explique estatística de teste como diferença padronizada e p-valor como probabilidade condicional sob H0; não trate p-valor como P(H0).", interpretation: "Relatar evidência, direção, magnitude, intervalo, premissas e consequência operacional, sem limitar a conclusão a ‘rejeita/não rejeita’. ", bankCase: "Experimento controle versus tratamento em uma política de cobrança ou oferta de crédito.", mistakes: ["dizer que p-valor é a probabilidade de H0", "confundir significância com ganho econômico", "escolher o teste depois de ver o resultado"], boundary: "Não aprofunde demonstrações de distribuições amostrais; foque escolha do teste e interpretação responsável." },
    practice: { objective: "comparar controle e tratamento, medir efeito e redigir uma decisão defensável", sequence: ["inspecionar grupos e métrica", "formular H0 e H1", "escolher o teste pelo tipo de variável", "calcular p-valor e intervalo", "medir tamanho do efeito", "escrever decisão e limitações"], decisions: ["teste de médias versus proporções", "unilateral versus bilateral", "significância versus relevância"], conclusion: "se a evidência sustenta mudança de política e qual risco de erro permanece" },
    assets: [["week-03-teste-politica.csv", "csv", "Resultados sintéticos de controle e tratamento para testar taxa e valor recuperado."]],
    cards: ["O que H0 representa em um teste de política?", "Por que não rejeitar H0 não prova que ela é verdadeira?", "Como interpretar p-valor sem dizer P(H0)?", "Quando um teste unilateral é justificável?", "Que teste escolher para comparar duas taxas de conversão?", "Como erros Tipo I e II aparecem em uma política de crédito?", "Qual o erro de olhar apenas p < 0,05?", "Por que tamanho do efeito deve acompanhar significância?", "Quando usar qui-quadrado em dados bancários?", "Como comunicar um resultado estatisticamente significativo mas economicamente pequeno?"],
  },
  {
    number: 4,
    title: "Álgebra",
    syllabusFocus: ["Matrizes e Vetores", "Álgebra Matricial", "Distâncias e produto interno"],
    whyThisMatters: "Uma base tabular é uma matriz e cada cliente pode ser visto como um vetor de features. Distâncias, normas e produto interno sustentam similaridade, KNN, clustering, PCA e modelos lineares, por isso a intuição geométrica importa mais que cálculos longos à mão.",
    dataScienceUse: ["representar dados para algoritmos", "medir proximidade entre observações", "calcular scores lineares", "entender por que escala muda vizinhos e clusters"],
    bankingContext: "Clientes podem ser comparados por vetores de renda, uso do limite e frequência; coeficientes e features combinados por produto interno formam scores.",
    study: { opening: "um cliente como vetor, uma base como matriz e cada feature como dimensão", sequence: ["vetores, matrizes, dimensões e transposta", "operações e multiplicação matricial em intuição", "produto interno, norma e alinhamento", "distâncias Euclidiana, Manhattan, Minkowski e Mahalanobis", "similaridade de cosseno", "efeito da escala na geometria"], math: "Calcule produto interno, norma e distâncias em vetores de duas dimensões; explique a forma matricial Xβ sem exigir cálculo matricial avançado.", interpretation: "Explicar por que dois clientes são próximos sob uma métrica e deixam de ser após mudar escala ou noção de distância.", bankCase: "Encontrar clientes comportamentalmente semelhantes e interpretar um score linear de risco.", mistakes: ["comparar variáveis em escalas incompatíveis", "escolher distância sem considerar significado", "confundir similaridade de cosseno com distância Euclidiana"], boundary: "Não transforme a semana em curso formal de álgebra linear nem em cálculo manual extenso de matrizes." },
    practice: { objective: "representar clientes como vetores e comparar vizinhança antes e depois da padronização", sequence: ["carregar a matriz cliente × feature", "calcular produto interno e normas", "calcular Euclidiana e Manhattan", "padronizar as features", "recalcular as distâncias", "explicar a mudança de vizinhos"], decisions: ["métrica de distância", "necessidade de escala", "interpretação de similaridade"], conclusion: "como representação, escala e métrica alteram a definição de cliente semelhante" },
    assets: [["week-04-vetores-clientes.csv", "csv", "Pequena matriz cliente × atributo com escalas diferentes para comparar distâncias."]],
    cards: ["Como uma linha de uma base vira um vetor?", "O que as colunas de uma matriz X representam?", "Qual a relação entre produto interno e um score linear?", "Como norma difere de distância?", "Quando Manhattan pode ser preferível à Euclidiana?", "Como calcular intuitivamente a distância Euclidiana entre dois clientes?", "Por que saldo domina frequência se os dados não forem escalados?", "O que a similaridade de cosseno mede?", "Quando Mahalanobis acrescenta informação?", "Por que os vizinhos mudam depois da padronização?"],
  },
  {
    number: 5,
    title: "Data Prep: Missings, Outliers e Categorização",
    syllabusFocus: ["Tratamento de missings", "Tratamento de outliers", "Categorização de variáveis contínuas e discretas"],
    whyThisMatters: "Dados reais chegam incompletos, com extremos e categorias que modelos não entendem diretamente. Tratar sem investigar a causa pode apagar risco, inventar ordem e causar leakage; o pipeline precisa aprender transformações apenas no treino.",
    dataScienceUse: ["imputar ausências com critério", "investigar e tratar extremos", "codificar categorias para modelos", "encapsular preparação sem vazamento"],
    bankingContext: "Renda ausente pode significar falha ou falta de comprovação; transação extrema pode ser fraude legítima de investigar; estado civil é nominal e não deve receber ordem artificial.",
    study: { opening: "o problema de dados incompletos, extremos e categorias e o risco de destruir informação", sequence: ["causas de missing e MCAR/MAR/MNAR em nível intuitivo", "remoção, imputação e indicador de ausência", "outlier versus erro e diagnóstico por IQR", "transformação, winsorização e quando não tratar", "binning de contínuas", "one-hot, ordinal/label e target encoding", "ColumnTransformer, pipeline e leakage"], math: "Mostre mediana, IQR e limites Q1−1,5×IQR/Q3+1,5×IQR; explique encoding como representação, não como informação nova.", interpretation: "Justificar cada tratamento pela causa, pelo modelo e pelo momento do split; verificar o que a transformação mudou.", bankCase: "Preparar cadastro e transações para um modelo de risco sem aprender informação do teste.", mistakes: ["imputar antes do split", "remover todo extremo", "usar label encoding em categoria nominal como se houvesse ordem"], boundary: "Não antecipe PCA, seleção de variáveis ou balanceamento de classes." },
    practice: { objective: "montar um pipeline de missing, outlier e categoria sem leakage", sequence: ["carregar a base suja e criar treino/teste", "diagnosticar ausências por coluna", "definir imputação numérica e categórica", "investigar extremos com IQR", "configurar one-hot/ordinal corretamente", "ajustar o ColumnTransformer somente no treino"], decisions: ["causa do missing", "extremo legítimo", "encoder compatível com a categoria"], conclusion: "quais tratamentos foram escolhidos, quais riscos permanecem e como o pipeline evita vazamento" },
    assets: [["week-05-base-dados-suja.csv", "csv", "Base sintética com ausências, extremos plausíveis e categorias nominais/ordinais."]],
    cards: ["Quando criar um indicador de ausência além de imputar?", "Como a causa do missing muda o tratamento?", "Por que um outlier não é automaticamente um erro?", "Quando winsorizar pode esconder risco?", "Qual encoder usar para estado civil?", "Como o limite por IQR é calculado e interpretado?", "Onde ocorre leakage ao imputar antes do split?", "Qual a diferença entre label e one-hot encoding?", "Quando binning pode ajudar a interpretação?", "Como trataria renda ausente em um modelo de crédito?"],
  },
  {
    number: 6,
    title: "Data Prep: PCA, Associação e Seleção",
    syllabusFocus: ["PCA", "Correlação/associação entre dados contínuos e discretos", "Seleção de variáveis"],
    whyThisMatters: "Muitas features podem carregar a mesma informação, aumentar custo e tornar modelos instáveis. Associação ajuda a enxergar redundância; seleção remove o que não ajuda; PCA projeta os dados em componentes que resumem variância com perda de interpretabilidade.",
    dataScienceUse: ["detectar redundância e multicolinearidade", "reduzir dimensionalidade", "selecionar features úteis", "equilibrar desempenho, estabilidade e explicabilidade"],
    bankingContext: "Variáveis de renda, limite e exposição podem ser altamente correlacionadas. Em risco, reduzir redundância melhora estabilidade, mas componentes de PCA podem ser difíceis de explicar a áreas reguladas.",
    study: { opening: "muitas features, redundância e a diferença entre escolher variáveis e criar novas direções", sequence: ["Pearson, Spearman e correlação versus causalidade", "associação categórica e V de Cramér", "multicolinearidade e redundância", "seleção filter, wrapper e embedded", "PCA como projeção após escala", "componentes e variância explicada", "trade-off de interpretação"], math: "Explique correlação em [-1,1], covariância, combinação linear e variância explicada; trate autovetores apenas como direções principais, sem derivação.", interpretation: "Ler matriz de associação, justificar remoção/seleção e escolher quantidade de componentes sem vender PCA como seleção de features.", bankCase: "Simplificar uma base de risco com dezenas de medidas financeiras correlacionadas.", mistakes: ["confundir correlação com causalidade", "aplicar PCA sem escalar", "usar o target ou todo o dataset para selecionar features"], boundary: "Não antecipe regressão completa; use modelos apenas como apoio para avaliar seleção." },
    practice: { objective: "comparar associação, seleção e PCA em uma base propositalmente correlacionada", sequence: ["carregar e separar features/target", "medir correlação contínua e associação categórica", "identificar redundância", "executar um método simples de seleção", "padronizar e ajustar PCA no treino", "comparar variância explicada e interpretabilidade"], decisions: ["Pearson versus Spearman", "seleção versus PCA", "quantidade de componentes"], conclusion: "qual representação manteria em um caso bancário e que explicabilidade seria perdida" },
    assets: [["week-06-features-correlacionadas.csv", "csv", "Base de crédito com pares de features redundantes, categorias e alvo para seleção/PCA."]],
    cards: ["Por que correlação alta entre features pode ser um problema?", "Quando Spearman é preferível a Pearson?", "O que V de Cramér mede?", "Por que correlação não demonstra causalidade?", "Qual a diferença entre seleção de variáveis e PCA?", "O que significa 80% de variância explicada?", "Qual o erro de aplicar PCA antes da padronização?", "Por que componentes são menos interpretáveis?", "Quando um método embedded faz sentido?", "Usaria PCA em um score regulado? Que trade-off explicaria?"],
  },
  {
    number: 7,
    title: "Programação",
    syllabusFocus: ["Fluência na sintaxe básica", "Leitura e escrita de dados", "Pacotes principais de Machine Learning em Python ou R"],
    whyThisMatters: "Programação transforma raciocínio analítico em trabalho reproduzível. Um Cientista de Dados Júnior precisa ler formatos comuns, manipular tabelas, criar funções claras e usar a API fit/transform/predict sem depender de copiar células desconectadas.",
    dataScienceUse: ["ler e validar dados em vários formatos", "manipular tabelas com pandas", "automatizar regras em funções", "treinar e usar pipelines do scikit-learn"],
    bankingContext: "Rotinas confiáveis integram cadastro, transações e resultados de modelos, mantendo tipos, chaves e regras de negócio verificáveis.",
    study: { opening: "um fluxo reprodutível que recebe dados, transforma, valida e entrega uma saída", sequence: ["variáveis, tipos, condicionais, loops e funções", "listas, dicionários e tratamento de erros", "NumPy necessário e pandas", "filtros, groupby, merge e datas", "CSV, Excel, JSON e Parquet", "scikit-learn: fit, transform, predict e Pipeline", "venv, requirements e Git/GitHub"], math: "Não há foco matemático; explique formas, tipos, índices, vetorização e contrato de entrada/saída das funções.", interpretation: "Ler mensagens de erro, conferir shape/dtypes/chaves e validar se a transformação preservou o grão.", bankCase: "Construir uma rotina que consolida transações por cliente e prepara features para um modelo.", mistakes: ["loops desnecessários sobre DataFrames", "merge que duplica linhas", "não fixar dependências ou validar tipos"], boundary: "Não vire curso de engenharia de software avançada nem aprofunde algoritmos de ML nesta semana." },
    practice: { objective: "construir um pequeno pipeline de leitura, transformação, validação e escrita em formatos reais", sequence: ["criar e ativar venv", "ler CSV, JSON e Parquet", "validar tipos e chaves", "filtrar, agrupar e combinar tabelas", "encapsular regras em funções", "salvar resultado e requirements"], decisions: ["formato adequado", "grão da tabela", "validação de merge"], conclusion: "como tornar a rotina reproduzível e segura para dados bancários" },
    assets: [["week-07-clientes.csv", "csv", "Cadastro sintético de clientes."], ["week-07-transacoes.json", "json", "Transações sintéticas em JSON para normalização."], ["week-07-produtos.parquet", "parquet", "Tabela Parquet real com produtos e categorias."]],
    cards: ["Quando usar função em vez de repetir células?", "Que verificações fazer logo após ler uma base?", "Como groupby altera o grão dos dados?", "Por que merge pode multiplicar clientes?", "Quando Parquet é preferível a CSV?", "Qual a diferença entre fit, transform e predict?", "Qual o risco de não usar ambiente virtual?", "O que requirements.txt torna reproduzível?", "Quando vectorização é melhor que iterrows?", "Como validaria uma tabela de features antes de salvar?"],
  },
  {
    number: 8,
    title: "Banco de Dados",
    syllabusFocus: ["Modelo relacional", "Sintaxe SQL", "Join, group by, order by e álgebra relacional", "Chaves primárias, secundárias e estrangeiras"],
    whyThisMatters: "Modelos dependem de uma base analítica correta. SQL e modelo relacional permitem combinar tabelas sem perder o grão, entender chaves e produzir features; um join incorreto pode duplicar clientes e invalidar toda a análise.",
    dataScienceUse: ["montar bases analíticas", "agregar eventos no grão correto", "relacionar cadastro, contratos e transações", "auditar duplicação e qualidade de chaves"],
    bankingContext: "Dados bancários ficam em tabelas de clientes, contas, contratos e eventos. A base para risco deve respeitar a data de referência e não misturar eventos futuros.",
    study: { opening: "dados espalhados em tabelas e a necessidade de relacioná-los sem mudar a unidade de análise", sequence: ["tabela, linha, coluna, grão e relacionamento", "chave primária, estrangeira e candidata/secundária", "SELECT, WHERE, CASE e NULL", "agregações, GROUP BY, HAVING e ORDER BY", "INNER e LEFT JOIN e cardinalidade", "CTE e window functions introdutórias", "índices e validações de qualidade"], math: "Use contagens e cardinalidades 1:1, 1:N e N:N; foque álgebra relacional como seleção, projeção, junção e agregação.", interpretation: "Explicar quantas linhas deveriam existir antes/depois de cada join e por que o resultado mantém o grão.", bankCase: "Criar uma feature mart por cliente e mês sem usar transações posteriores à data de referência.", mistakes: ["join N:N acidental", "agregar no grão errado", "transformar LEFT JOIN em INNER ao filtrar a tabela da direita"], boundary: "Não aprofunde administração de banco, tuning avançado ou arquitetura distribuída." },
    practice: { objective: "montar uma base analítica em SQLite usando consultas verificáveis", sequence: ["abrir o banco e listar tabelas", "inspecionar chaves e grãos", "filtrar clientes elegíveis", "agregar transações por cliente", "fazer LEFT JOIN com validação de contagens", "usar CTE e uma window function", "salvar queries e conclusões"], decisions: ["tipo de join", "grão final", "tratamento de NULL"], conclusion: "por que a base final tem uma linha por cliente e está livre de duplicação/leakage" },
    assets: [["week-08-banco-clientes.sql", "sql", "Script com esquema, dados sintéticos e exercícios de SQL."], ["week-08-banco-clientes.sqlite", "sqlite", "Banco SQLite pronto com clientes, contas e transações."]],
    cards: ["O que define o grão de uma tabela?", "Qual a função de uma chave estrangeira?", "Como INNER JOIN difere de LEFT JOIN?", "Quando HAVING é usado em vez de WHERE?", "Por que um join N:N pode duplicar clientes?", "Como COUNT(*) e COUNT(coluna) tratam NULL?", "Qual erro ocorre ao filtrar a tabela direita após LEFT JOIN?", "O que uma CTE melhora em uma consulta?", "Quando uma window function preserva linhas?", "Como validaria uma feature mart de uma linha por cliente?"],
  },
  {
    number: 9,
    title: "Regressão Linear e Resíduos",
    syllabusFocus: ["Regressão Linear", "Análise de Resíduos", "MAE, RMSE e R²", "Holdout, leave-one-out, k-fold, out-of-sample e out-of-time"],
    whyThisMatters: "Regressão linear é um baseline interpretável para alvos numéricos e ajuda a entender relações entre features e resposta. Coeficientes só são defensáveis quando premissas, resíduos, multicolinearidade e validação fora da amostra são examinados.",
    dataScienceUse: ["prever valores contínuos", "criar baseline interpretável", "medir erro por MAE/RMSE/R²", "diagnosticar estrutura restante nos resíduos"],
    bankingContext: "Pode estimar gasto, saldo ou perda esperada aproximada. Em crédito, a separação temporal evita avaliar no passado um comportamento aprendido com o futuro.",
    study: { opening: "diferença entre regressão e classificação, target numérico, X, y e a ideia de ajustar uma relação linear", sequence: ["regressão simples e múltipla", "intercepto, coeficientes e previsão", "mínimos quadrados e resíduos", "premissas e análise de resíduos", "multicolinearidade, preprocessing e pipeline", "overfitting, underfitting e baseline", "MAE, RMSE, R² e validações aplicáveis"], math: "Explique ŷ=β0+β1x1+… e resíduo y−ŷ; compare MAE e RMSE pela penalização do erro e leia R² como comparação com a média, não como acurácia.", interpretation: "Ler sinal/unidade de coeficientes, distribuição e padrão dos resíduos, diferença treino-teste e adequação da validação temporal.", bankCase: "Estimar gasto mensal ou severidade de perda com variáveis de perfil e comportamento.", mistakes: ["interpretar correlação como causalidade", "manter features altamente colineares sem diagnóstico", "usar métricas de classificação em regressão"], boundary: "Não inclua AUC, KS, Gini, F1, Recall ou Precision; árvore, L1/L2 e GLM ficam na Semana 10." },
    practice: { objective: "treinar uma regressão linear, avaliar erros e analisar resíduos com interpretação bancária", sequence: ["carregar o CSV e definir X/y", "separar treino e teste", "criar baseline da média", "treinar LinearRegression com fit", "gerar predict", "calcular MAE, RMSE e R²", "analisar resíduos e segmentos"], decisions: ["features e target", "holdout versus divisão temporal", "MAE versus RMSE"], conclusion: "se o modelo supera o baseline, onde erra e se os resíduos revelam inadequação" },
    assets: [["week-09-carteira-regressao-linear.csv", "csv", "Carteira sintética com alvo contínuo, relação linear, ruído e features correlacionadas."]],
    cards: ["Qual diferença define regressão versus classificação?", "O que um coeficiente linear representa mantendo outras features fixas?", "Como intercepto difere de resíduo?", "Quando RMSE deve preocupar mais que MAE?", "O que R² igual a zero indica em relação ao baseline?", "Como o resíduo é calculado e lido?", "Por que multicolinearidade desestabiliza coeficientes?", "Que padrão nos resíduos sugere não linearidade?", "Quando usar split out-of-time?", "Como explicaria overfit e underfit em regressão?"],
  },
  {
    number: 10,
    title: "Regularização, Árvore de Regressão e GLM",
    syllabusFocus: ["Regularização L1 e L2", "Árvore de Regressão", "Modelos lineares generalizados (GLM)"],
    whyThisMatters: "Nem toda relação numérica é bem tratada pela regressão linear simples. Regularização controla coeficientes e variância, árvores capturam cortes não lineares e GLMs adaptam distribuição e ligação ao tipo de resposta.",
    dataScienceUse: ["reduzir overfitting com L1/L2", "capturar não linearidade com árvores", "modelar respostas não Normais com GLM", "comparar famílias com validação coerente"],
    bankingContext: "Severidade de perda positiva e assimétrica pode pedir outro GLM; árvores capturam faixas de renda/uso; Lasso pode zerar features, enquanto Ridge estabiliza coeficientes correlacionados.",
    study: { opening: "por que um modelo linear pode overfitar, por que penalizar coeficientes e por que existem árvores e GLMs", sequence: ["Ridge/L2 e efeito de encolhimento", "Lasso/L1 e esparsidade", "escala e escolha de lambda/alpha", "estrutura e splits da árvore de regressão", "profundidade, folha e overfitting", "GLM: família, função de ligação e resposta", "comparação com validação de regressão"], math: "Mostre perda + λΣβ² versus perda + λΣ|β|; explique split por redução de erro e GLM por g(E[y])=Xβ em intuição.", interpretation: "Comparar coeficientes, profundidade e erros fora da amostra; explicar qual família/ligação combina com o alvo.", bankCase: "Comparar modelos para estimar severidade de perda e escolher o mais estável e explicável.", mistakes: ["regularizar sem escalar", "deixar árvore crescer sem controle", "escolher família de GLM incompatível com o suporte do alvo"], boundary: "Não transforme em catálogo de todos os GLMs nem antecipe classificação por árvores." },
    practice: { objective: "comparar Linear, Ridge, Lasso, árvore e um GLM adequado no mesmo alvo contínuo", sequence: ["carregar e dividir a base", "padronizar para L1/L2 dentro do pipeline", "ajustar Ridge e Lasso", "ajustar árvore com profundidade controlada", "ajustar um GLM simples", "comparar MAE/RMSE e estabilidade", "justificar o modelo final"], decisions: ["L1 versus L2", "profundidade da árvore", "família e ligação do GLM"], conclusion: "qual modelo equilibra erro, estabilidade e explicabilidade para a decisão" },
    assets: [["week-10-modelos-regressao.csv", "csv", "Base sintética de severidade com não linearidade, correlação e alvo positivo."]],
    cards: ["Como L1 e L2 alteram coeficientes de formas diferentes?", "Quando Ridge é preferível com features correlacionadas?", "Por que Lasso pode zerar coeficientes?", "Qual o papel de alpha/lambda?", "Como uma árvore de regressão escolhe um corte?", "Que hiperparâmetro controla diretamente a complexidade da árvore?", "Qual erro há em comparar L1/L2 sem escala?", "O que família e função de ligação fazem em um GLM?", "Quando uma árvore supera uma relação linear?", "Qual modelo escolheria para perda positiva assimétrica e o que validaria?"],
  },
  {
    number: 11,
    title: "Regressão Logística e Naive Bayes",
    syllabusFocus: ["Regressão Logística", "Naive Bayes", "Métricas e validação de classificação aplicáveis"],
    whyThisMatters: "Classificação transforma features em probabilidade ou classe e exige escolher threshold pelo custo de falsos positivos e negativos. Logística oferece interpretação; Naive Bayes combina evidências sob independência condicional e pode ser muito eficiente.",
    dataScienceUse: ["estimar propensão e risco binário", "criar baseline probabilístico", "classificar texto/contagens com Naive Bayes", "avaliar ranking e decisão por threshold"],
    bankingContext: "Default, fraude e propensão são eventos binários. Recall pode ser priorizado para não perder fraudes; Precision importa quando a investigação é cara; AUC/Gini/KS avaliam separação/ranking.",
    study: { opening: "classe, probabilidade, threshold, falso positivo e falso negativo", sequence: ["Logística: sigmoide, odds, log-odds e coeficientes", "threshold e matriz de confusão", "Accuracy, Precision, Recall e F1", "ROC, AUC, Gini e KS", "Bayes: prior, likelihood e posterior", "premissa de independência condicional", "Gaussian, Bernoulli e Multinomial NB", "validação e desbalanceamento em contexto"], math: "Explique p=1/(1+e^-z), odds e Bayes P(y|x)∝P(x|y)P(y); relacione Gini=2×AUC−1 sem provas longas.", interpretation: "Escolher threshold e métrica pelo custo do erro, ler ranking e explicar probabilidades calibradas versus classes.", bankCase: "Prever default e triagem de mensagens suspeitas, comparando logística e variantes de Naive Bayes.", mistakes: ["usar acurácia em classe rara", "achar que Naive Bayes exige independência total", "confundir AUC com threshold operacional"], boundary: "KNN/SVM ficam na Semana 12; árvores e ensembles ficam na Semana 13." },
    practice: { objective: "comparar Logística e Naive Bayes em classificação desbalanceada e escolher threshold", sequence: ["carregar dados e definir X/y", "separar treino/teste estratificado", "preprocessar dentro do pipeline", "treinar LogisticRegression", "treinar a variante de Naive Bayes adequada", "calcular matriz, Precision, Recall, F1, AUC, Gini e KS", "testar thresholds e justificar"], decisions: ["variante de Naive Bayes", "métrica principal", "threshold operacional"], conclusion: "qual modelo e threshold atendem ao custo de fraude/default e quais limites permanecem" },
    assets: [["week-11-risco-classificacao.csv", "csv", "Base binária desbalanceada para Logística, Naive Bayes e análise de threshold."]],
    cards: ["Por que regressão logística é classificação apesar do nome?", "Como interpretar odds e probabilidade?", "Qual a premissa central do Naive Bayes?", "Quando usar Gaussian, Bernoulli ou Multinomial NB?", "Quando Recall deve superar Precision?", "Como Gini se relaciona com AUC?", "Por que Gini de 50% não equivale a moeda?", "O que a curva ROC percorre?", "Quando acurácia engana em fraude?", "Como escolheria threshold para uma fila de investigação limitada?"],
  },
  {
    number: 12,
    title: "KNN e SVM",
    syllabusFocus: ["KNN", "SVM", "Métricas e validação de classificação aplicáveis"],
    whyThisMatters: "KNN classifica pela vizinhança e SVM procura uma fronteira de margem máxima. Os dois tornam visíveis conceitos essenciais de escala, distância, dimensionalidade, fronteira de decisão e ajuste de hiperparâmetros.",
    dataScienceUse: ["classificar por similaridade local", "construir fronteiras lineares ou com kernel", "avaliar efeito de escala", "comparar custo de treino e predição"],
    bankingContext: "Perfis semelhantes podem apoiar triagem de risco, enquanto SVM pode separar padrões complexos de fraude em bases menores e bem preparadas.",
    study: { opening: "‘podemos decidir olhando vizinhos?’ e ‘podemos separar classes deixando uma margem?’", sequence: ["KNN: distância, vizinhos, votação e escolha de K", "escala e maldição da dimensionalidade", "SVM: hiperplano, margem e vetores de suporte", "C, soft margin e trade-off", "kernels e gamma em intuição", "probabilidade, custo computacional e validação", "métricas de classificação e pipeline"], math: "Use distância em poucos pontos e distância ao hiperplano em intuição; explique kernel como similaridade sem derivação formal.", interpretation: "Explicar como K/C/gamma mudam a fronteira, por que escala importa e qual custo operacional cada método impõe.", bankCase: "Classificar transações suspeitas usando perfis próximos e fronteiras de comportamento.", mistakes: ["usar KNN/SVM sem escala", "escolher K no teste", "tratar kernel como garantia de melhora"], boundary: "Não aprofunde otimização convexa nem proof do kernel trick." },
    practice: { objective: "comparar KNN e SVM com pipeline escalado e visualizar efeitos de hiperparâmetros", sequence: ["carregar e dividir a base", "criar pipeline com StandardScaler", "testar valores de K", "ajustar SVM linear", "comparar com kernel RBF e diferentes C/gamma", "avaliar métricas e tempo", "interpretar erros"], decisions: ["K e métrica de distância", "kernel", "C/gamma e métrica principal"], conclusion: "qual fronteira generaliza melhor e qual custo de predição é aceitável" },
    assets: [["week-12-clientes-fronteiras.csv", "csv", "Base bidimensional e versão ampliada para observar vizinhos, margem e escala."]],
    cards: ["Como KNN chega à classe final?", "O que acontece quando K é muito pequeno?", "Por que KNN sofre em alta dimensionalidade?", "O que a margem do SVM representa?", "Quem são os vetores de suporte?", "Como C altera margem e erros?", "Qual o erro de ajustar escala fora do pipeline?", "Quando um kernel RBF pode ajudar?", "Como gamma alto altera a fronteira?", "Entre KNN e SVM, qual escolheria para baixa latência e por quê?"],
  },
  {
    number: 13,
    title: "Árvore de Classificação, Random Forest e Boosting",
    syllabusFocus: ["Árvore de classificação", "Random Forest", "Boosting (Gradient, Ada etc.)", "Métricas/validações de classificação", "Ensemble modelling"],
    whyThisMatters: "Árvores traduzem decisões em cortes; ensembles combinam modelos para reduzir variância ou viés. Esta família é central em dados tabulares, mas exige controlar profundidade, desbalanceamento, busca de hiperparâmetros e validação sem leakage.",
    dataScienceUse: ["modelar relações e interações não lineares", "reduzir variância com bagging/Random Forest", "reduzir viés sequencialmente com boosting", "tratar classificação desbalanceada com critério"],
    bankingContext: "Scores de crédito e fraude usam árvores/boosting por desempenho em tabelas. Oversampling e undersampling devem ocorrer apenas no treino; a métrica reflete o custo operacional.",
    study: { opening: "estrutura de raiz, nós, splits e folhas e como a árvore chega à resposta", sequence: ["Gini/entropia e escolha de split", "profundidade, folha, pruning e overfitting", "bootstrap e bagging", "Random Forest e amostragem de features", "boosting, AdaBoost e Gradient Boosting", "viés versus variância", "Grid Search versus Random Search", "oversampling, undersampling e pipeline", "métricas/validação de classificação"], math: "Explique impureza e ganho como redução de mistura; bootstrap como amostragem com reposição; boosting como soma sequencial de modelos fracos.", interpretation: "Ler árvore sem confundir importância com causalidade, comparar treino/validação e justificar balanceamento/métrica.", bankCase: "Prever inadimplência em base desbalanceada e escolher modelo/threshold para uma política de crédito.", mistakes: ["balancear antes do split", "deixar árvore crescer até memorizar", "usar acurácia como única métrica"], boundary: "Não transforme em catálogo de todas as bibliotecas de boosting nem antecipe redes neurais." },
    practice: { objective: "comparar árvore, Random Forest e boosting com busca e balanceamento dentro do treino", sequence: ["carregar e fazer split estratificado", "montar preprocessing", "treinar árvore e inspecionar profundidade", "treinar Random Forest", "treinar Gradient/Ada Boosting", "comparar Grid e Random Search em espaço pequeno", "testar over/undersampling dentro do pipeline", "avaliar métricas e threshold"], decisions: ["redução de viés versus variância", "busca de hiperparâmetros", "oversampling versus undersampling"], conclusion: "qual ensemble atende desempenho, estabilidade e explicabilidade do caso" },
    assets: [["week-13-inadimplencia-ensembles.csv", "csv", "Base sintética desbalanceada para árvore, Random Forest, boosting e resampling."]],
    cards: ["Como uma árvore escolhe o melhor corte?", "Como a folha produz a classe final?", "Qual vantagem e limite de uma árvore isolada?", "Como bootstrap sustenta bagging?", "Por que Random Forest reduz variância?", "Por que boosting tende a reduzir viés?", "Qual o erro de oversampling antes do split?", "Quando undersampling é melhor que oversampling?", "Como Grid Search difere de Random Search?", "Que métrica usaria em inadimplência rara e por quê?"],
  },
  {
    number: 14,
    title: "Redes Neurais",
    syllabusFocus: ["Redes Neurais", "Métricas e validação de classificação aplicáveis"],
    whyThisMatters: "Redes neurais aprendem representações e relações não lineares combinando neurônios em camadas. Para nível Júnior, importa entender forward pass, loss, gradiente, backpropagation e controle de overfitting, sem transformar a semana em cálculo avançado.",
    dataScienceUse: ["modelar padrões não lineares", "aprender representações", "classificar com saídas probabilísticas", "usar early stopping e regularização"],
    bankingContext: "Podem classificar risco ou fraude quando há dados e ganho real sobre baselines, mas exigem governança, monitoramento e justificativa do custo de menor explicabilidade.",
    study: { opening: "entrada, peso, bias, neurônio e saída como uma transformação simples", sequence: ["camadas e forward pass", "funções de ativação", "loss de classificação", "gradiente e learning rate", "backpropagation em intuição", "epoch, batch e otimização", "overfitting, dropout, regularização e early stopping", "avaliação de classificação e baseline"], math: "Mostre z=w·x+b, ativação e atualização na direção oposta ao gradiente; não derive backpropagation completa.", interpretation: "Ler curvas de loss de treino/validação, reconhecer overfit e comparar ganho com um baseline mais simples.", bankCase: "Classificação de risco em base tabular, avaliando se o ganho justifica explicabilidade e custo.", mistakes: ["aumentar camadas sem baseline", "avaliar apenas treino", "usar threshold padrão sem custo do erro"], boundary: "TensorFlow/Keras apenas para aplicação mínima; CNN e outros dados ficam na Semana 21." },
    practice: { objective: "treinar uma rede pequena, acompanhar loss e comparar com uma logística", sequence: ["carregar, dividir e escalar dados", "criar baseline logístico", "definir rede pequena", "treinar com validação", "visualizar loss por época", "aplicar early stopping", "avaliar métricas/threshold e comparar"], decisions: ["arquitetura mínima", "learning rate/epochs", "critério de early stopping"], conclusion: "se a rede generaliza e se o ganho compensa custo e explicabilidade" },
    assets: [["week-14-classificacao-rede-neural.csv", "csv", "Base tabular sintética com alvo binário para rede pequena e baseline linear."]],
    cards: ["O que um neurônio calcula antes da ativação?", "Para que serve o bias?", "Como uma camada escondida cria não linearidade?", "O que a loss orienta no treinamento?", "Qual o papel do gradiente?", "Como backpropagation ajusta pesos em intuição?", "Que sinal nas curvas indica overfitting?", "Como early stopping ajuda?", "Quando uma rede não é indicada em dados tabulares?", "Como justificaria uma rede para risco diante de um baseline logístico?"],
  },
  {
    number: 15,
    title: "K-means, K-medoids e Número de Clusters",
    syllabusFocus: ["K-means/K-medoids", "Estratégias para definir número de clusters", "Avaliação de agrupamento aplicável"],
    whyThisMatters: "Nem todo problema possui target. K-means procura grupos compactos em torno de centróides e torna explícitos os efeitos de escala, outliers e escolha de K; K-medoids usa observações reais e tende a ser mais robusto.",
    dataScienceUse: ["segmentar clientes sem rótulo", "resumir perfis por centróides/medoides", "comparar números de clusters", "avaliar compactação e separação"],
    bankingContext: "Segmentos de comportamento podem apoiar comunicação, ofertas e gestão de carteira, mas cluster não é persona automaticamente e precisa ser estável, acionável e interpretável.",
    study: { opening: "‘como encontrar grupos quando ninguém forneceu o target?’", sequence: ["cluster, feature e distância", "K-means: inicialização, atribuição e atualização", "centróide, inércia e convergência", "efeito de escala e outliers", "escolha de K por elbow", "coeficiente de silhouette", "K-medoids e robustez", "interpretação e estabilidade"], math: "Explique objetivo como soma das distâncias quadráticas aos centróides e silhouette pela comparação entre coesão e separação, sem prova formal.", interpretation: "Nomear clusters pelas features, comparar elbow/silhouette e verificar se o grupo sustenta uma ação de negócio.", bankCase: "Segmentar clientes por frequência, gasto e uso de canais para planejar comunicação.", mistakes: ["não escalar features", "escolher K só porque o gráfico dobra", "tratar clusters como verdade natural"], boundary: "DBSCAN, hierárquico e GMM ficam na Semana 16; anomalia não é objetivo desta semana." },
    practice: { objective: "executar K-means/K-medoids, escolher K e interpretar segmentos", sequence: ["carregar features e excluir identificadores", "escalar variáveis", "testar diferentes K", "calcular inércia e silhouette", "ajustar KMeans final", "inspecionar labels e centróides", "comparar com medoides ou robustez a extremos", "descrever segmentos"], decisions: ["features de segmentação", "K por elbow/silhouette", "ação associada a cada cluster"], conclusion: "quais clusters são coesos, separados, estáveis e acionáveis" },
    assets: [["week-15-segmentacao-kmeans.csv", "csv", "Dados comportamentais com quatro perfis, escalas distintas e poucos extremos."]],
    cards: ["Como K-means alterna atribuição e atualização?", "O que um centróide representa?", "Por que escala altera os clusters?", "Como outliers afetam K-means?", "O que a curva do cotovelo mede?", "Como o silhouette é interpretado?", "Qual erro há em escolher K só pelo elbow?", "Como K-medoids difere de K-means?", "Quando K-medoids é preferível?", "Como provaria que um segmento bancário é acionável?"],
  },
  {
    number: 16,
    title: "DBSCAN, Hierárquico e GMM",
    syllabusFocus: ["DBSCAN", "Algoritmos Hierárquicos", "Gaussian Mixture Models (GMM)", "Avaliação de agrupamento aplicável"],
    whyThisMatters: "K-means supõe grupos aproximadamente compactos e não resolve todos os formatos. DBSCAN encontra regiões densas e ruído, hierárquico mostra relações em dendrograma e GMM atribui probabilidades de pertencimento.",
    dataScienceUse: ["encontrar clusters de formas irregulares", "explorar hierarquias", "produzir soft clustering", "comparar estabilidade e separação"],
    bankingContext: "Perfis podem ter formatos e densidades diferentes; GMM expressa incerteza de segmento. Pontos marcados como ruído por DBSCAN merecem análise, mas não são automaticamente fraude.",
    study: { opening: "por que K-means falha em grupos não esféricos, densidades diferentes e pontos isolados", sequence: ["densidade, epsilon, MinPts, core, border e noise", "DBSCAN e efeito de escala", "hierárquico aglomerativo", "dendrograma e linkages", "GMM, componentes Gaussianos e covariância", "EM em intuição e probabilidades de pertencimento", "avaliação e estabilidade"], math: "Explique vizinhança ε, distâncias de linkage e mistura ponderada de Gaussianas; trate EM como alternância entre responsabilidades e parâmetros.", interpretation: "Ler noise sem rotular fraude, cortar dendrograma com critério e interpretar probabilidades de cluster no GMM.", bankCase: "Explorar padrões de comportamento com grupos irregulares e clientes de pertencimento ambíguo.", mistakes: ["usar DBSCAN sem escala", "interpretar noise como fraude confirmada", "escolher linkage ou covariância sem validar"], boundary: "Anomalia é somente contexto; o fechamento de detecção de anomalia ocorre na Semana 21." },
    practice: { objective: "comparar DBSCAN, hierárquico e GMM em geometrias que desafiam K-means", sequence: ["carregar e escalar features", "usar K-means como contraste", "ajustar epsilon/MinPts no DBSCAN", "plotar e cortar dendrograma", "ajustar GMM", "inspecionar probabilidades de pertencimento", "comparar coesão, separação e estabilidade"], decisions: ["epsilon/MinPts", "linkage", "número/covariância do GMM"], conclusion: "qual algoritmo representa melhor a geometria e como tratar noise/incerteza" },
    assets: [["week-16-clusters-formas.csv", "csv", "Base com luas, densidades diferentes e pontos isolados para comparar algoritmos."]],
    cards: ["Por que DBSCAN encontra formas que K-means perde?", "O que distingue core, border e noise?", "Como epsilon e MinPts alteram o resultado?", "O que um dendrograma registra?", "Como single e complete linkage diferem?", "O que significa soft clustering no GMM?", "Qual erro há em chamar todo noise de fraude?", "Como EM funciona em duas etapas intuitivas?", "Quando GMM é melhor que K-means?", "Como validaria estabilidade de clusters no banco?"],
  },
  {
    number: 17,
    title: "Fundamentos de IA Generativa, NLP, Transformers e Embeddings",
    syllabusFocus: ["Conceitos fundamentais de IA Generativa e NLP", "Arquitetura transformer", "Embeddings"],
    whyThisMatters: "LLMs tratam texto como tokens, constroem representações vetoriais e geram sequências com Transformers. Entender embeddings, attention e limites ajuda a escolher usos reais sem confundir fluência com verdade.",
    dataScienceUse: ["representar texto numericamente", "medir similaridade semântica", "gerar e classificar linguagem", "avaliar alucinação, viés e privacidade"],
    bankingContext: "Embeddings podem recuperar políticas semelhantes; LLMs podem apoiar atendimento e resumo, desde que dados sensíveis, factualidade e supervisão sejam controlados.",
    study: { opening: "como texto vira tokens e números antes de qualquer modelo conseguir processá-lo", sequence: ["NLP e IA Generativa", "tokenização e contexto", "embeddings e similaridade", "Transformer e blocos principais", "self-attention e posição em intuição", "geração token a token", "limitações: alucinação, viés, custo e privacidade"], math: "Use vetores e produto interno/cosseno para embeddings; explique attention como pesos de relevância entre tokens, sem derivar matrizes completas.", interpretation: "Diferenciar similaridade semântica de identidade, explicar por que uma resposta fluente pode estar errada e escolher uma avaliação adequada.", bankCase: "Representar reclamações e políticas para busca semântica e apoio ao atendimento.", mistakes: ["achar que embedding é resumo legível", "tratar saída provável como fato", "enviar dado bancário sensível sem proteção"], boundary: "Text mining clássico é apenas contexto e fecha na Semana 21; RAG, fine-tuning e guardrails ficam na Semana 18." },
    practice: { objective: "comparar representações de textos e observar similaridade, contexto e limitações", sequence: ["carregar textos bancários", "limpar apenas o necessário", "gerar uma representação baseline", "obter ou simular embeddings", "calcular similaridade de cosseno", "comparar pares semânticos", "testar um prompt curto e registrar falhas"], decisions: ["unidade de texto", "métrica de similaridade", "critério de qualidade e privacidade"], conclusion: "quando embeddings/Transformer ajudam e quais riscos impedem uso automático" },
    assets: [["week-17-atendimentos-nlp.csv", "csv", "Mensagens sintéticas de atendimento com intenção e tema."], ["week-17-amostra-textos.txt", "txt", "Pares de textos para comparar similaridade semântica."]],
    cards: ["Como texto vira entrada numérica para um modelo?", "O que um token representa?", "O que um embedding preserva?", "Como similaridade de cosseno compara embeddings?", "Qual problema a attention resolve?", "Por que Transformers usam informação de posição?", "Qual erro há em confundir fluência com factualidade?", "Como geração token a token pode alucinar?", "Quando embeddings ajudam uma busca bancária?", "Que controles exigiria antes de enviar texto de cliente a um LLM?"],
  },
  {
    number: 18,
    title: "ICL, Prompt, RAG, Fine-tuning e Segurança",
    syllabusFocus: ["In Context Learning", "RAG e bancos vetoriais", "Engenharia de Prompt", "Treinamento e fine-tuning", "Quantization", "RLHF", "Safeguards e Guardrails"],
    whyThisMatters: "Aplicações de LLM precisam decidir se orientam o modelo por contexto, recuperam conhecimento, alteram pesos ou aplicam controles. RAG, fine-tuning e prompt resolvem problemas diferentes; guardrails reduzem riscos sem garantir segurança absoluta.",
    dataScienceUse: ["estruturar prompts e exemplos", "recuperar conhecimento com embeddings", "adaptar comportamento por fine-tuning", "reduzir custo por quantization", "avaliar qualidade e segurança"],
    bankingContext: "Um assistente de políticas pode recuperar trechos aprovados e citar evidências, bloquear PII e escalar baixa confiança para humano. Fine-tuning não substitui fatos atualizáveis.",
    study: { opening: "como fazer um LLM usar contexto, buscar conhecimento, adaptar comportamento e operar com segurança", sequence: ["zero/one/few-shot e ICL", "engenharia de prompt e saída estruturada", "RAG: chunking, embedding, retrieval e geração", "banco vetorial e avaliação de recuperação", "RAG versus fine-tuning", "fine-tuning, RLHF e quantization em intuição", "guardrails, prompt injection, privacidade e supervisão"], math: "Explique similaridade de embeddings, top-k e trade-off de quantização; não aprofunde treinamento distribuído.", interpretation: "Separar erro de recuperação de erro de geração, medir groundedness e decidir quando recusar ou escalar.", bankCase: "Assistente interno que responde políticas bancárias usando apenas conhecimento autorizado.", mistakes: ["usar fine-tuning para atualizar fatos", "avaliar só respostas bonitas", "achar que guardrail elimina prompt injection"], boundary: "Não transforme em implantação de infraestrutura complexa; mantenha arquitetura, escolhas, avaliação e segurança em nível Júnior." },
    practice: { objective: "prototipar um RAG local simples e avaliar recuperação, resposta e guardrails", sequence: ["ler a base de conhecimento", "dividir em chunks", "criar índice simples", "recuperar trechos para perguntas", "montar prompt com contexto", "testar pergunta sem resposta", "simular proteção de PII e recusa", "registrar falhas"], decisions: ["tamanho/overlap do chunk", "top-k", "RAG versus fine-tuning", "regra de recusa"], conclusion: "se a resposta está fundamentada e que falhas exigem bloqueio ou humano" },
    assets: [["week-18-base-conhecimento.md", "md", "Políticas bancárias sintéticas para chunking e recuperação."], ["week-18-perguntas-rag.txt", "txt", "Perguntas cobertas, ambíguas e fora da base para avaliação."]],
    cards: ["Como zero-shot difere de few-shot?", "O que ICL muda e o que não muda no modelo?", "Quais etapas formam um pipeline RAG?", "Como chunking afeta recuperação?", "Quando RAG é melhor que fine-tuning?", "O que quantization troca por eficiência?", "Qual erro há em avaliar só a resposta final?", "O que RLHF busca ajustar?", "Como prompt injection ameaça um RAG?", "Quando um assistente bancário deve recusar e escalar?"],
  },
  {
    number: 19,
    title: "Pesquisa Operacional, Programação Inteira e MIP",
    syllabusFocus: ["Programação linear, modelos, solução gráfica e simplex", "Variáveis inteiras/binárias, relaxação, arredondamento e Branch-and-bound", "MIP, GAP, Best Bound e solvers"],
    whyThisMatters: "Prever não decide sozinho. Otimização transforma objetivo, variáveis e restrições em uma recomendação viável. Integridade e MIP representam decisões discretas; GAP e Best Bound ajudam a avaliar qualidade quando o solver não prova ótimo.",
    dataScienceUse: ["alocar orçamento e capacidade", "transformar scores em decisões sob restrições", "selecionar itens com variáveis binárias", "interpretar solução, viabilidade e gap"],
    bankingContext: "Um banco pode priorizar ofertas ou casos de cobrança maximizando retorno esperado sob orçamento, capacidade, elegibilidade e limites de risco.",
    study: { opening: "como transformar uma decisão com objetivo e restrições em um modelo matemático", sequence: ["variáveis de decisão, função objetivo e restrições", "região viável e solução gráfica", "simplex em intuição", "variáveis inteiras e binárias", "relaxação linear e limites do arredondamento", "Branch-and-Bound", "MIP, solver, incumbent, Best Bound e GAP", "validação da solução no negócio"], math: "Formule um LP de duas variáveis, leia restrições e objetivo; explique GAP relativo como distância entre melhor solução e limite, sem implementar simplex.", interpretation: "Verificar viabilidade, unidades, restrições ativas e se melhoria de objetivo compensa tempo de solver.", bankCase: "Selecionar clientes para campanha com retorno esperado, orçamento, capacidade e regra mínima por segmento.", mistakes: ["otimizar score sem restrição de negócio", "arredondar relaxação e violar restrições", "confundir solução factível com ótimo provado"], boundary: "Não aprofunde teoria de dualidade ou algoritmos avançados além da intuição exigida." },
    practice: { objective: "formular e resolver uma seleção binária de clientes sob orçamento e capacidade", sequence: ["ler candidatos e parâmetros", "definir variável binária", "escrever objetivo de retorno", "adicionar orçamento, capacidade e elegibilidade", "resolver LP/MIP com solver", "inspecionar solução, Best Bound e GAP", "testar mudança de restrição"], decisions: ["objetivo correto", "restrições duras", "tolerância de GAP"], conclusion: "por que a solução é viável, qual valor entrega e como mudaria com nova restrição" },
    assets: [["week-19-alocacao-carteira.csv", "csv", "Candidatos sintéticos com custo, retorno, risco e segmento para otimização."]],
    cards: ["O que é uma variável de decisão?", "Como objetivo difere de restrição?", "O que a região viável representa?", "Por que uma decisão sim/não pede variável binária?", "O que a relaxação linear fornece?", "Por que arredondar pode gerar solução inviável?", "Como Branch-and-Bound reduz a busca?", "O que Best Bound informa?", "Como interpretar GAP de 2%?", "Que restrições colocaria numa campanha bancária otimizada?"],
  },
  {
    number: 20,
    title: "Big Data, Grafos e Séries Temporais",
    syllabusFocus: ["Hadoop/Hive", "Spark/PySpark", "Grafos", "Séries temporais"],
    whyThisMatters: "Volume, relações em rede e ordem temporal mudam a forma de processar e validar dados. O objetivo Júnior é reconhecer quando pandas não basta, como Spark executa transformações, como grafos representam conexões e por que séries exigem split temporal.",
    dataScienceUse: ["processar dados distribuídos", "criar features em PySpark", "analisar redes de transações", "modelar tendência, sazonalidade e lags"],
    bankingContext: "Fraude pode exigir bilhões de eventos, redes entre contas/dispositivos e padrões temporais. Misturar futuro no treino cria uma avaliação impossível em produção.",
    study: { opening: "três problemas diferentes: escala de processamento, relações entre entidades e dependência no tempo", sequence: ["Hadoop, HDFS e Hive em visão geral", "Spark, DataFrames, transformações e ações", "pandas versus PySpark e processamento distribuído", "grafos: nós, arestas, grau, caminho e comunidade", "séries: ordem, tendência, sazonalidade e lag", "autocorrelação e features temporais", "split temporal e leakage"], math: "Use grau e caminho em grafos e lag/autocorrelação em intuição; não aprofunde arquitetura de cluster nem modelos de forecasting avançados.", interpretation: "Escolher ferramenta pelo volume, ler relações suspeitas e avaliar série respeitando tempo e mudança de regime.", bankCase: "Construir sinais de fraude a partir de eventos massivos, conexões entre contas e comportamento temporal.", mistakes: ["usar Spark em dados pequenos sem necessidade", "tratar grafo como tabela sem relações", "embaralhar série temporal no split"], boundary: "Visão introdutória e aplicada; não transforme em formação de Data Engineer." },
    practice: { objective: "explorar dados temporais e uma rede de transações, com versão pandas e raciocínio PySpark", sequence: ["ler série e ordenar por data", "criar lags e agregações passadas", "fazer split temporal", "ler lista de arestas", "calcular grau e conexões", "esboçar transformação equivalente em PySpark", "interpretar sinais sem leakage"], decisions: ["pandas versus Spark", "janela temporal", "definição de nó/aresta"], conclusion: "quais sinais são calculáveis em produção e por que a validação respeita o tempo" },
    assets: [["week-20-transacoes-temporais.csv", "csv", "Série diária sintética com tendência, sazonalidade e mudança de nível."], ["week-20-grafo-transacoes.csv", "csv", "Lista de arestas entre contas/dispositivos com valores e horários."]],
    cards: ["Quando Spark é preferível a pandas?", "Como transformação difere de ação no Spark?", "O que Hive acrescenta ao ecossistema Hadoop?", "Como nó e aresta modelam transações?", "O que grau alto pode indicar e o que não prova?", "O que um lag representa?", "Qual o erro de embaralhar uma série?", "Como sazonalidade difere de tendência?", "Por que uma feature temporal pode vazar futuro?", "Como combinaria escala, grafo e tempo na investigação de fraude?"],
  },
  {
    number: 21,
    title: "Anomalia, Text Mining, Deep Learning, Imagem e Speech",
    syllabusFocus: ["Anomaly Detection", "Text Mining", "Deep Learning/TensorFlow", "Image Recognition", "Speech Recognition"],
    whyThisMatters: "Esta semana fecha tópicos complementares que aparecem em problemas reais com dados raros ou não estruturados. O nível Júnior exige distinguir tarefa, dado, rótulo, avaliação e risco — não dominar arquiteturas profundas de cada modalidade.",
    dataScienceUse: ["detectar comportamentos incomuns", "extrair sinais de texto", "reconhecer padrões em imagem", "transcrever e analisar áudio", "usar transferência de aprendizado"],
    bankingContext: "Anomalia pode priorizar investigação, text mining categoriza reclamações, imagem auxilia documentos e speech transcreve atendimento; todos exigem privacidade, viés e revisão humana.",
    study: { opening: "como o tipo de dado e a disponibilidade de rótulo definem a técnica", sequence: ["anomalia versus fraude e Isolation Forest", "avaliação quando rótulos são raros", "text mining, frequência e TF-IDF", "deep learning/TensorFlow como ferramenta", "imagem, CNN e transfer learning em intuição", "áudio, transcrição e speech analytics", "vieses, privacidade e supervisão"], math: "Explique TF-IDF e score de anomalia em intuição; para CNN/áudio, foque representação e aprendizado, não cálculo de convoluções.", interpretation: "Não chamar todo ponto raro de fraude, medir qualidade por tarefa/modalidade e revisar impactos por segmento.", bankCase: "Triagem multimodal de reclamações, documentos e chamadas, com anomalias encaminhadas a analistas.", mistakes: ["confundir anomalia com fraude confirmada", "avaliar texto/imagem apenas por exemplos bonitos", "ignorar viés e PII"], boundary: "Não repetir Transformers, embeddings ou redes gerais; feche cada item no nível introdutório aplicado." },
    practice: { objective: "construir uma triagem pequena com anomalia e texto, documentando extensão para imagem/speech", sequence: ["carregar transações e chamados", "ajustar Isolation Forest", "inspecionar anomalias sem rotular fraude", "vetorizar textos com TF-IDF", "agrupar ou classificar temas simples", "avaliar erros", "desenhar fluxo humano para imagem/speech"], decisions: ["contaminação/threshold", "unidade de texto", "critério de escalonamento humano"], conclusion: "quais saídas são apenas sinais e quais controles cada modalidade exige" },
    assets: [["week-21-anomalias-transacoes.csv", "csv", "Transações sintéticas com poucos padrões incomuns sem rótulo de fraude."], ["week-21-chamados-texto.csv", "csv", "Chamados sintéticos para TF-IDF e triagem de temas."]],
    cards: ["Como anomalia difere de fraude?", "O que Isolation Forest procura em intuição?", "Como avaliar anomalia com poucos rótulos?", "O que TF-IDF valoriza?", "Quando deep learning não é necessário?", "O que transfer learning economiza em imagem?", "Qual erro há em aprovar documento só pela confiança do modelo?", "Como speech recognition difere de speech analytics?", "Que viés pode surgir em áudio ou imagem?", "Quando uma saída multimodal deve ir para revisão humana?"],
  },
  {
    number: 22,
    title: "Consolidação",
    syllabusFocus: ["Consolidar os 72 itens oficiais sem introduzir teoria nova", "Prova prática, sabatina final e Capstone"],
    whyThisMatters: "Consolidação transforma tópicos isolados em decisões coerentes. O objetivo é localizar lacunas, escolher método/métrica/validação sem pistas, explicar limites e montar uma solução bancária pequena de ponta a ponta.",
    dataScienceUse: ["revisar por recuperação ativa", "integrar preparação, modelo e validação", "comunicar decisão e limitações", "demonstrar domínio em prova e sabatina"],
    bankingContext: "O Capstone combina base de clientes e comportamento para responder uma pergunta bancária, com baseline, validação, interpretação, risco e plano de monitoramento.",
    study: { opening: "um diagnóstico honesto do que já consigo explicar sem consulta e do que permanece amarelo", sequence: ["auditar os 72 itens por domínio", "revisar fundamentos e confusões recorrentes", "resolver uma prova prática cronometrada", "simular sabatina uma pergunta por vez", "construir Capstone com baseline e validação", "apresentar decisão, limites e monitoramento"], math: "Revisar apenas a matemática necessária já estudada; toda fórmula deve servir a uma interpretação ou decisão.", interpretation: "Escolher abordagem sem pista, defender custo do erro e reconhecer quando não há evidência suficiente.", bankCase: "Capstone de decisão bancária com dados sintéticos, documentação curta e apresentação para banca.", mistakes: ["adicionar teoria nova em vez de fechar lacunas", "focar código e não interpretação", "apresentar métrica sem baseline, segmento ou limite"], boundary: "Não adicione conteúdo novo; a prioridade é recuperar, integrar, testar e comunicar o que já foi estudado." },
    practice: { objective: "executar um Capstone pequeno e uma defesa técnica usando os itens já estudados", sequence: ["escolher uma pergunta de negócio", "auditar dados e definir unidade/janelas", "criar baseline", "aplicar preparação e método adequados", "validar com métrica coerente", "analisar erros/segmentos", "escrever recomendação e limites", "ensaiar apresentação e sabatina"], decisions: ["tipo de problema", "métrica e validação", "ação bancária e monitoramento"], conclusion: "se a recomendação é reproduzível, defensável e compatível com os riscos" },
    assets: [["week-22-capstone-clientes.csv", "csv", "Base integradora sintética com cadastro, comportamento e alvos possíveis."], ["week-22-briefing-capstone.md", "md", "Briefing com três perguntas de negócio, critérios de entrega e roteiro de apresentação."]],
    cards: ["Como identificar o tipo de problema antes de escolher modelo?", "Que evidência um baseline fornece?", "Como escolher métrica pelo custo do erro?", "Quando uma divisão temporal é obrigatória?", "O que precisa caber numa explicação de dois minutos?", "Qual matemática mínima deve acompanhar uma técnica?", "Qual erro há em apresentar só a métrica média?", "Como transformar resultado em decisão bancária?", "Quando recomendar não produzir um modelo?", "Que checklist usaria antes de defender o Capstone?"],
  },
];

export function buildCanonicalWeekEditorial(scopeByWeek) {
  return blueprints.map((week) => {
    const scope = scopeByWeek.get(week.number);
    if (!scope) throw new Error(`Escopo ausente para conteúdo editorial da semana ${week.number}.`);
    const starterAssets = makeAssets(week.number, week.assets);
    const flashcards = week.cards.map((front, index) => {
      const concept = scope.map[Math.floor(index / 2) % scope.map.length];
      return {
        idSuffix: cardIds[index],
        front,
        back: [concept.what, concept.why, concept.banking, concept.more].filter(Boolean).join(" "),
        concept: concept.name,
        type: flashcardTypes[index],
      };
    });
    return {
      ...week,
      starterAssets,
      studyPrompt: buildStudyPrompt(week),
      practicePrompt: buildPracticePrompt({ ...week, starterAssets }),
      flashcards,
    };
  });
}

