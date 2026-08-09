export type SyllabusStudyGuide = {
  what: string;
  why: string;
  useWhen: string;
  avoidWhen: string;
  bankExample: string;
  examFocus: string;
};

export type SyllabusStudyEnhancement = {
  interpretation: string;
  workflow: string[];
  codeHint: string;
  commonErrors: string[];
  subtopics?: Array<{
    title: string;
    level: "essential" | "important" | "good_to_know" | "optional";
    explanation: string;
    banking: string;
  }>;
};

const guide = (
  what: string,
  why: string,
  useWhen: string,
  avoidWhen: string,
  bankExample: string,
  examFocus: string,
): SyllabusStudyGuide => ({ what, why, useWhen, avoidWhen, bankExample, examFocus });

/** Mapa aplicado dos 61 itens oficiais da ementa. */
export const syllabusStudyGuides: Record<string, SyllabusStudyGuide> = {
  "estat-01": guide(
    "Variável aleatória traduz um resultado incerto em valor numérico. É discreta quando assume valores contáveis e contínua quando pode assumir qualquer valor em um intervalo.",
    "Essa distinção orienta a distribuição, a forma de estimar probabilidades e o tipo de modelo adequado.",
    "Use a visão discreta para eventos e contagens; use a contínua para valores como renda, saldo, tempo ou perda.",
    "Não trate uma variável como contínua apenas porque está armazenada com casas decimais; investigue o processo que a gera.",
    "Número de atrasos é discreto; valor de perda financeira é contínuo. A natureza do alvo muda a modelagem e a métrica.",
    "Saber classificar exemplos e explicar por que essa classificação afeta a escolha da distribuição ou do modelo."),
  "estat-02": guide(
    "A densidade descreve onde uma variável contínua se concentra; a função acumulada informa a probabilidade de observar um valor menor ou igual a um limite.",
    "Elas permitem interpretar faixas, percentis, caudas e probabilidades sem confundir altura da curva com probabilidade pontual.",
    "Use a acumulada para responder perguntas de corte, como a parcela de clientes abaixo de determinado score ou renda.",
    "Não interprete a densidade de um ponto contínuo como sua probabilidade exata; probabilidades vêm de áreas ou diferenças da acumulada.",
    "Estimar a proporção de transações abaixo de um valor ou definir um percentil de risco para priorizar análise.",
    "Interpretar curva, percentil e probabilidade acumulada; cálculo simbólico pesado não é o foco."),
  "estat-03": guide(
    "Média, mediana, moda e quartis resumem posição; variância, desvio e amplitude resumem dispersão. Cada medida enxerga uma parte diferente da distribuição.",
    "Um único número pode esconder assimetria e outliers. A escolha correta produz uma leitura honesta da carteira.",
    "Use média em distribuições aproximadamente simétricas; mediana e quartis quando há caudas longas ou extremos.",
    "Não use média isolada em renda, saldo ou transações muito assimétricas, nem compare variâncias de escalas incompatíveis.",
    "Para ticket de cartão com poucos valores enormes, reporte mediana, P75/P90 e dispersão, além da média.",
    "Escolher o resumo adequado, interpretar boxplot e explicar como outliers alteram média e variância."),
  "estat-04": guide(
    "Teste de hipótese compara os dados com uma hipótese nula e mede se a evidência observada seria improvável sob essa hipótese.",
    "Ajuda a separar variação aleatória de sinal relevante, mas não mede sozinho tamanho do efeito nem valor de negócio.",
    "Use em experimentos, comparação de grupos e validação de mudanças quando hipóteses, amostragem e métrica foram definidas antes.",
    "Não use p-valor como probabilidade de a hipótese ser verdadeira, nem para substituir intervalo de confiança e efeito prático.",
    "Avaliar se uma nova abordagem de cobrança mudou a taxa de regularização, acompanhando efeito, incerteza e custo.",
    "Entender H0/H1, erro tipo I e II, p-valor, significância e diferença entre significância estatística e prática."),
  "estat-05": guide(
    "Distribuições são modelos para diferentes processos: Bernoulli para um evento, Binomial para sucessos em tentativas, Poisson para contagens, Geométrica para espera até o primeiro sucesso, Uniforme para resultados equiprováveis e Normal para fenômenos contínuos simétricos.",
    "Reconhecer o mecanismo evita aplicar fórmulas ou modelos incompatíveis com o dado.",
    "Use a distribuição cuja unidade, suporte e processo gerador correspondam à pergunta.",
    "Não escolha Normal por conveniência quando há contagem, forte assimetria, limites ou evento binário.",
    "Default em uma proposta é Bernoulli; número de defaults em uma amostra pode ser Binomial; chamadas por hora podem ser Poisson.",
    "Associar cenários às distribuições e interpretar seus parâmetros, sem exigir derivações acadêmicas."),

  "alg-01": guide(
    "Vetor é uma sequência ordenada de valores; matriz organiza valores em linhas e colunas. Uma base de dados numérica pode ser vista como uma matriz de observações por atributos.",
    "Essa representação é a linguagem usada por regressões, PCA, redes neurais e algoritmos de distância.",
    "Use para compreender dimensões, formato de entrada, features, pesos e transformações de dados.",
    "Não foque em contas manuais extensas; o importante é saber o que linhas, colunas e dimensões representam.",
    "Uma matriz cliente×atributo alimenta um score; um vetor de coeficientes transforma atributos em uma previsão.",
    "Explicar dimensões, transposição e produto de matriz como operações sobre dados, sem cálculo pesado."),
  "alg-02": guide(
    "Álgebra matricial reúne operações que combinam e transformam vetores e matrizes, como soma, multiplicação, transposição e decomposição.",
    "Ela explica como bibliotecas processam muitos registros simultaneamente e como modelos transformam o espaço de atributos.",
    "Use a intuição para entender regressão, PCA, embeddings e camadas de redes neurais.",
    "Não memorize algoritmos de inversão manual; em aplicações reais, estabilidade numérica e bibliotecas confiáveis importam mais.",
    "O cálculo de scores de milhares de clientes pode ser expresso como uma multiplicação da matriz de atributos pelos pesos.",
    "Reconhecer o papel das operações e explicar a intuição, não executar longas contas de matriz."),
  "alg-03": guide(
    "Distância mede quão diferentes dois pontos são; produto interno mede alinhamento e participa de similaridade, projeção e modelos lineares.",
    "KNN, k-means, SVM, PCA e embeddings dependem da geometria escolhida e da escala dos atributos.",
    "Use distância quando proximidade representa semelhança útil; padronize variáveis quando as escalas competem.",
    "Não use distância euclidiana automaticamente em alta dimensão, dados categóricos ou escalas incompatíveis.",
    "Comparar perfis de clientes por comportamento exige definir variáveis e escala para não deixar saldo dominar frequência.",
    "Explicar por que escala importa e quando Euclidiana, Manhattan ou cosseno representam melhor a pergunta."),

  "aval-01": guide(
    "Métricas transformam acertos, erros e diferenças numéricas em medidas de desempenho. Cada métrica responde a uma pergunta de decisão diferente.",
    "Escolher a métrica errada pode aprovar um modelo que falha justamente no evento de maior custo.",
    "Use Recall para cobertura de positivos, Precision para qualidade da fila, F1 para equilíbrio, AUC/KS/Gini para ranking, MAE/RMSE/R² para regressão.",
    "Não use acurácia em classe rara sem análise, nem trate AUC/Gini como calibração ou retorno financeiro.",
    "Fraude prioriza recall dentro da capacidade e precision da fila; crédito acompanha Gini/KS, calibração e perda esperada.",
    "Definir cada métrica, escolher pela consequência de FP/FN e interpretar ROC, Gini e threshold em cenário bancário."),
  "aval-02": guide(
    "Validação separa dados usados para aprender daqueles usados para estimar generalização. Holdout usa um corte; k-fold alterna folds; OOT testa no futuro.",
    "Sem separação correta, o desempenho mede memória ou vazamento, não capacidade de funcionar em produção.",
    "Use holdout em grandes bases, k-fold em dados menores, GroupKFold para entidades repetidas e OOT quando o futuro é o destino real.",
    "Não embaralhe séries temporais nem ajuste imputação, escala, seleção ou oversampling antes dos splits.",
    "Treinar score em safras antigas e testar em uma safra futura, respeitando a maturação da inadimplência.",
    "Explicar treino/validação/teste, holdout versus k-fold, leakage e por que validação temporal costuma importar no banco."),

  "prep-01": guide(
    "Missing é ausência de informação e pode resultar de falha, regra operacional, não aplicabilidade ou comportamento do cliente.",
    "A causa da ausência pode carregar sinal e determina se devemos imputar, criar indicador, corrigir a fonte ou excluir.",
    "Use imputação simples como baseline dentro do pipeline e compare estratégias por variável, segmento e estabilidade.",
    "Não preencha tudo com média antes do split nem apague linhas sem entender o mecanismo e o viés criado.",
    "Renda ausente pode significar falha de integração ou cliente sem comprovação; cada caso pede tratamento e monitoramento distintos.",
    "Identificar causas, evitar leakage, escolher imputação e explicar quando um indicador de ausência agrega valor."),
  "prep-02": guide(
    "Outlier é uma observação distante do padrão; pode ser erro, evento raro legítimo, mudança de população ou caso de alto valor.",
    "Extremos alteram médias, escalas, regressões e algoritmos de distância, mas também podem conter o sinal mais importante.",
    "Use regras de domínio, percentis, IQR, gráficos e análise por segmento antes de decidir transformar, limitar ou separar.",
    "Não remova automaticamente todo extremo: fraude e grandes clientes frequentemente aparecem nas caudas.",
    "Uma transação muito alta pode ser erro de moeda, compra legítima premium ou fraude; a ação depende da investigação.",
    "Explicar detecção, impacto por algoritmo e diferença entre tratar erro e preservar evento raro."),
  "prep-03": guide(
    "Categorização transforma valores em faixas ou representa categorias para que modelos e análises consigam utilizá-las.",
    "Pode melhorar interpretação, capturar não linearidade e estabilizar política, mas perde detalhe e pode criar cortes artificiais.",
    "Use bins quando faixas têm significado operacional; use one-hot para categorias nominais e ordem explícita para ordinais.",
    "Não use LabelEncoder em atributo nominal como se seus números representassem distância ou ordem.",
    "Transformar atraso em faixas de política ou canal em indicadores para um modelo de propensão.",
    "Diferenciar one-hot, label e ordinal encoding e explicar como tratar categoria nova sem leakage."),
  "prep-04": guide(
    "PCA cria componentes que são combinações das variáveis originais e preservam o máximo possível de variância em menos dimensões.",
    "Reduz redundância, ruído e custo quando há muitas variáveis correlacionadas, mas troca interpretabilidade por compactação.",
    "Use após padronização em dados numéricos correlacionados, avaliando variância explicada e desempenho downstream.",
    "Evite quando cada variável precisa ser explicada diretamente, quando relações são fortemente não lineares ou componentes não ajudam a decisão.",
    "Compactar dezenas de indicadores transacionais antes de clustering, mantendo componentes suficientes e documentando a perda.",
    "Explicar a intuição de projeção e variância, por que escalar e como escolher componentes; não calcular autovetores à mão."),
  "prep-05": guide(
    "Correlação mede associação entre variáveis numéricas; tabelas, qui-quadrado e medidas como Cramér’s V ajudam com categorias.",
    "Revela redundância, relações e possíveis problemas de multicolinearidade, mas não prova causalidade.",
    "Use Pearson para relação linear contínua, Spearman para relação monotônica/robusta e medidas categóricas conforme o tipo do dado.",
    "Não interprete correlação baixa como ausência de relação não linear nem use correlação para afirmar causa.",
    "Renda e limite podem ser correlacionados; canal e contratação podem estar associados sem que o canal cause a compra.",
    "Escolher medida pelo tipo de variável e explicar correlação versus causalidade e redundância."),
  "prep-06": guide(
    "Seleção de variáveis escolhe atributos úteis e estáveis, removendo ruído, redundância, custo e risco de leakage.",
    "Menos variáveis podem simplificar modelo, coleta, explicação e monitoramento sem sacrificar desempenho.",
    "Use conhecimento de domínio, filtros, regularização, importância e seleção dentro da validação.",
    "Não selecione pela base inteira, só por importância de treino ou sem considerar disponibilidade, estabilidade e custo.",
    "Excluir informação gerada após a decisão de crédito e priorizar sinais disponíveis no momento da proposta.",
    "Explicar métodos filter/wrapper/embedded, leakage e diferença entre associação e valor incremental."),

  "prog-01": guide(
    "Fluência básica em Python ou R é saber expressar lógica com variáveis, coleções, condições, laços, funções e módulos.",
    "Permite transformar uma análise manual em processo reproduzível, testável e compreensível por outra pessoa.",
    "Use funções pequenas, nomes claros, tratamento de erros e estruturas adequadas ao problema.",
    "Evite notebooks com estado oculto, repetição, caminhos fixos e código sem validação de entrada.",
    "Criar uma função que calcula taxa de atraso por segmento e outra que valida o schema recebido.",
    "Ler e prever saída de código, manipular listas/dicionários/dataframes e explicar organização básica."),
  "prog-02": guide(
    "Leitura e escrita conectam arquivos, tabelas e APIs ao fluxo analítico usando pandas/readr e formatos como CSV, Parquet e JSON.",
    "Tipos, encoding, separador, datas e schema incorretos contaminam toda análise mesmo quando o modelo está certo.",
    "Use CSV para intercâmbio simples, Parquet para eficiência tipada e validação explícita ao carregar.",
    "Não confie em inferência automática de tipo, grave índice acidental ou carregue dados sensíveis fora do ambiente autorizado.",
    "Ler transações em Parquet, validar colunas/linhas e salvar uma tabela cliente-mês reconciliada.",
    "Conhecer read_csv/read_parquet, tipos, datas, missing e boas práticas de caminho e validação."),
  "prog-03": guide(
    "Pacotes de ML oferecem estimadores, pipelines, transformação, validação e métricas com uma API consistente.",
    "Fluência significa montar um fluxo correto e reproduzível, não decorar todos os parâmetros.",
    "Use Pipeline/ColumnTransformer, fit apenas no treino, predict/predict_proba conforme a métrica e CV apropriada.",
    "Não ajuste pré-processamento fora do pipeline nem escolha hiperparâmetro no teste.",
    "Montar pipeline de crédito com imputação, one-hot, logística e avaliação temporal.",
    "Explicar fit/transform/predict, Pipeline, busca de hiperparâmetros e diferença entre classe e probabilidade."),

  "regr-01": guide(
    "Regressão linear estima um alvo numérico como combinação aditiva de atributos e coeficientes.",
    "É um baseline rápido, transparente e útil para entender direção e magnitude de relações.",
    "Use quando relação é aproximadamente linear, resíduos são aceitáveis e interpretação ou simplicidade importam.",
    "Evite como solução única para relações complexas, fortes interações, extremos dominantes ou alvo limitado que a reta pode violar.",
    "Estimar custo de atendimento ou perda financeira e explicar quais fatores elevam ou reduzem a previsão.",
    "Explicar funcionamento, uma premissa, bom/mau cenário, overfit/underfit e impacto da multicolinearidade."),
  "regr-02": guide(
    "Regularização adiciona penalidade aos coeficientes: L1 pode zerá-los; L2 os encolhe; Elastic Net combina os efeitos.",
    "Controla complexidade e estabiliza modelos com muitas variáveis ou correlação.",
    "Use com variáveis padronizadas e escolha da intensidade dentro de validação cruzada.",
    "Não espere que L2 faça seleção automática nem interprete coeficientes sem considerar a escala.",
    "Criar score linear estável: L1 para ficha compacta, L2 para dividir peso entre sinais correlacionados.",
    "Diferenciar L1/L2, explicar alpha/C, necessidade de escala e relação com viés e variância."),
  "regr-03": guide(
    "Árvore de regressão divide o espaço por regras e prevê em cada folha um valor agregado, normalmente a média.",
    "Captura não linearidades e interações sem exigir uma equação global.",
    "Use quando há cortes e interações naturais e uma previsão por segmentos é aceitável.",
    "Evite extrapolação fora da faixa de treino e árvores profundas sem controle, pois são instáveis.",
    "Estimar gasto ou perda com regras diferentes para exposição, atraso e tempo de relacionamento.",
    "Explicar corte por redução do erro, valor da folha, profundidade, vantagem e overfitting."),
  "regr-04": guide(
    "Resíduo é a diferença entre observado e previsto. Seu padrão revela erro sistemático, heterocedasticidade, outliers e especificação inadequada.",
    "Uma métrica média pode parecer boa enquanto o modelo erra sempre um segmento ou faixa de valor.",
    "Use gráficos de resíduos, análise por faixa/segmento/tempo e comparação treino-validação.",
    "Não procure apenas normalidade nem descarte resíduos grandes sem investigar a causa.",
    "Verificar se o modelo de perda subestima sistematicamente contratos de alto valor ou uma região.",
    "Interpretar padrões de resíduos e dizer a ação: transformação, nova variável, segmentação ou outro modelo."),
  "regr-05": guide(
    "GLM estende modelos lineares para alvos com distribuições e funções de ligação adequadas, como binomial, Poisson e Gamma.",
    "Permite respeitar o suporte do alvo e manter estrutura interpretável.",
    "Use logística para probabilidade, Poisson para contagens e Gamma para valores positivos assimétricos, após validar dispersão.",
    "Evite escolher a família só pelo nome do alvo ou ignorar excesso de zeros e sobredispersão.",
    "Modelar número de contatos com Poisson ou custo positivo de sinistro com Gamma.",
    "Explicar família, link e por que GLM pode ser melhor que uma regressão linear comum no cenário."),

  "class-01": guide(
    "Árvore de classificação cria regras sucessivas e termina em folhas com classe ou probabilidade.",
    "É intuitiva, captura interações e não depende de escala, sendo um bom instrumento de explicação.",
    "Use como baseline não linear, para regras segmentadas ou quando uma árvore rasa atende à governança.",
    "Evite árvore profunda isolada sem poda/validação; ela é instável e tende a memorizar.",
    "Priorizar clientes para cobrança com regras de atraso, exposição e histórico.",
    "Estrutura, corte por Gini/entropia, resposta da folha, encoding, pipeline, desbalanceamento, vantagens e limitações."),
  "class-02": guide(
    "Random Forest combina muitas árvores treinadas em amostras bootstrap e subconjuntos de atributos.",
    "A média/voto de árvores descorrelacionadas reduz a variância de uma árvore isolada.",
    "Use em dados tabulares, relações não lineares e como baseline robusto com pouco pré-processamento de escala.",
    "Evite quando latência, tamanho, extrapolação ou explicação simples por regra são requisitos rígidos.",
    "Modelar propensão ou risco e comparar AUC/Gini, calibração e estabilidade com logística.",
    "Explicar bootstrap, bagging, aleatoriedade de atributos, OOB, redução de variância e importância."),
  "class-03": guide(
    "Boosting cria modelos em sequência, fazendo cada novo learner corrigir erros ou resíduos anteriores.",
    "Costuma reduzir viés e produzir forte desempenho em dados tabulares.",
    "Use quando baseline simples não captura padrões e há capacidade de ajustar learning rate, profundidade e número de árvores.",
    "Evite tuning no teste, excesso de complexidade sem ganho OOT ou implantação que não suporta a latência.",
    "Ranquear risco de inadimplência e medir ganho sobre logística/Random Forest com validação temporal.",
    "Diferenciar AdaBoost e Gradient Boosting em alto nível, bagging versus boosting, viés/variância e principais hiperparâmetros."),
  "class-04": guide(
    "Regressão logística transforma combinação linear em probabilidade entre 0 e 1 e classifica após um threshold.",
    "É interpretável, rápida e uma referência forte para classificação binária e score de risco.",
    "Use quando probabilidade, transparência e baseline estável importam; trate não linearidades com transformações quando necessário.",
    "Evite assumir que 0,5 é sempre o melhor corte ou que coeficientes provam causalidade.",
    "Estimar probabilidade de default e escolher corte por perda esperada, aprovação e apetite de risco.",
    "Explicar odds/logit, predict_proba, threshold, regularização, métricas e calibração."),
  "class-05": guide(
    "KNN prevê usando os vizinhos mais próximos no espaço de atributos; vota para classe ou faz média para regressão.",
    "É simples, não paramétrico e captura fronteiras locais, servindo como boa referência conceitual.",
    "Use em bases menores, atributos bem representados e escalados, com distância significativa.",
    "Evite alta dimensão, grande volume, muitas variáveis irrelevantes ou necessidade de inferência muito rápida.",
    "Encontrar clientes de comportamento semelhante para estimar resposta, com validação rigorosa e sem usar identidade sensível indevida.",
    "Explicar K, distância, escala, custo de predição, escolha de vizinhos e capacidade de capturar não linearidade."),
  "class-06": guide(
    "Naive Bayes aplica Bayes assumindo independência condicional dos atributos dada a classe.",
    "Treina rápido, funciona bem em alta dimensão esparsa e oferece um baseline eficiente para texto.",
    "Use Multinomial para contagens, Bernoulli para presença/ausência e Gaussian para contínuas aproximadamente normais por classe.",
    "Evite quando interações entre atributos são essenciais ou quando probabilidades precisam ser usadas sem avaliar calibração.",
    "Classificar motivo de contato, reclamação ou mensagem suspeita para encaminhar filas.",
    "Premissa, funcionamento, exemplo adequado, suavização e diferença entre Multinomial, Bernoulli e Gaussian."),
  "class-07": guide(
    "Rede neural combina camadas de transformações, pesos e ativações, aprendidos por backpropagation.",
    "Representa relações complexas e é especialmente útil em texto, imagem, áudio e grande volume.",
    "Use quando há dados e ganho claro sobre baselines, com infraestrutura e monitoramento compatíveis.",
    "Evite como primeira opção em tabela pequena quando modelos simples entregam resultado semelhante e maior governança.",
    "Classificar voz, documento ou imagem em atendimento/fraude com revisão humana e controle de erro.",
    "Explicar neurônio, ativação, forward, loss, backpropagation, overfitting e necessidade de encoding/escala."),
  "class-08": guide(
    "SVM encontra uma fronteira de margem máxima; kernels permitem representar separações não lineares por similaridade.",
    "Pode generalizar bem em dados médios e alta dimensão quando escala e hiperparâmetros estão corretos.",
    "Use SVM linear em espaço esparso e RBF quando uma fronteira não linear é plausível e o volume permite.",
    "Evite bases enormes, necessidade de probabilidade nativa/explicação simples ou dados não escalados.",
    "Classificar risco ou texto comparando kernel linear/RBF, custo de inferência e calibração.",
    "Explicar margem, support vectors, C, gamma, kernel, escala e diferença entre SVC e SVR."),

  "cluster-01": guide(
    "K-means alterna atribuição ao centroide mais próximo e atualização pela média; k-medoids usa observações reais como centros.",
    "Cria segmentos por similaridade sem rótulo e ajuda a explorar comportamentos diferentes.",
    "Use quando distância é significativa e grupos são relativamente compactos; prefira medoids quando extremos preocupam.",
    "Evite interpretar cluster como verdade, usar variáveis sem escala ou aplicar k-means a formas/densidades muito diferentes.",
    "Segmentar clientes por saldo, frequência e uso para desenhar estratégias distintas e acionáveis.",
    "Funcionamento, necessidade de escala, efeito de outliers, k-means versus k-medoids e avaliação."),
  "cluster-02": guide(
    "DBSCAN forma grupos por regiões densas e marca pontos fora delas como ruído, usando eps e min_samples.",
    "Encontra formas arbitrárias e não exige número de clusters, além de destacar pontos isolados.",
    "Use quando densidade e ruído têm significado e a escala local é relativamente consistente.",
    "Evite densidades muito diferentes, alta dimensão sem boa representação ou escolha de eps sem análise.",
    "Criar fila de transações atípicas como triagem, sem afirmar automaticamente que ruído é fraude.",
    "Explicar core/border/noise, eps, min_samples, escala, k-distance e diferença entre anomalia e fraude."),
  "cluster-03": guide(
    "Agrupamento hierárquico une ou divide grupos e produz um dendrograma; linkage define a distância entre clusters.",
    "Mostra níveis de granularidade e permite explorar taxonomias sem fixar K no início.",
    "Use em bases menores, quando a hierarquia é interpretável e queremos comparar single, complete, average ou Ward.",
    "Evite grandes volumes sem estratégia, interpretação apenas visual do corte ou linkage inadequado à geometria.",
    "Criar uma hierarquia de perfis empresariais e escolher um corte que gere segmentos operáveis.",
    "Dendrograma, diferenças de linkage, complexidade, escolha do corte e métricas como silhouette."),
  "cluster-04": guide(
    "Escolher o número de clusters combina medidas como inércia/cotovelo, silhouette, estabilidade e utilidade operacional.",
    "K maior sempre reduz a inércia, por isso a decisão exige avaliar ganho marginal e separação.",
    "Use várias evidências, seeds e perfis de negócio; compare tamanhos e estabilidade ao longo do tempo.",
    "Não escolha K só pelo maior gráfico ou ignore clusters minúsculos e impossíveis de acionar.",
    "Preferir três segmentos estáveis e acionáveis a cinco segmentos com silhouette ligeiramente maior, mas sem estratégia distinta.",
    "Explicar cotovelo versus silhouette, o que a silhouette mede e por que negócio participa da decisão."),
  "cluster-05": guide(
    "GMM modela os dados como mistura de Gaussianas e fornece probabilidade de pertencimento a cada componente.",
    "Permite soft clustering e representa grupos elípticos com diferentes covariâncias.",
    "Use quando sobreposição e incerteza de pertença são úteis; compare componentes por AIC/BIC e estabilidade.",
    "Evite quando a hipótese gaussiana é inadequada, há muitos extremos ou probabilidades serão tratadas como certeza.",
    "Identificar cliente com 60% de perfil transacional e 40% de perfil investidor, permitindo estratégia graduada.",
    "Explicar mistura, EM em alto nível, responsabilidade, covariância, AIC/BIC e diferença para k-means."),

  "sql-01": guide(
    "Modelo relacional organiza dados em tabelas ligadas por chaves, com granularidade e regras de integridade explícitas.",
    "Um bom modelo evita duplicidade, inconsistência e joins ambíguos que contaminam análises.",
    "Use entidades e relações bem definidas, normalização quando apropriada e tabelas analíticas com granularidade documentada.",
    "Evite misturar várias granularidades na mesma tabela ou criar relacionamento sem cardinalidade conhecida.",
    "Relacionar cliente, conta, cartão e transação mantendo uma linha por entidade e regras auditáveis.",
    "Entender entidade, atributo, cardinalidade, normalização e como a modelagem afeta o join."),
  "sql-02": guide(
    "SQL consulta e transforma dados relacionais com SELECT, filtros, agregações, CTEs, subqueries e funções de janela.",
    "É a ferramenta central para construir a base correta antes de qualquer modelo.",
    "Use consultas legíveis, aliases, CTEs, filtros temporais e reconciliação de contagens/valores.",
    "Evite SELECT *, filtros de data ambíguos, lógica repetida e query sem testar duplicidades.",
    "Montar uma linha por cliente-mês com comportamento anterior à data de referência.",
    "Escrever e interpretar SELECT/WHERE/CASE/CTE/janelas e explicar a ordem lógica da consulta."),
  "sql-03": guide(
    "Álgebra relacional explica combinar, filtrar, ordenar e agregar tabelas; joins determinam quais linhas permanecem e como podem se multiplicar.",
    "Erros de join são uma das fontes mais comuns de valores inflados e bases incorretas.",
    "Use INNER para correspondências, LEFT para preservar a base motriz e GROUP BY na granularidade desejada.",
    "Evite join sem chave/cardinalidade, agrupamento por coluna errada ou assumir que LEFT JOIN mantém exatamente a mesma quantidade de linhas.",
    "Somar transações por cliente sem multiplicar cartões, contratos ou meses.",
    "Prever volumetria de joins, diferenciar INNER/LEFT/RIGHT/FULL, GROUP BY, ORDER BY e detectar N:M."),
  "sql-04": guide(
    "Chave primária identifica unicamente uma linha; estrangeira referencia outra tabela; chaves candidatas/secundárias apoiam identificação e acesso.",
    "Chaves preservam integridade e permitem joins corretos na granularidade esperada.",
    "Use chaves estáveis, restrições de unicidade e validação de cobertura antes de combinar tabelas.",
    "Evite usar nome, CPF bruto ou campo mutável como chave técnica sem governança, ou aceitar duplicidade silenciosa.",
    "Cliente_id liga cliente a contas; conta_id liga conta a transações, com proteção e minimização de dados pessoais.",
    "Diferenciar tipos de chave, explicar integridade referencial e diagnosticar duplicidade/multiplicação."),

  "genai-01": guide(
    "IA Generativa aprende padrões para produzir conteúdo; NLP trata processamento de linguagem, incluindo classificação, extração, busca e geração.",
    "Permite trabalhar com grande volume de texto e interação natural, mas exige avaliação e governança específicas.",
    "Use quando texto é parte central do problema e compare geração com soluções discriminativas ou regras simples.",
    "Evite usar LLM quando uma consulta determinística, classificação simples ou busca exata resolve com menor risco.",
    "Resumir atendimentos ou apoiar consulta de políticas com fontes e revisão humana.",
    "Diferenciar modelo generativo de classificador, reconhecer limitações como alucinação, privacidade e custo."),
  "genai-02": guide(
    "Transformer usa attention para relacionar tokens e processar contexto, formando a base dos LLMs modernos.",
    "Attention permite ponderar partes relevantes do contexto e treinar em paralelo melhor que arquiteturas sequenciais antigas.",
    "Use a intuição para entender contexto, tokens, embeddings, limite de janela e geração autoregressiva.",
    "Não trate attention como explicação causal nem assuma memória ilimitada ou compreensão humana.",
    "Um assistente de normas relaciona a pergunta a trechos relevantes do documento dentro do contexto.",
    "Explicar tokens, embeddings, attention e geração em alto nível, sem derivação matricial detalhada."),
  "genai-03": guide(
    "In-context learning orienta o modelo por instruções e exemplos no prompt sem alterar seus pesos.",
    "É rápido para adaptar comportamento e testar tarefas antes de investir em treinamento.",
    "Use exemplos representativos, formato de saída e critérios claros quando o modelo já possui capacidade para a tarefa.",
    "Evite exemplos com dados sensíveis, contraditórios ou que não cobrem casos-limite; não confunda contexto com aprendizado permanente.",
    "Fornecer exemplos anonimizados de classificação de motivo de contato e exigir saída estruturada.",
    "Diferenciar ICL de fine-tuning e explicar few-shot, contexto, limites e avaliação."),
  "genai-04": guide(
    "RAG recupera documentos relevantes e os entrega ao modelo para gerar resposta apoiada em fontes; banco vetorial busca por similaridade de embeddings.",
    "Atualiza conhecimento sem retreinar e reduz alucinação quando retrieval e citação são bem avaliados.",
    "Use para conhecimento privado/atualizado, com chunking, permissões, metadados e avaliação de retrieval.",
    "Evite acreditar que RAG garante verdade; documento errado, recuperação fraca ou prompt injection ainda produzem falha.",
    "Assistente de política de crédito que responde apenas com trechos permitidos e cita a norma vigente.",
    "Explicar ingestão, chunks, embeddings, top-k, grounding, banco vetorial e avaliação separada de busca e resposta."),
  "genai-05": guide(
    "Engenharia de prompt estrutura objetivo, contexto, restrições, exemplos, formato e critérios de qualidade.",
    "Prompts claros tornam respostas mais consistentes e testáveis, embora não substituam avaliação ou controles.",
    "Use templates versionados, exemplos e saída estruturada; teste em conjunto representativo de casos.",
    "Evite prompt enorme sem necessidade, instruções ambíguas, segredo no prompt ou confiar em uma única tentativa.",
    "Padronizar resumo de atendimento com campos obrigatórios, proibição de inventar e indicação de evidência.",
    "Saber montar prompt completo e explicar limites, variabilidade, versionamento e proteção contra injection."),
  "genai-06": guide(
    "Fine-tuning ajusta pesos com exemplos; outras técnicas de treinamento adaptam comportamento, domínio ou formato.",
    "Pode aumentar consistência e especialização quando prompt/RAG não resolvem, mas exige dados, avaliação e manutenção.",
    "Use após baseline, com dataset representativo, separação de avaliação e necessidade clara de comportamento aprendido.",
    "Evite fine-tuning para simplesmente inserir fatos atualizáveis ou com poucos exemplos de baixa qualidade.",
    "Adaptar um modelo para classificar linguagem interna padronizada, mantendo políticas factuais em RAG.",
    "Comparar prompt, RAG e fine-tuning; explicar dados, overfitting, custo e necessidade de avaliação."),
  "genai-07": guide(
    "Quantization reduz a precisão numérica dos pesos para diminuir memória, custo e, às vezes, latência.",
    "Permite executar modelos maiores em infraestrutura menor, aceitando possível perda de qualidade.",
    "Use quando implantação/custo é gargalo e avalie a versão quantizada nas tarefas e grupos relevantes.",
    "Evite assumir ganho gratuito; algumas tarefas e hardwares podem perder qualidade ou não acelerar.",
    "Executar modelo de classificação de texto em ambiente controlado com menor custo, comparando qualidade e tempo.",
    "Explicar trade-off memória/velocidade/qualidade e por que é necessária avaliação após quantizar."),
  "genai-08": guide(
    "Embedding transforma texto ou entidade em vetor cujo espaço procura preservar similaridade semântica.",
    "Viabiliza busca, recomendação, clustering e recuperação mesmo quando palavras exatas diferem.",
    "Use com métrica de similaridade, modelo e granularidade adequados; avalie top-k em exemplos reais.",
    "Evite tratar proximidade como equivalência factual, ignorar viés ou misturar versões de embeddings no índice.",
    "Buscar políticas sobre renegociação mesmo quando a pergunta usa termos diferentes do documento.",
    "Explicar vetor, similaridade cosseno, uso em RAG/clustering e necessidade de avaliação de retrieval."),
  "genai-09": guide(
    "RLHF usa preferências humanas para ajustar o comportamento do modelo, geralmente por modelo de recompensa e otimização.",
    "Ajuda a alinhar respostas a utilidade e segurança, mas incorpora limitações e vieses do processo de preferência.",
    "Use como conceito para entender alinhamento de modelos gerais e diferença entre aprender linguagem e preferências.",
    "Não suponha que RLHF torna o modelo verdadeiro, imparcial ou seguro em todos os contextos.",
    "Um banco normalmente consome modelos alinhados e complementa com políticas, avaliações e controles próprios.",
    "Explicar objetivo e etapas em alto nível, limitações e diferença para fine-tuning supervisionado."),
  "genai-10": guide(
    "Safeguards e guardrails são controles de entrada, saída, permissão, dados, ferramentas, monitoramento e revisão humana.",
    "Modelos generativos podem alucinar, expor dados ou seguir instruções maliciosas; segurança precisa existir em camadas.",
    "Use classificação de conteúdo, redaction, allowlists, grounding, abstenção, auditoria e fallback humano conforme o risco.",
    "Evite depender apenas de um prompt de sistema ou bloquear palavras sem avaliar ataques e falsos positivos.",
    "Assistente bancário mascara PII, limita fontes e ações, cita evidências e transfere casos sensíveis a uma pessoa.",
    "Explicar defesa em profundidade, prompt injection, privacidade, abstenção, monitoramento e human-in-the-loop."),

  "po-01": guide(
    "Programação linear otimiza uma função objetivo sujeita a restrições lineares e variáveis contínuas.",
    "Transforma decisões de alocação em modelo explícito, permitindo comparar solução com capacidade e custo.",
    "Use quando objetivo e restrições são aproximadamente lineares e decisões podem ser fracionárias.",
    "Evite quando decisões precisam ser inteiras ou relações são fortemente não lineares sem aproximação válida.",
    "Distribuir orçamento de campanha entre canais respeitando capacidade, custo e retorno esperado.",
    "Identificar variável, objetivo, restrição, região viável e interpretar solução, sem executar Simplex longo à mão."),
  "po-02": guide(
    "Modelar programação linear é traduzir uma decisão real em variáveis, coeficientes, objetivo e restrições com unidades coerentes.",
    "A formulação define o problema; um solver perfeito não corrige objetivo ou restrição mal representados.",
    "Use uma tabela de decisão, valide unidades e compare a solução com baseline e cenários.",
    "Evite coeficientes sem fonte, restrições que contradizem operação ou objetivo que otimiza proxy errado.",
    "Maximizar recuperação de cobrança respeitando horas de agentes, canais e limites de contato.",
    "Montar e explicar uma formulação simples e verificar viabilidade, unidade e valor de negócio."),
  "po-03": guide(
    "Solução gráfica visualiza a região viável em duas variáveis; Simplex percorre vértices para encontrar uma solução ótima em problemas lineares.",
    "Dá intuição sobre restrições ativas, folgas e por que o ótimo ocorre em um extremo da região.",
    "Use o gráfico para ensino/diagnóstico e solver para dimensões reais, sempre verificando status.",
    "Evite tentar solução gráfica com muitas variáveis ou reportar solução sem confirmar viabilidade e ótimo.",
    "Visualizar dois canais de campanha sob orçamento e capacidade; depois resolver versão maior com solver.",
    "Explicar região viável, vértice, restrição ativa, folga e ideia do Simplex, sem tableaux extensos."),

  "pi-01": guide(
    "Programação inteira exige que algumas decisões assumam valores inteiros ou binários, representando escolhas indivisíveis.",
    "Muitas decisões operacionais são sim/não ou quantidades inteiras e não podem ser tratadas como frações.",
    "Use para selecionar clientes, abrir unidades, montar escala ou escolher canais sob restrições.",
    "Evite integralidade desnecessária, pois torna o problema muito mais difícil de resolver.",
    "Decidir quais campanhas ativar e quais clientes selecionar dentro de orçamento e capacidade.",
    "Diferenciar LP de IP, variável binária/integer e explicar por que decisão discreta aumenta complexidade."),
  "pi-02": guide(
    "Relaxação linear remove temporariamente a exigência de integralidade e resolve uma versão contínua do problema.",
    "Fornece um bound, ajuda a avaliar dificuldade e orienta algoritmos como Branch-and-Bound.",
    "Use para obter limite e diagnóstico da formulação antes ou durante a busca inteira.",
    "Não trate automaticamente a solução fracionária como decisão implementável.",
    "Uma seleção relaxada pode indicar 0,4 de uma campanha; isso é bound, não plano operacional.",
    "Explicar por que a relaxação é mais fácil, o que é bound e como ela apoia a solução inteira."),
  "pi-03": guide(
    "Arredondamento converte uma solução fracionária em inteira por regra ou heurística.",
    "Pode produzir rapidamente uma solução candidata, mas pode perder qualidade ou violar restrições.",
    "Use como heurística acompanhada de reparo e validação de todas as restrições.",
    "Não arredonde cada variável isoladamente e assuma que capacidade, orçamento e lógica continuam válidos.",
    "Arredondar seleção de clientes pode ultrapassar orçamento; é preciso reparar e recalcular objetivo.",
    "Explicar por que arredondamento pode ser inviável e como verificar/ajustar uma solução."),
  "pi-04": guide(
    "Branch-and-Bound divide o espaço de decisões, usa relaxações para obter bounds e elimina ramos que não podem superar a melhor solução conhecida.",
    "Permite encontrar e provar qualidade de soluções inteiras sem enumerar todas as combinações.",
    "Use como conceito central de solvers MIP, acompanhando incumbente, bound, nós e tempo.",
    "Evite interpretar interrupção por tempo como ótimo provado; consulte status e gap.",
    "Otimizar seleção de ofertas binárias e parar com gap aceitável quando o tempo operacional termina.",
    "Explicar branching, bound, pruning, incumbente e condição de parada em linguagem simples."),

  "mip-01": guide(
    "MIP combina variáveis contínuas com inteiras/binárias em um mesmo problema de otimização.",
    "Representa decisões reais que misturam quantidade, orçamento e escolhas sim/não.",
    "Use quando a decisão discreta é indispensável e restrições/objetivo podem ser formulados linearmente.",
    "Evite MIP quando uma regra simples resolve ou quando a formulação usa Big-M frouxo e cresce além da necessidade.",
    "Escolher clientes e canal enquanto define valores de orçamento e capacidade contínuos.",
    "Diferenciar LP, IP e MIP e identificar variáveis, objetivo e restrições de um caso."),
  "mip-02": guide(
    "Best Bound é o melhor limite teórico disponível; GAP mede a distância entre esse limite e a melhor solução viável, o incumbente.",
    "Mostra quanto ainda pode melhorar e qual garantia de qualidade existe quando o solver para.",
    "Use junto com tempo, objetivo, status e viabilidade para decidir se a solução é suficiente.",
    "Não confunda gap pequeno com modelo correto nem compare gap sem saber se minimiza ou maximiza.",
    "Uma solução de campanha com gap de 1% pode ser aceitável se o ganho máximo restante não justifica horas de processamento.",
    "Interpretar incumbente, bound e gap e explicar por que uma solução pode ser boa sem ótimo provado."),
  "mip-03": guide(
    "Solver é o software que aplica presolve, heurísticas, Branch-and-Bound, cuts e métodos numéricos para resolver a formulação.",
    "Automatiza a busca, mas depende da qualidade do modelo, dos dados e dos parâmetros.",
    "Use solvers como HiGHS, CBC, SCIP, Gurobi ou CPLEX conforme licença, escala e necessidade, registrando versão e status.",
    "Não trate o solver como caixa mágica nem publique solução sem verificar viabilidade, gap, tempo e unidades.",
    "Resolver alocação de cobrança, comparar baseline e registrar objetivo, tempo, status e gap no relatório.",
    "Saber o que o solver entrega, interpretar status e comparar opções sem decorar comandos de todos os produtos."),
};

const specificEnhancements: Partial<Record<string, SyllabusStudyEnhancement>> = {
  "estat-03": {
    interpretation: "Leia centro, dispersão, assimetria e caudas em conjunto. A média responde ao valor esperado, a mediana ao cliente típico e os percentis a cortes operacionais; variância e desvio mostram heterogeneidade.",
    workflow: ["Inspecione histograma e boxplot.", "Compare média e mediana.", "Calcule quartis, IQR e percentis de negócio.", "Investigue extremos antes de decidir tratá-los.", "Descreva o efeito na decisão bancária."],
    codeHint: "df['valor'].describe(percentiles=[.25, .5, .75, .9, .95])",
    commonErrors: ["Usar apenas a média em uma distribuição assimétrica.", "Excluir outliers sem verificar se são fraude, erro ou cliente legítimo.", "Confundir variância com unidade original; o desvio padrão volta à unidade da variável."],
    subtopics: [
      { title: "Média", level: "essential", explanation: "Soma dividida pela quantidade; é sensível a extremos.", banking: "Ticket médio ajuda no volume esperado, mas pode ser puxado por poucas transações muito altas." },
      { title: "Mediana", level: "essential", explanation: "Valor central após ordenar; é robusta a extremos.", banking: "Representa melhor o saldo típico quando a carteira tem uma cauda de clientes de alta renda." },
      { title: "Quartis e percentis", level: "essential", explanation: "Cortes que dividem a distribuição ordenada; P90 deixa 90% dos valores abaixo dele.", banking: "Permitem definir faixas de risco, limites operacionais e públicos prioritários." },
      { title: "Moda", level: "important", explanation: "Valor ou categoria mais frequente; pode haver mais de uma moda.", banking: "Mostra o canal ou produto mais comum, mas não resume sozinho uma variável contínua." },
      { title: "Variância e desvio padrão", level: "essential", explanation: "Medem dispersão em torno da média; o desvio está na unidade original.", banking: "Uma carteira com maior dispersão de perda exige leitura de cauda e segmentação, não só média." },
      { title: "IQR", level: "important", explanation: "Q3 − Q1; resume os 50% centrais e apoia a investigação de extremos.", banking: "É uma regra inicial de alerta para transações atípicas, nunca uma prova automática de fraude." },
    ],
  },
  "aval-01": {
    interpretation: "A métrica certa depende do custo do falso positivo e do falso negativo, do desbalanceamento e da capacidade operacional. Ranking, classificação por limiar, calibração e valor financeiro são avaliações diferentes.",
    workflow: ["Defina o evento positivo e o custo dos erros.", "Crie baseline e matriz de confusão.", "Compare métricas sem escolher limiar no teste.", "Avalie por segmento e período.", "Traduza a métrica em impacto operacional."],
    codeHint: "precision_recall_fscore_support(y_test, pred); roc_auc_score(y_test, score)",
    commonErrors: ["Usar acurácia em classe rara.", "Dizer que Gini 50% equivale a moeda: moeda tem AUC 0,5 e Gini 0%.", "Interpretar AUC como probabilidade calibrada.", "Escolher threshold no conjunto de teste."],
    subtopics: [
      { title: "Precision", level: "essential", explanation: "Entre os casos marcados como positivos, quantos eram realmente positivos.", banking: "Qualidade da fila enviada à investigação de fraude." },
      { title: "Recall", level: "essential", explanation: "Entre todos os positivos reais, quantos o modelo encontrou.", banking: "Cobertura das fraudes ou inadimplentes que o processo precisa capturar." },
      { title: "F1", level: "essential", explanation: "Média harmônica entre precision e recall; útil quando ambos importam.", banking: "Compara soluções sob equilíbrio, mas não substitui custo financeiro nem escolha de limiar." },
      { title: "ROC-AUC, Gini e KS", level: "essential", explanation: "Avaliam capacidade de ordenar classes em vários limiares. Gini = 2 × AUC − 1; KS é a maior separação entre acumuladas.", banking: "Muito usados em score de crédito, acompanhados de calibração e estabilidade." },
      { title: "MAE, RMSE e R²", level: "essential", explanation: "MAE mede erro absoluto típico, RMSE penaliza mais erros grandes e R² compara variância explicada com uma baseline de média.", banking: "Escolha depende do custo de errar perdas, renda ou severidade; sempre leia resíduos e unidades." },
      { title: "Threshold", level: "important", explanation: "Transforma score em decisão e altera precision, recall e volume.", banking: "Deve respeitar apetite de risco, capacidade da operação e custo de cada erro." },
    ],
  },
  "aval-02": {
    interpretation: "Uma validação boa imita como o modelo verá dados novos. O split não é burocracia: é a barreira contra memória, vazamento e otimismo.",
    workflow: ["Defina unidade e tempo da previsão.", "Reserve teste/OOT intocado.", "Ajuste preprocessamento dentro do treino/fold.", "Selecione hiperparâmetros na validação.", "Reporte teste final uma única vez."],
    codeHint: "cross_validate(pipeline, X, y, cv=StratifiedKFold(5), scoring=['roc_auc','f1'])",
    commonErrors: ["Escalar ou fazer oversampling antes do split.", "Embaralhar dados temporais.", "Usar o teste repetidamente para escolher o modelo.", "Deixar o mesmo cliente em treino e teste quando isso gera vazamento."],
    subtopics: [
      { title: "Holdout", level: "essential", explanation: "Uma separação fixa, simples e rápida.", banking: "Adequado em bases grandes quando o corte representa produção." },
      { title: "K-fold", level: "essential", explanation: "Alterna folds de validação e resume variação do desempenho.", banking: "Ajuda em bases menores, com estratificação ou grupos quando necessário." },
      { title: "Leave-one-out", level: "good_to_know", explanation: "Cada observação vira validação uma vez; custa caro e pode ter alta variância.", banking: "Raramente é a primeira opção em bases bancárias volumosas." },
      { title: "Out-of-sample", level: "essential", explanation: "Avaliação em observações não usadas no ajuste.", banking: "Indica generalização para clientes não vistos." },
      { title: "Out-of-time", level: "essential", explanation: "Treina no passado e testa em período futuro.", banking: "É central para risco, fraude e propensão sujeitos a drift e mudança de safra." },
    ],
  },
  "class-06": {
    interpretation: "Compare o prior da classe com as evidências das features. A independência é condicional à classe; é uma simplificação útil, não a afirmação de que os dados são independentes no mundo real.",
    workflow: ["Identifique o tipo das features.", "Escolha Gaussian, Bernoulli ou Multinomial.", "Faça o split e prepare dados sem leakage.", "Ajuste suavização/prior.", "Avalie ranking, limiar e calibração."],
    codeHint: "Pipeline([('vetor', CountVectorizer()), ('modelo', MultinomialNB(alpha=1.0))])",
    commonErrors: ["Usar MultinomialNB com valores negativos.", "Confundir independência marginal com condicional.", "Escolher a variante pelo nome, sem olhar a natureza do dado."],
    subtopics: [
      { title: "Gaussian Naive Bayes", level: "essential", explanation: "Modela cada feature contínua por uma Normal dentro de cada classe.", banking: "Baseline rápido para classificação com variáveis contínuas aproximadamente compatíveis." },
      { title: "Bernoulli Naive Bayes", level: "essential", explanation: "Trabalha com presença/ausência ou indicadores binários.", banking: "Pode usar sinais como possui_produto, evento_ocorreu ou termo_presente." },
      { title: "Multinomial Naive Bayes", level: "good_to_know", explanation: "Modela contagens não negativas, muito comum em bag-of-words.", banking: "Triagem de reclamações e mensagens por frequência de termos." },
    ],
  },
};

export function getSyllabusStudyEnhancement(id: string): SyllabusStudyEnhancement {
  const specific = specificEnhancements[id];
  if (specific) return specific;
  const base = syllabusStudyGuides[id];
  return {
    interpretation: base?.examFocus ?? "Interprete o resultado no contexto do problema e confronte-o com uma baseline simples.",
    workflow: [
      "Defina a pergunta de negócio e a unidade analisada.",
      "Inspecione a qualidade dos dados e evite vazamento.",
      "Aplique o conceito com uma baseline simples.",
      "Interprete o resultado e suas limitações.",
      "Explique a decisão em linguagem de negócio.",
    ],
    codeHint: "# Implemente primeiro uma versão pequena, reproduzível e validada.",
    commonErrors: [
      "Aplicar a técnica sem verificar premissas e qualidade dos dados.",
      "Confundir desempenho técnico com valor de negócio.",
      "Omitir limitações, incerteza ou risco de vazamento.",
    ],
  };
}
