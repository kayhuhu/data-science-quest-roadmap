# Roadmap Cientista de Dados - 22 semanas - blocos lineares da ementa
03/08/2026 a 31/12/2026


## Semana 1 - Propriedades das distribuições e análise exploratória
**Período:** 03/08 a 09/08/2026  
**Bloco:** BLOCO 1 - ESTATÍSTICA BÁSICA

### Objetivo
Olhar uma base e descrever corretamente centro, dispersão, forma, assimetria, valores extremos e limitações da amostra.

### Ementa oficial
- □ Propriedades de distribuições: médias, medianas, quartis, moda, variância, etc.

### Conteúdo
- População, amostra, observação, variável e tipos de variável.
- Média, mediana, moda, quartis e percentis.
- Amplitude, variância, desvio padrão, IQR e coeficiente de variação.
- Histograma, boxplot, barras, dispersão e ECDF.
- Assimetria, caudas, multimodalidade e efeito de outliers.
- EDA univariada, bivariada e análise por segmentos de negócio.

### Materiais
- Livro 2: Cap. 1 e Cap. 4 (material principal).
- Luiza: p. 1-4.
- Douglas: Cap. 2 - Estatística.
- Livro 3: Cap. 7-8 para pandas e gráficos.

### Vídeos
- **StatQuest:** mean, median, variance, standard deviation, histograms e boxplots (https://statquest.org/video_index.html)
- **Hashtag Programação:** análise exploratória e pandas (https://www.youtube.com/@HashtagProgramacao)

### Projeto GitHub - `01-banking-portfolio-eda`
**Projeto:** Relatório executivo de carteira
**Objetivo:** EDA completa de clientes, com relatório técnico e executivo.
**Entregas:**
- Notebook com medidas/gráficos e interpretação.
- src/ com funções de EDA.
- README com problema, dados, achados e limitações.
- Relatório executivo de uma página.
- Testes das funções principais.

### Sabatina
1. Quando a mediana é mais informativa que a média?
2. O que a variância mede?
3. Por que o desvio padrão é mais interpretável que a variância?
4. O que os quartis representam?
5. O que o IQR mede?
6. Moda serve apenas para variável categórica?
7. Correlação é parte da EDA?
8. O que diferencia uma EDA boa de uma lista de gráficos?
9. Como você aplicaria propriedades de distribuições e EDA em um problema bancário real?
10. Qual erro mais comum ao usar propriedades de distribuições e EDA?

## Semana 2 - Variáveis aleatórias, FDP/FDA e distribuições da ementa
**Período:** 10/08 a 16/08/2026  
**Bloco:** BLOCO 1 - ESTATÍSTICA BÁSICA

### Objetivo
Reconhecer o tipo de experimento, definir X e seus parâmetros, escolher uma distribuição plausível e interpretar média/variância no contexto bancário.

### Ementa oficial
- □ Variáveis aleatórias contínuas e discretas
- □ Função densidade de probabilidade e distribuição acumulada
- □ Principais distribuições: Normal, Bernoulli, Binomial, Uniforme, Poisson, Geométrica

### Conteúdo
- Experimento aleatório, espaço de resultados e variável aleatória.
- Discreta: função de probabilidade; contínua: FDP e área sob a curva.
- FDA como P(X <= x), quantis e percentis.
- Esperança, variância e parâmetros versus estimativas.
- Bernoulli, Binomial e Geométrica.
- Poisson, Uniforme contínua e Normal.
- Como reconhecer, estimar parâmetros, verificar ajuste e rejeitar uma distribuição inadequada.

### Materiais
- Livro 2: Cap. 2, 3 e 6 (material principal).
- Livro didático criado nesta conversa: variáveis aleatórias, distribuições e testes.
- Luiza: p. 8-11.
- Douglas: Cap. 2.

### Vídeos
- **StatQuest:** probability distributions, Normal, Binomial e Poisson (https://statquest.org/video_index.html)
- **Google MLCC:** dados numéricos e estatísticas (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `02-banking-risk-distributions-lab`
**Projeto:** Laboratório de distribuições
**Objetivo:** Simular e validar fenômenos Bernoulli, Binomial, Geométrico, Poisson, Uniforme e Normal.
**Entregas:**
- Definição de X, suporte e parâmetros.
- Fórmulas e simulação Monte Carlo.
- Mapa de decisão da distribuição.
- Comparação teórica versus amostra.
- README com hipóteses e falhas.

### Sabatina
1. Qual é a diferença entre variável aleatória discreta e contínua?
2. O que a FDP representa?
3. O que a FDA representa?
4. Quando usar Bernoulli e quando usar Binomial?
5. Quando Poisson é adequada?
6. O que 1/p significa na Geométrica?
7. O que mu e sigma representam na Normal?
8. Como decidir se uma distribuição é adequada?
9. Como você aplicaria variáveis aleatórias e distribuições em um problema bancário real?
10. Qual erro mais comum ao usar variáveis aleatórias e distribuições?

## Semana 3 - Testes de hipótese, intervalos e decisão experimental
**Período:** 17/08 a 23/08/2026  
**Bloco:** BLOCO 1 - ESTATÍSTICA BÁSICA

### Objetivo
Transformar uma pergunta de negócio em H0/H1, escolher o teste, interpretar p-valor/intervalo e separar significância estatística de relevância prática.

### Ementa oficial
- □ Testes de hipóteses

### Conteúdo
- Parâmetro, estimador, erro padrão e distribuição amostral.
- Intervalo de confiança e margem de erro.
- H0, H1, alfa, estatística de teste e p-valor.
- Erros Tipo I/II, potência e tamanho amostral.
- Teste unilateral versus bilateral.
- Testes de média, proporção, pareado/independente e qui-quadrado.
- Pressupostos, alternativas não paramétricas, efeito e decisão de negócio.

### Materiais
- Livro 2: Cap. 7 e 8 (material principal).
- Luiza: p. 5-8.
- Douglas: Cap. 3 - Testes de hipótese.
- Livro 1: Cap. 10.4 como aplicação futura em comparação de modelos.

### Vídeos
- **StatQuest:** null hypothesis, p-value, t-tests, chi-square e power (https://statquest.org/video_index.html)
- **Google MLCC Exercises:** quizzes para interpretação (https://developers.google.com/machine-learning/crash-course/exercises)

### Projeto GitHub - `03-banking-ab-test-credit-policy`
**Projeto:** Experimento de política de crédito
**Objetivo:** Avaliar conversão e inadimplência de controle/tratamento.
**Entregas:**
- Plano experimental.
- Testes e intervalos.
- Tamanho de efeito e power.
- Análise por segmento.
- Decisão de negócio documentada.

### Sabatina
1. O que é H0?
2. O que o p-valor não significa?
3. O que é erro Tipo I?
4. O que é erro Tipo II?
5. Significância estatística garante relevância de negócio?
6. Quando usar teste pareado?
7. Por que testar pressupostos?
8. Como escolher tamanho de amostra?
9. Como você aplicaria testes de hipótese em um problema bancário real?
10. Qual erro mais comum ao usar testes de hipótese?

## Semana 4 - Matrizes, vetores, álgebra matricial, distâncias e produto interno
**Período:** 24/08 a 30/08/2026  
**Bloco:** BLOCO 2 - ÁLGEBRA

### Objetivo
Representar dados matematicamente e entender a geometria usada por regressão, KNN, SVM, clustering, PCA, embeddings e redes.

### Ementa oficial
- □ Matrizes e Vetores
- □ Álgebra Matricial
- □ Distâncias e produto interno

### Conteúdo
- Vetores, matrizes, dimensões, transposta e operações.
- Multiplicação matricial, identidade, inversa, posto e dependência linear.
- Produto interno, norma e similaridade de cosseno.
- Distâncias Euclidiana, Manhattan, Minkowski e Mahalanobis.
- Efeito de escala e correlação.
- Sistemas lineares e forma X beta = y.
- Projeção e interpretação geométrica.
- Boas práticas numéricas.

### Materiais
- Douglas: Cap. 1 - Álgebra (material principal).
- Livro 1: Cap. 2 e Cap. 4.
- Luiza: p. 12-16 como aplicação de distância.
- Livro 3: Cap. 7 para NumPy.

### Vídeos
- **3Blue1Brown:** Vectors - Essence of Linear Algebra (https://www.youtube.com/watch?v=fNk_zzaMoSs)
- **3Blue1Brown:** Linear transformations and matrices (https://www.youtube.com/watch?v=kYB8IZa5AuE)
- **StatQuest:** distâncias e similaridade (https://statquest.org/video_index.html)

### Projeto GitHub - `04-customer-similarity-linear-algebra`
**Projeto:** Motor de similaridade
**Objetivo:** Implementar distâncias, produto interno e ranking de clientes.
**Entregas:**
- Cálculos manuais e NumPy.
- Comparação com/sem escala.
- Cosseno e Mahalanobis.
- Testes unitários.
- README com geometria e limitações.

### Sabatina
1. Qual é a diferença entre matriz e vetor?
2. O que o produto interno indica?
3. Por que StandardScaler é importante para distância?
4. Qual é a diferença entre distância Euclidiana e Manhattan?
5. Quando a distância de Mahalanobis é útil?
6. Quando uma multiplicação de matrizes é possível?
7. Por que colunas linearmente dependentes são um problema?
8. Como produto interno aparece em embeddings?
9. Por que não calcular inversa explicitamente sempre?
10. Como você aplicaria álgebra linear para ciência de dados em um problema bancário real?

## Semana 5 - Missings, outliers e categorização
**Período:** 31/08 a 06/09/2026  
**Bloco:** BLOCO 3 - DATA PREP

### Objetivo
Tratar qualidade de dados sem apagar sinal útil, evitando leakage e documentando cada decisão.

### Ementa oficial
- □ Tratamento de missings
- □ Tratamento de outliers
- □ Categorização de variáveis contínuas e discretas

### Conteúdo
- Auditoria de schema, duplicatas, faixas e consistência.
- Mecanismos de missing e diagnóstico.
- Remoção, imputação simples/por grupo/modelos e flags.
- Outlier como erro, caso raro, fraude ou segmento.
- IQR, z-score robusto, winsorização e log.
- Binning por negócio/quantis.
- One-hot, ordinal, frequência e target encoding com cuidado.
- Pipeline ajustado apenas no treino.

### Materiais
- Luiza: p. 17-24.
- Livro 1: Cap. 3 - Pré-processamento.
- Douglas: Cap. 4 - Data Prep.
- Livro 3: Cap. 7.

### Vídeos
- **Hashtag Programação:** Data Cleaning e Feature Engineering (https://www.youtube.com/@HashtagProgramacao)
- **Google MLCC:** dados numéricos/categóricos e leakage (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `05-banking-data-quality-pipeline`
**Projeto:** Pipeline de qualidade
**Objetivo:** Tratar nulos, outliers e categóricas sem leakage.
**Entregas:**
- Relatório de qualidade.
- Pipeline/ColumnTransformer.
- Comparação de estratégias.
- Testes de schema.
- Data card.

### Sabatina
1. Por que imputar pela média pode ser ruim?
2. Quando criar uma flag de missing?
3. Todo outlier deve ser removido?
4. One-hot e ordinal encoding são intercambiáveis?
5. O que é data leakage no preprocessamento?
6. Por que usar Pipeline?
7. Quando winsorizar um outlier?
8. Qual o risco de target encoding?
9. Por que criar faixas de variável contínua?
10. Como avaliar o tratamento de dados?

## Semana 6 - Correlação, associação, PCA e seleção de variáveis
**Período:** 07/09 a 13/09/2026  
**Bloco:** BLOCO 3 - DATA PREP

### Objetivo
Reduzir redundância e dimensionalidade sem confundir correlação com causalidade nem selecionar usando o teste.

### Ementa oficial
- □ PCA
- □ Correlação / associação entre dados contínuos e entre dados discretos
- □ Seleção de variáveis

### Conteúdo
- Pearson e Spearman.
- Tabelas de contingência, qui-quadrado e V de Cramér.
- Multicolinearidade e variáveis derivadas.
- PCA: escala, componentes, variância explicada, loadings e scores.
- Limites de interpretabilidade do PCA.
- Seleção filter, wrapper e embedded.
- Mutual information, RFE, L1 e permutation importance.
- Seleção dentro da validação e estabilidade temporal.

### Materiais
- Luiza: p. 12-13 e p. 25-27.
- Livro 1: Cap. 3.7 e Cap. 10.
- Livro 2: Cap. 5.
- Douglas: Cap. 4 e 5.

### Vídeos
- **StatQuest:** correlation, PCA e feature selection (https://statquest.org/video_index.html)
- **Google MLCC:** generalização e dados (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `06-feature-engineering-pca-selection`
**Projeto:** Seleção e PCA
**Objetivo:** Comparar associação, PCA e métodos de seleção.
**Entregas:**
- Mapa de associação.
- PCA e loadings.
- Filter/wrapper/embedded.
- Pipeline com CV.
- Estabilidade temporal.

### Sabatina
1. Pearson e Spearman medem a mesma coisa?
2. Como medir associação entre categóricas?
3. O que o PCA otimiza?
4. PCA seleciona variáveis?
5. Qual a limitação central do PCA?
6. Como selecionar variáveis sem vazar informação?
7. O que é loading no PCA?
8. PCA é seleção de variáveis?
9. Qual a diferença entre filter, wrapper e embedded?
10. Como provar estabilidade de features?

## Semana 7 - Python, leitura/escrita, sklearn e engenharia mínima de projeto
**Período:** 14/09 a 20/09/2026  
**Bloco:** BLOCO 4 - PROGRAMAÇÃO

### Objetivo
Consolidar a programação praticada desde a primeira semana e transformar notebooks em código testável e reproduzível.

### Ementa oficial
- □ Fluência na sintaxe básica
- □ Métodos e pacotes para leitura e escrita de dados
- □ Fluência nos principais pacotes de machine learning, como: Python: sklearn; R: caret, mlr

### Conteúdo
- Ambiente: Anaconda/Jupyter, venv, terminal e instalação de pacotes.
- Tipos, operadores, strings, listas, tuplas, conjuntos e dicionários.
- Condições, laços, comprehensions, funções, parâmetros, retorno e escopo.
- Tratamento de erros, módulos, leitura/escrita de CSV e JSON.
- NumPy básico, pandas básico e primeiro contato com sklearn.
- Git: init, add, commit, branch, merge, README, .gitignore e publicação no GitHub.
- pytest, organização em src/ e dependências.
- Issues, branches, pull requests e releases.

### Materiais
- Livro 3: Cap. 1-8 (material principal).
- Luiza: p. 17-18 e p. 28-31 como exemplos.
- Douglas: Cap. 15 como checklist.
- Documentação do sklearn.

### Vídeos
- **Curso em Vídeo:** Python Mundo 1 (https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6)
- **Hashtag Programação:** Python, pandas e ciência de dados (https://www.youtube.com/@HashtagProgramacao)

### Projeto GitHub - `07-banking-data-toolkit`
**Projeto:** Pacote Python
**Objetivo:** Transformar notebooks em biblioteca reutilizável.
**Entregas:**
- Pacote src/.
- CLI simples.
- pytest.
- requirements/pyproject.
- Release v1.0 e documentação.

### Sabatina
1. Por que funções são importantes em um projeto de dados?
2. Qual é a diferença entre lista, tupla, conjunto e dicionário?
3. Quando usar try/except?
4. Qual é a diferença entre NumPy e pandas?
5. Por que usar .gitignore?
6. O que torna um experimento reproduzível?
7. O que sklearn oferece?
8. Como você investigaria um CSV que falhou ao carregar?
9. Como você aplicaria programação Python para ciência de dados em um problema bancário real?
10. Qual erro mais comum ao usar programação Python para ciência de dados?

## Semana 8 - Modelo relacional, SQL, álgebra relacional e chaves
**Período:** 21/09 a 27/09/2026  
**Bloco:** BLOCO 5 - BANCO DE DADOS

### Objetivo
Entender como os dados nascem em sistemas transacionais e montar, com SQL, uma tabela analítica sem duplicar clientes nem introduzir vazamento.

### Ementa oficial
- □ Modelo de banco de dados relacional
- □ Sintaxe de SQL
- □ Álgebra relacional: join, group by, order by e etc.
- □ Chaves primárias, secundárias e estrangeiras

### Conteúdo
- Entidade, tabela, linha, coluna, cardinalidade e normalização básica.
- Chave primária, estrangeira, composta, candidata e índice secundário.
- SELECT, WHERE, CASE WHEN, funções de data e tratamento de NULL.
- JOINs e cardinalidade: 1:1, 1:N e N:N.
- GROUP BY, HAVING, ORDER BY, subqueries, CTEs e funções de janela.
- Construção de uma tabela cliente-mês e auditoria da granularidade.
- CTEs, funções de janela e performance básica.
- Features temporais sem vazamento.

### Materiais
- Hashtag Programação: curso de SQL.
- Livro 3: sqlite3/pandas.read_sql como integração.
- Douglas: Cap. 15.
- Ementa oficial como checklist literal.

### Vídeos
- **Hashtag Programação:** curso de SQL e banco relacional (https://www.youtube.com/@HashtagProgramacao)
- **freeCodeCamp:** buscar SQL full course (https://www.youtube.com/@freecodecamp)

### Projeto GitHub - `08-banking-sql-feature-mart`
**Projeto:** Data mart SQL
**Objetivo:** Criar uma linha por cliente/data com features temporais.
**Entregas:**
- DDL e chaves.
- CTEs/joins/janelas.
- Testes de cardinalidade.
- ERD.
- Python para validação.

### Sabatina
1. O que é uma chave primária?
2. O que é uma chave estrangeira?
3. Por que um JOIN pode multiplicar linhas?
4. Qual é a diferença entre WHERE e HAVING?
5. Quando usar LEFT JOIN?
6. O que é granularidade?
7. Como SQL entra no trabalho de cientista de dados?
8. O que é vazamento temporal em uma query?
9. Como você aplicaria SQL e banco relacional em um problema bancário real?
10. Qual erro mais comum ao usar SQL e banco relacional?

## Semana 9 - Regressão linear, resíduos, métricas e validação
**Período:** 28/09 a 04/10/2026  
**Bloco:** BLOCO 6 - REGRESSÃO + AVALIAÇÃO

### Objetivo
Entender o modelo linear, avaliar erro fora da amostra e diagnosticar violações por resíduos.

### Ementa oficial
- □ Regressão Linear
- □ Análise de Resíduos
- □ Métricas de avaliação de modelo: KS, Gini, AUC, RMSE, MAE, F1, Recall, Precision, R2
- □ Validações holdout, leave one out, k-fold, out of sample, out of time

### Conteúdo
- Modelo linear e interpretação de coeficientes.
- Mínimos quadrados, MSE e gradiente.
- Resíduo versus erro.
- Linearidade, independência, homocedasticidade e multicolinearidade.
- MAE, RMSE e R2.
- Holdout, k-fold, LOOCV, out-of-sample e out-of-time.
- Baseline, extrapolação e estabilidade temporal.

### Materiais
- Livro 2: Cap. 9.
- Livro 3: Cap. 9-10.
- Luiza: p. 28-39 e p. 45-48.
- Douglas: Cap. 8-9; Livro 1: Cap. 10.

### Vídeos
- **Google MLCC:** regressão linear, loss e gradiente (https://developers.google.com/machine-learning/crash-course?hl=pt-br)
- **StatQuest:** linear regression, residuals e R-squared (https://statquest.org/video_index.html)

### Projeto GitHub - `09-credit-limit-regression`
**Projeto:** Regressão de gasto/limite
**Objetivo:** Prever alvo contínuo e diagnosticar resíduos.
**Entregas:**
- Baseline.
- Regressão linear.
- Resíduos e segmentos.
- MAE/RMSE/R2 em out-of-time.
- Model card.

### Sabatina
1. O que um coeficiente representa?
2. O que é um resíduo?
3. O que é heterocedasticidade?
4. MAE ou RMSE?
5. R2 alto garante modelo bom?
6. Por que RMSE pune erros grandes?
7. Como detectar overfitting?
8. O que significa R2 negativo no teste?
9. Quando usar out-of-time?
10. Por que normalidade dos resíduos não é requisito absoluto de previsão?

## Semana 10 - Regularização, árvore de regressão e GLM
**Período:** 05/10 a 11/10/2026  
**Bloco:** BLOCO 6 - REGRESSÃO + AVALIAÇÃO

### Objetivo
Comparar modelos lineares regularizados, árvores e GLMs usando o mesmo protocolo de validação.

### Ementa oficial
- □ Regularização L1 e L2
- □ Árvore de Regressão
- □ Modelos lineares generalizados (GLM)

### Conteúdo
- Ridge/L2, Lasso/L1 e Elastic Net.
- Padronização e regularização.
- Árvore de regressão, critérios e poda.
- GLM: família, preditor e link.
- Gaussian/identity, Poisson/log e Binomial/logit.
- Overdispersion.
- Tunagem e viés-variância.
- Comparação no mesmo split e baseline.

### Materiais
- Luiza: p. 49-52 e p. 66-71.
- Livro 3: Cap. 11-12 e 15.
- Livro 1: Cap. 6 e 10.
- Douglas: Cap. 8-9.

### Vídeos
- **StatQuest:** Ridge, Lasso, regression trees e GLM (https://statquest.org/video_index.html)
- **Google MLCC:** overfitting e validação (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `10-loss-severity-model-benchmark`
**Projeto:** Benchmark de regressão
**Objetivo:** Comparar Ridge/Lasso, árvore e GLM.
**Entregas:**
- Pipeline e tunagem.
- Mesmos splits.
- Tabela de métricas.
- Interpretação/importance.
- Recomendação champion/challenger.

### Sabatina
1. Ridge e Lasso resolvem o mesmo problema?
2. O que é GLM?
3. Quando árvore supera linear?
4. Como uma árvore escolhe split?
5. Por que árvore única overfita?
6. Qual a diferença prática entre L1 e L2?
7. O que define um GLM?
8. Quando usar GLM Poisson?
9. Como uma árvore de regressão prevê?
10. Modelo mais preciso sempre é melhor?

## Semana 11 - Regressão logística e Naive Bayes
**Período:** 12/10 a 18/10/2026  
**Bloco:** BLOCO 7 - CLASSIFICAÇÃO + AVALIAÇÃO

### Objetivo
Produzir probabilidades de classe, interpretar threshold/odds e entender um classificador Bayesiano como baseline probabilístico.

### Ementa oficial
- □ Regressão Logística
- □ Naive Bayes (Gaussiano x Bernoulli)
- □ Métricas de avaliação de modelo: KS, Gini, AUC, RMSE, MAE, F1, Recall, Precision, R2
- □ Validações holdout, leave one out, k-fold, out of sample, out of time

### Conteúdo
- Classificação binária, probabilidade e score.
- Sigmoide, logit, odds e interpretação dos coeficientes.
- Log Loss e máxima verossimilhança.
- Regularização e calibração.
- Threshold, Precision/Recall e matriz de custo.
- Teorema de Bayes aplicado a classe/features.
- Hipótese de independência condicional.
- GaussianNB versus BernoulliNB e quando cada um faz sentido.
- Métricas, threshold e validação apropriada ao cenário.

### Materiais
- Luiza: p. 53-61.
- Livro 1: Cap. 5.
- Livro 3: Cap. 13.
- Douglas: Cap. 6-7; Livro 2 para Bayes.

### Vídeos
- **Google MLCC:** logística, threshold, matriz de confusão e AUC (https://developers.google.com/machine-learning/crash-course?hl=pt-br)
- **StatQuest:** logística e Naive Bayes (https://statquest.org/video_index.html)

### Projeto GitHub - `11-default-propensity-probabilistic-models`
**Projeto:** Probabilidade de inadimplência
**Objetivo:** Comparar logística e Naive Bayes e escolher threshold.
**Entregas:**
- Logística e NB.
- ROC/PR, KS/Gini.
- Calibração.
- Matriz de custo.
- Out-of-time.

### Sabatina
1. Por que regressão logística é classificação?
2. O que a sigmoide faz?
3. O que é odds?
4. Por que usar Log Loss?
5. O que muda ao reduzir threshold?
6. Qual é a hipótese naive?
7. GaussianNB e BernoulliNB diferem como?
8. Probabilidade prevista é automaticamente calibrada?
9. Como você aplicaria classificadores probabilísticos em um problema bancário real?
10. Qual erro mais comum ao usar classificadores probabilísticos?

## Semana 12 - KNN e SVM
**Período:** 19/10 a 25/10/2026  
**Bloco:** BLOCO 7 - CLASSIFICAÇÃO + AVALIAÇÃO

### Objetivo
Entender como geometria, escala, K, margem e kernel determinam as previsões e o custo computacional.

### Ementa oficial
- □ KNN
- □ SVM

### Conteúdo
- KNN como aprendizado baseado em instâncias/lazy learner.
- Distância, escala, escolha de K, pesos e maldição da dimensionalidade.
- Fronteira de decisão e custo de predição.
- SVM linear, hiperplano, margem e vetores de suporte.
- Margem rígida/suave e parâmetro C.
- Kernel trick, RBF e gamma.
- Pipeline de escala + CV + tunagem.
- Comparação de desempenho, latência e explicabilidade.
- Métricas, threshold e validação apropriada ao cenário.

### Materiais
- Luiza: p. 62-65 e p. 72-75.
- Livro 1: Cap. 4 e 8.
- Livro 3: Cap. 14 e 16.
- Douglas: Cap. 6-7.

### Vídeos
- **StatQuest:** KNN, SVM, kernels, C e gamma (https://statquest.org/video_index.html)
- **Google MLCC:** classificação e escala (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `12-fraud-knn-svm-benchmark`
**Projeto:** KNN versus SVM
**Objetivo:** Comparar distância, margem e latência em fraude.
**Entregas:**
- Pipeline com escala.
- Busca K/C/gamma.
- ROC/PR e threshold.
- Tempo de treino/inferência.
- Análise de dimensionalidade.

### Sabatina
1. Por que KNN precisa de escala?
2. K pequeno e K grande causam o quê?
3. Por que KNN é lazy learner?
4. O que o SVM maximiza?
5. O que são vetores de suporte?
6. O que C controla?
7. O que gamma controla no RBF?
8. Quando evitar KNN/SVM?
9. Como você aplicaria KNN e SVM em um problema bancário real?
10. Qual erro mais comum ao usar KNN e SVM?

## Semana 13 - Árvore de classificação, Random Forest, Boosting e ensembles
**Período:** 26/10 a 01/11/2026  
**Bloco:** BLOCO 7 - CLASSIFICAÇÃO + AVALIAÇÃO

### Objetivo
Explicar como árvores dividem o espaço, controlar sua complexidade e comparar bagging/boosting em dados tabulares.

### Ementa oficial
- □ Árvore de classificação
- □ Random Forest
- □ Estratégias de Boosting: Gradient Boosting, ADA Boosting, etc.
- □ ensemble modelling

### Conteúdo
- Árvore, nó, folha, profundidade e regra de divisão.
- Gini, entropia e ganho; árvore de regressão como revisão.
- Overfitting, pré/pós-poda e hiperparâmetros.
- Bagging, amostras bootstrap e subamostragem de features.
- Random Forest e redução de variância.
- AdaBoost e foco em erros.
- Gradient Boosting, learning rate, estimadores e árvores rasas.
- Importância por impureza versus permutation importance e limites.
- Métricas, threshold e validação apropriada ao cenário.

### Materiais
- Luiza: p. 66-81.
- Livro 1: Cap. 6 e 9.
- Livro 3: Cap. 12.
- Douglas: Cap. 6-7.

### Vídeos
- **StatQuest:** árvores, Random Forest, AdaBoost e Gradient Boosting (https://statquest.org/video_index.html)
- **Google ML:** Decision Forests (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `13-credit-risk-ensemble-challenge`
**Projeto:** Desafio de ensembles
**Objetivo:** Comparar árvore, Random Forest e Boosting.
**Entregas:**
- Baseline árvore.
- RF/Boosting tunados.
- Permutation importance.
- Validação temporal.
- Relatório de champion/challenger.

### Sabatina
1. Como uma árvore escolhe split?
2. Por que árvore única overfita?
3. O que bagging faz?
4. Por que Random Forest descorrelaciona árvores?
5. O que distingue boosting?
6. Learning rate baixo sempre é melhor?
7. Feature importance prova causalidade?
8. Qual modelo você escolheria para sabatina?
9. Como você aplicaria árvores e ensembles em um problema bancário real?
10. Qual erro mais comum ao usar árvores e ensembles?

## Semana 14 - Redes neurais, deep learning e avaliação
**Período:** 02/11 a 08/11/2026  
**Bloco:** BLOCO 7 - CLASSIFICAÇÃO + AVALIAÇÃO

### Objetivo
Entender o funcionamento de uma rede neural, treinar uma MLP e comparar com modelos tabulares fortes.

### Ementa oficial
- □ Redes Neurais
- □ deep learning e tensor flow

### Conteúdo
- Neurônio, pesos, bias e ativação.
- Camadas e forward pass.
- Função custo e backpropagation.
- Learning rate, batch e épocas.
- ReLU, sigmoid e softmax.
- Dropout, weight decay e early stopping.
- Padronização e estabilidade.
- TensorFlow/Keras e comparação com ensembles.
- Métricas, calibração e validação temporal.

### Materiais
- Livro 1: Cap. 7.
- Douglas: Cap. 6, 7 e 14.
- Luiza: p. 97-109 apenas como revisão.
- Google ML Crash Course: Neural Networks.

### Vídeos
- **Google MLCC:** Neural Networks (https://developers.google.com/machine-learning/crash-course?hl=pt-br)
- **StatQuest:** neural networks e backpropagation (https://statquest.org/video_index.html)
- **3Blue1Brown:** Neural Networks playlist (https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)

### Projeto GitHub - `14-neural-network-risk-classifier`
**Projeto:** Rede neural tabular
**Objetivo:** Treinar MLP e comparar com ensemble.
**Entregas:**
- MLP/TensorFlow.
- Curvas treino/validação.
- Early stopping.
- Métricas/calibração.
- Discussão quando a rede não vale.

### Sabatina
1. O que um neurônio calcula?
2. Por que usar função de ativação?
3. O que é backpropagation?
4. O que learning rate controla?
5. O que é epoch e batch?
6. Quando evitar deep learning?
7. Como detectar overfitting em rede?
8. O que dropout faz?
9. Por que calibrar uma rede de risco?
10. Quando uma árvore pode superar uma rede em tabular?

## Semana 15 - K-means, K-medoids e escolha do número de clusters
**Período:** 09/11 a 15/11/2026  
**Bloco:** BLOCO 8 - AGRUPAMENTO + AVALIAÇÃO

### Objetivo
Criar segmentos interpretáveis, justificar K e mostrar que clustering é uma hipótese analítica, não uma verdade automática.

### Ementa oficial
- □ K-means / K-medoids
- □ Estratégias de definição do número de cluster (joelho/elbow, silhueta, distância, intra-cluster, etc.)

### Conteúdo
- Objetivo de clustering e diferença para classificação.
- Preparação: seleção, escala, outliers e distância.
- K-means, centróide, função objetivo e inicialização.
- K-medoids e robustez.
- Inércia/intra-cluster e método do cotovelo.
- Silhueta, estabilidade e validação de negócio.
- Perfil dos clusters e ação possível.
- Limitações: forma esférica, K fixo e sensibilidade.

### Materiais
- Luiza: p. 82-85.
- Livro 1: Cap. 12-13 e 15.
- Douglas: Cap. 10-11.

### Vídeos
- **StatQuest:** K-means, elbow e silhouette (https://statquest.org/video_index.html)
- **Google ML:** Clustering (https://developers.google.com/machine-learning/clustering)

### Projeto GitHub - `15-customer-segmentation-kmeans`
**Projeto:** Segmentação acionável
**Objetivo:** Criar clusters com ações de negócio.
**Entregas:**
- Features/escala.
- K-means/K-medoids.
- Elbow/silhouette.
- Perfis e estabilidade.
- Playbook por cluster.

### Sabatina
1. Qual é a diferença entre cluster e classe?
2. O que K-means minimiza?
3. Por que escala é crucial?
4. K-means e K-medoids diferem como?
5. O que o elbow procura?
6. O que silhueta mede?
7. Silhueta alta garante valor de negócio?
8. Como validar clusters sem target?
9. Como você aplicaria K-means e avaliação de clusters em um problema bancário real?
10. Qual erro mais comum ao usar K-means e avaliação de clusters?

## Semana 16 - DBSCAN, hierárquico, GMM e detecção de anomalia
**Período:** 16/11 a 22/11/2026  
**Bloco:** BLOCO 8 - AGRUPAMENTO + AVALIAÇÃO

### Objetivo
Comparar agrupamento por densidade, hierarquia e mistura probabilística e transformar ruído/anomalia em investigação, não em remoção automática.

### Ementa oficial
- □ DBSCAN
- □ Algoritmos Hierárquicos
- □ Gaussian Mixture Models (GMM)
- □ detecção de anomalia
- □ Estratégias de definição do número de cluster (joelho/elbow, silhueta, distância, intra-cluster, etc.)

### Conteúdo
- DBSCAN: eps, MinPts, core, border e noise.
- Variação de densidade, distância e escala.
- Hierárquico aglomerativo, linkage e dendrograma.
- GMM, gaussianas, covariância e soft clustering.
- Algoritmo EM em nível intuitivo.
- Detecção de anomalia: z/IQR, densidade, Isolation Forest e contexto.
- Comparação de algoritmos por formato, ruído e objetivo.
- Avaliação e análise dos casos extremos.
- AIC/BIC e estabilidade dos clusters.

### Materiais
- Luiza: p. 86-96.
- Livro 1: Cap. 13 e 15.
- Douglas: Cap. 10-11.
- Livro 2: Normal como apoio ao GMM.

### Vídeos
- **StatQuest:** DBSCAN, hierarchical clustering, GMM e EM (https://statquest.org/video_index.html)
- **Google ML:** Clustering (https://developers.google.com/machine-learning/clustering)

### Projeto GitHub - `16-behavior-clustering-anomaly-lab`
**Projeto:** Clustering e anomalias
**Objetivo:** Comparar DBSCAN, hierárquico e GMM.
**Entregas:**
- k-distance/dendrograma.
- Hard/soft clustering.
- AIC/BIC.
- Ranking de anomalias.
- Validação amostral.

### Sabatina
1. O que é ponto core no DBSCAN?
2. O que eps controla?
3. Qual limitação do DBSCAN?
4. O que linkage define?
5. O que significa cortar dendrograma?
6. K-means e GMM diferem como?
7. O que o EM faz?
8. Anomalia é sinônimo de fraude?
9. Como você aplicaria DBSCAN, hierárquico, GMM e anomalias em um problema bancário real?
10. Qual erro mais comum ao usar DBSCAN, hierárquico, GMM e anomalias?

## Semana 17 - PLN, text mining, embeddings, Transformer e fundamentos de IA Generativa
**Período:** 23/11 a 29/11/2026  
**Bloco:** BLOCO 9 - IA GENERATIVA

### Objetivo
Entender a passagem de texto bruto para representações vetoriais e modelos Transformer.

### Ementa oficial
- □ Conceitos fundamentais de IA Generativa
- □ Conceitos fundamentais de NLP
- □ Arquitetura transformer
- □ Embeddings
- □ text mining

### Conteúdo
- Pipeline de PLN, tokenização e vocabulário.
- Text mining, frequência, TF-IDF e classificação.
- Embeddings e similaridade.
- Limites e vieses dos embeddings.
- Transformer, self-attention e posição.
- Tokens, contexto e pretraining.
- Modelo de linguagem e próximo token.
- Discriminativo versus generativo.

### Materiais
- Livro 1: Cap. 19 e Cap. 7.7.
- Douglas: Cap. 12.
- Luiza: p. 97-109 como glossário.
- Hugging Face Course.

### Vídeos
- **Hugging Face:** curso de Transformers e NLP (https://huggingface.co/learn/llm-course)
- **StatQuest:** embeddings, attention e transformers (https://statquest.org/video_index.html)

### Projeto GitHub - `17-banking-complaints-embeddings`
**Projeto:** Reclamações e embeddings
**Objetivo:** Classificar textos e criar busca semântica.
**Entregas:**
- Baseline TF-IDF.
- Embeddings/cosseno.
- Classificador.
- Avaliação retrieval@k.
- Privacidade e vieses.

### Sabatina
1. O que é text mining?
2. O que tokenização faz?
3. O que TF-IDF representa?
4. Por que não remover toda stopword automaticamente?
5. O que é embedding?
6. Por que usar cosseno?
7. Embeddings iguais significam textos equivalentes?
8. Como avaliar classificador de reclamações?
9. O que atenção faz?
10. Por que Transformer precisa de posição?

## Semana 18 - In Context Learning, Prompt, RAG, fine-tuning, quantization, RLHF e guardrails
**Período:** 30/11 a 06/12/2026  
**Bloco:** BLOCO 9 - IA GENERATIVA

### Objetivo
Construir e avaliar uma aplicação fundamentada em documentos e distinguir prompt, RAG e fine-tuning.

### Ementa oficial
- □ In Context Learning
- □ RAGs e bancos de dados vetoriais
- □ Técnicas de Engenharia de Prompt
- □ Técnicas de treinamento e fine tuning
- □ Quantization
- □ RLHF
- □ Safeguards e Guardrails

### Conteúdo
- Zero/one/few-shot.
- Prompt: objetivo, contexto, restrições, exemplos e formato.
- RAG: ingestão, chunking, embeddings, índice, retrieval e geração.
- Banco vetorial e filtros.
- Groundedness, relevância e citações.
- Fine-tuning e PEFT/LoRA.
- Quantization e trade-off.
- RLHF e alinhamento.
- Guardrails, prompt injection e PII.
- Avaliação offline e red teaming.

### Materiais
- Douglas: Cap. 12.
- Hugging Face Course.
- Google ML Crash Course: LLMs/embeddings/responsible AI.
- Luiza: p. 97-109 como revisão.

### Vídeos
- **Hugging Face:** fine-tuning e ecossistema Transformers (https://huggingface.co/learn/llm-course)
- **Google MLCC:** LLMs, embeddings e responsible AI (https://developers.google.com/machine-learning/crash-course?hl=pt-br)

### Projeto GitHub - `18-bank-policy-rag-assistant`
**Projeto:** Assistente RAG
**Objetivo:** Responder políticas com citação e recusa.
**Entregas:**
- Ingestão/chunking.
- Índice vetorial.
- Prompt e fontes.
- Avaliação de retrieval/groundedness.
- Testes de prompt injection.

### Sabatina
1. O que é In Context Learning?
2. O que RAG acrescenta?
3. O que é chunking?
4. Banco vetorial substitui banco relacional?
5. Como avaliar RAG?
6. Quando fine-tuning faz sentido?
7. RAG ou fine-tuning para documentos novos?
8. O que quantization faz?
9. O que é RLHF?
10. O que é prompt injection?

## Semana 19 - Programação linear, inteira, Branch-and-Bound, GAP e solvers
**Período:** 07/12 a 13/12/2026  
**Bloco:** BLOCO 10 - PESQUISA OPERACIONAL, PROGRAMAÇÃO INTEIRA E MIP

### Objetivo
Modelar decisões ótimas e interpretar viabilidade, bounds e qualidade da solução.

### Ementa oficial
- □ Programação linear
- □ Modelos de programação linear: mix de produção, mistura, transporte
- □ Solução em programação linear: gráfica e simplex
- □ Variáveis inteiras e binárias, otimização discreta
- □ Relaxação linear
- □ Arredondamento
- □ Método Branch-and-bound
- □ O que é
- □ GAP e Best Bound
- □ Solvers

### Conteúdo
- Variáveis de decisão, objetivo e restrições.
- Mix, mistura e transporte.
- Região viável, solução gráfica e simplex.
- Inteiras e binárias.
- Relaxação linear e arredondamento.
- Branch-and-Bound.
- MIP, incumbent, Best Bound e GAP.
- Solvers e OR-Tools.

### Materiais
- Douglas: Cap. 13 - Pesquisa Operacional.
- Google OR-Tools: LP/MIP/CP-SAT.
- Ementa oficial como checklist literal.

### Vídeos
- **Google OR-Tools:** programação linear e exemplos Python (https://developers.google.com/optimization)
- **Google OR-Tools MIP:** inteiras, binárias, solvers e GAP (https://developers.google.com/optimization/mip)

### Projeto GitHub - `19-credit-budget-optimization`
**Projeto:** Otimização de orçamento
**Objetivo:** LP e MIP de alocação sob risco e capacidade.
**Entregas:**
- Formulação matemática.
- LP contínuo.
- Versão binária.
- Relaxação/GAP.
- Sensibilidade e relatório.

### Sabatina
1. O que é função objetivo?
2. O que é região viável?
3. Quando variável precisa ser binária?
4. O que é relaxação linear?
5. Por que arredondar pode falhar?
6. O que branch-and-bound faz?
7. O que GAP informa?
8. O que é incumbent?
9. O que é Best Bound?
10. Como escolher um solver?

## Semana 20 - Big Data, Spark/PySpark, Hadoop/Hive, grafos e séries temporais
**Período:** 14/12 a 20/12/2026  
**Bloco:** BLOCO 11 - OUTROS

### Objetivo
Conhecer processamento distribuído, relações em rede e validação temporal, implementando protótipos locais.

### Ementa oficial
- □ hadoop e hive
- □ spark e pyspark
- □ redes complexas e teoria de grafos
- □ análise de séries temporais

### Conteúdo
- Hadoop/HDFS, MapReduce e Hive.
- Spark: driver, executors, partitions, lazy evaluation.
- PySpark DataFrame, joins, groupBy e windows.
- Shuffle, cache e skew.
- Grafos: nós, arestas, grau, componentes e centralidade.
- Séries: tendência, sazonalidade, autocorrelação e lags.
- Split temporal e walk-forward.
- Métricas e drift.

### Materiais
- Douglas: Cap. 15.
- Livro 1: Cap. 16-17.
- Documentação oficial PySpark.
- Luiza: p. 97-109 como revisão.

### Vídeos
- **Apache PySpark:** documentação e exemplos (https://spark.apache.org/docs/latest/api/python/)
- **freeCodeCamp:** buscar PySpark e time series (https://www.youtube.com/@freecodecamp)
- **StatQuest:** time series basics (https://statquest.org/video_index.html)

### Projeto GitHub - `20-distributed-fraud-network-forecast`
**Projeto:** Spark, grafo e série
**Objetivo:** ETL distribuído, rede de fraude e previsão temporal.
**Entregas:**
- PySpark ETL.
- Análise de shuffle.
- Grafo cliente-dispositivo.
- Lags/backtesting.
- README de arquitetura.

### Sabatina
1. O que Hadoop resolve?
2. O que Hive oferece?
3. Por que Spark pode ser rápido?
4. O que é partition?
5. O que é lazy evaluation?
6. O que é shuffle?
7. PySpark substitui SQL?
8. Quando Spark é exagero?
9. Por que não embaralhar série temporal?
10. O que é tendência?

## Semana 21 - Ensembles, anomalias, text mining, deep learning, imagens e fala
**Período:** 21/12 a 27/12/2026  
**Bloco:** BLOCO 11 - OUTROS

### Objetivo
Consolidar os itens transversais e aplicar visão multimodal com avaliação e governança.

### Ementa oficial
- □ ensemble modelling
- □ detecção de anomalia
- □ text mining
- □ deep learning e tensor flow
- □ reconhecimento de imagens
- □ speech analytics

### Conteúdo
- Revisão de ensembles.
- Detecção de anomalia supervisionada/não supervisionada.
- Text mining e embeddings.
- Deep learning/TensorFlow.
- CNN, transfer learning e visão.
- OCR e reconhecimento de documentos.
- ASR, transcrição e speech analytics.
- Avaliação por modalidade.
- Viés, privacidade e human-in-the-loop.

### Materiais
- Livro 1: Cap. 7, 9, 18 e 19.
- Douglas: Cap. 14-15.
- Google ML Crash Course.
- Luiza: p. 97-109 como glossário.

### Vídeos
- **Google MLCC:** redes, embeddings e responsible AI (https://developers.google.com/machine-learning/crash-course?hl=pt-br)
- **StatQuest:** CNNs, ensembles e anomaly detection (https://statquest.org/video_index.html)
- **freeCodeCamp:** buscar computer vision e speech recognition (https://www.youtube.com/@freecodecamp)

### Projeto GitHub - `21-multimodal-banking-triage`
**Projeto:** Triagem multimodal
**Objetivo:** Combinar texto, imagem e áudio/transcrição.
**Entregas:**
- Pipeline textual.
- Protótipo de imagem.
- Protótipo de fala.
- Ensemble de scores.
- Riscos e avaliação por modalidade.

### Sabatina
1. O que um neurônio calcula?
2. Por que usar função de ativação?
3. O que é backpropagation?
4. O que learning rate controla?
5. O que é epoch e batch?
6. Por que CNN funciona em imagem?
7. O que é speech analytics?
8. Quando evitar deep learning?
9. O que bagging faz?
10. Por que Random Forest descorrelaciona árvores?

## Semana 22 - Capstone integrado, simulado prático e sabatina final
**Período:** 28/12 a 31/12/2026  
**Bloco:** BLOCO 12 - CONSOLIDAÇÃO

### Objetivo
Entregar um projeto ponta a ponta defensável, realizar simulado prático cronometrado e responder oralmente cada bloco da ementa.

### Ementa oficial
- Nenhum item novo.

### Conteúdo
- Escolher problema bancário único e formular decisão/target.
- Montar dados em SQL e pipeline de qualidade.
- EDA, baseline, modelo e validação temporal/estratificada.
- Métricas e threshold/custo.
- Explicabilidade, erro por segmento, limitações e ética.
- Componente extra: clustering, otimização ou RAG.
- Empacotamento, testes, README, arquitetura e demo.
- Simulado de até 4 horas e sabatina gravada.

### Materiais
- Ementa oficial completa.
- Douglas: todos os capítulos como banco de sabatina.
- Luiza: p. 97-109.
- Livros 1, 2 e 3 somente para lacunas dos simulados.

### Vídeos
- **Google MLCC Exercises:** exercícios de regressão, classificação, dados e redes (https://developers.google.com/machine-learning/crash-course/exercises)
- **StatQuest:** revisar apenas itens amarelos/vermelhos (https://statquest.org/video_index.html)

### Projeto GitHub - `22-banking-decision-platform-capstone`
**Projeto:** Capstone end-to-end
**Objetivo:** SQL, Data Prep, modelo, avaliação e apresentação.
**Entregas:**
- Banco e features.
- Pacote Python/testes.
- Modelos comparados.
- Relatório e apresentação.
- Release reproduzível.

### Sabatina
1. Como você começou o projeto?
2. Como garantiu ausência de leakage?
3. Por que escolheu esse modelo?
4. Qual é o maior risco do projeto?
5. Como o modelo seria monitorado?
6. O que faria com mais tempo?
7. Como reproduzir o repositório?
8. O que você aprendeu que mudaria em um próximo projeto?
9. Como você aplicaria capstone end-to-end em um problema bancário real?
10. Qual erro mais comum ao usar capstone end-to-end?

# Dicionário completo de respostas

## Semana 1 - Propriedades das distribuições e análise exploratória

### 1. Quando a mediana é mais informativa que a média?
Quando há assimetria ou valores extremos que puxam a média.

### 2. O que a variância mede?
O espalhamento quadrático em torno da média; quanto maior, maior a dispersão.

### 3. Por que o desvio padrão é mais interpretável que a variância?
Volta à unidade original da variável.

### 4. O que os quartis representam?
Pontos que dividem os dados ordenados em quatro partes; Q2 é a mediana.

### 5. O que o IQR mede?
A amplitude do miolo central de 50% dos dados: Q3 - Q1.

### 6. Moda serve apenas para variável categórica?
Não; pode existir em numéricas, mas é especialmente útil em categorias e distribuições multimodais.

### 7. Correlação é parte da EDA?
Sim, mas deve ser acompanhada de gráfico, contexto e análise de não linearidade/segmentos.

### 8. O que diferencia uma EDA boa de uma lista de gráficos?
Perguntas orientadas ao negócio, validação da qualidade e interpretação conectada a decisões.

### 9. Como você aplicaria propriedades de distribuições e EDA em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria propriedades de distribuições e EDA com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar propriedades de distribuições e EDA?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 2 - Variáveis aleatórias, FDP/FDA e distribuições da ementa

### 1. Qual é a diferença entre variável aleatória discreta e contínua?
Discreta assume valores contáveis; contínua pode assumir qualquer valor em intervalos.

### 2. O que a FDP representa?
Densidade; probabilidades são áreas em intervalos, não a altura isolada.

### 3. O que a FDA representa?
Probabilidade acumulada até x: P(X <= x); é não decrescente e vai de 0 a 1.

### 4. Quando usar Bernoulli e quando usar Binomial?
Bernoulli para uma tentativa binária; Binomial para número de sucessos em n tentativas independentes com p constante.

### 5. Quando Poisson é adequada?
Para contagens em uma exposição/intervalo com taxa aproximadamente estável e eventos independentes.

### 6. O que 1/p significa na Geométrica?
Número esperado de tentativas até o primeiro sucesso, conforme a convenção adotada.

### 7. O que mu e sigma representam na Normal?
Mu é centro/média; sigma é desvio padrão e controla espalhamento.

### 8. Como decidir se uma distribuição é adequada?
Mecanismo gerador, suporte, parâmetros, gráficos/quantis, frequências e diagnóstico de ajuste.

### 9. Como você aplicaria variáveis aleatórias e distribuições em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria variáveis aleatórias e distribuições com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar variáveis aleatórias e distribuições?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 3 - Testes de hipótese, intervalos e decisão experimental

### 1. O que é H0?
Hipótese de referência, normalmente ausência de diferença/efeito, avaliada contra os dados.

### 2. O que o p-valor não significa?
Não é a probabilidade de H0 ser verdadeira nem o tamanho do efeito.

### 3. O que é erro Tipo I?
Rejeitar H0 quando ela é verdadeira; falso positivo, controlado por alfa.

### 4. O que é erro Tipo II?
Não rejeitar H0 quando existe efeito; falso negativo, relacionado à potência.

### 5. Significância estatística garante relevância de negócio?
Não; efeito pode ser minúsculo. É preciso tamanho de efeito, custo e intervalo.

### 6. Quando usar teste pareado?
Quando observações estão naturalmente vinculadas, como antes/depois no mesmo cliente.

### 7. Por que testar pressupostos?
O teste depende do desenho e distribuição; violação pode alterar validade ou exigir método robusto/não paramétrico.

### 8. Como escolher tamanho de amostra?
Efeito mínimo relevante, variabilidade, alfa, potência, desenho e perdas esperadas.

### 9. Como você aplicaria testes de hipótese em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria testes de hipótese com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar testes de hipótese?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 4 - Matrizes, vetores, álgebra matricial, distâncias e produto interno

### 1. Qual é a diferença entre matriz e vetor?
Vetor é uma sequência 1D; matriz organiza valores em linhas e colunas.

### 2. O que o produto interno indica?
Alinhamento combinado com magnitude; após normalização, relaciona-se ao cosseno.

### 3. Por que StandardScaler é importante para distância?
Evita que features de escala maior dominem o cálculo.

### 4. Qual é a diferença entre distância Euclidiana e Manhattan?
Euclidiana mede linha reta e penaliza mais diferenças grandes; Manhattan soma diferenças absolutas. A escolha depende da geometria, escala e robustez desejada.

### 5. Quando a distância de Mahalanobis é útil?
Quando features possuem escalas e correlações; ela usa a covariância para medir quão incomum é um deslocamento em relação à estrutura dos dados.

### 6. Quando uma multiplicação de matrizes é possível?
Quando o número de colunas da primeira matriz é igual ao número de linhas da segunda. Se A é m x n e B é n x p, AB é m x p.

### 7. Por que colunas linearmente dependentes são um problema?
Criam redundância, reduzem posto e podem tornar coeficientes/soluções instáveis, especialmente em regressão e inversões.

### 8. Como produto interno aparece em embeddings?
Embeddings são vetores; produto interno ou cosseno mede alinhamento e permite recuperar itens semanticamente semelhantes.

### 9. Por que não calcular inversa explicitamente sempre?
Pode ser numericamente instável e caro. Solucionadores e decomposições são mais robustos para sistemas e regressão.

### 10. Como você aplicaria álgebra linear para ciência de dados em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria álgebra linear para ciência de dados com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

## Semana 5 - Missings, outliers e categorização

### 1. Por que imputar pela média pode ser ruim?
É sensível a assimetria/outliers, reduz variância e pode distorcer relações.

### 2. Quando criar uma flag de missing?
Quando a ausência pode carregar informação de processo/segmento.

### 3. Todo outlier deve ser removido?
Não; pode ser valor real, fraude ou evento de interesse. Primeiro investigar origem e objetivo.

### 4. One-hot e ordinal encoding são intercambiáveis?
Não; ordinal impõe ordem/distância, one-hot evita ordem artificial.

### 5. O que é data leakage no preprocessamento?
Usar estatísticas/informação do teste ou futuro para ajustar transformações.

### 6. Por que usar Pipeline?
Reprodutibilidade, ordem consistente, CV correto e menor risco de leakage.

### 7. Quando winsorizar um outlier?
Quando o valor é legítimo, mas sua influência extrema prejudica o objetivo; deve ser comparado com transformação/modelo robusto e documentado.

### 8. Qual o risco de target encoding?
Leakage e overfitting. Deve ser feito out-of-fold, com suavização e tratamento de categorias novas.

### 9. Por que criar faixas de variável contínua?
Pode melhorar interpretação e capturar não linearidade, mas perde informação e cria fronteiras artificiais; deve ser validado.

### 10. Como avaliar o tratamento de dados?
Comparar distribuição, qualidade, estabilidade e desempenho em validação, verificando se o tratamento não destruiu sinal nem criou viés.

## Semana 6 - Correlação, associação, PCA e seleção de variáveis

### 1. Pearson e Spearman medem a mesma coisa?
Pearson mede relação linear; Spearman mede associação monotônica via postos.

### 2. Como medir associação entre categóricas?
Tabela de contingência, qui-quadrado e medida como V de Cramér.

### 3. O que o PCA otimiza?
Direções ortogonais que capturam máxima variância sucessiva.

### 4. PCA seleciona variáveis?
Não; cria combinações lineares. Feature selection mantém subconjunto das originais.

### 5. Qual a limitação central do PCA?
Perda de interpretabilidade e foco em variância, que nem sempre é relevância preditiva.

### 6. Como selecionar variáveis sem vazar informação?
Fazer seleção dentro do pipeline e dentro de cada fold de validação.

### 7. O que é loading no PCA?
É o peso de cada feature original em um componente; magnitude indica contribuição e sinal indica direção relativa.

### 8. PCA é seleção de variáveis?
Não. PCA cria combinações lineares; seleção mantém subconjunto das variáveis originais.

### 9. Qual a diferença entre filter, wrapper e embedded?
Filter usa critério independente; wrapper testa subconjuntos com modelo; embedded seleciona durante o treino, como Lasso/árvores.

### 10. Como provar estabilidade de features?
Comparar seleção/importância em folds, períodos e amostras, além de disponibilidade no momento real da previsão.

## Semana 7 - Python, leitura/escrita, sklearn e engenharia mínima de projeto

### 1. Por que funções são importantes em um projeto de dados?
Reutilização, teste isolado, redução de duplicação e separação de responsabilidades.

### 2. Qual é a diferença entre lista, tupla, conjunto e dicionário?
Lista é ordenada e mutável; tupla é ordenada e imutável; conjunto remove duplicatas; dicionário associa chave a valor.

### 3. Quando usar try/except?
Para tratar falhas previsíveis e produzir mensagem/ação controlada, sem esconder erros de programação.

### 4. Qual é a diferença entre NumPy e pandas?
NumPy trabalha principalmente com arrays numéricos; pandas adiciona rótulos, tipos heterogêneos e operações tabulares.

### 5. Por que usar .gitignore?
Evitar versionar ambientes, caches, credenciais, arquivos grandes e dados sensíveis.

### 6. O que torna um experimento reproduzível?
Versões de dependências, seed, dados/geração documentados, código versionado e passos de execução.

### 7. O que sklearn oferece?
API consistente de estimadores, preprocessamento, pipelines, validação, modelos e métricas.

### 8. Como você investigaria um CSV que falhou ao carregar?
Verificar caminho, encoding, separador, cabeçalho, tipos, linhas quebradas e mensagem de erro.

### 9. Como você aplicaria programação Python para ciência de dados em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria programação Python para ciência de dados com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar programação Python para ciência de dados?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 8 - Modelo relacional, SQL, álgebra relacional e chaves

### 1. O que é uma chave primária?
Identificador único e não nulo de cada registro; garante integridade da entidade.

### 2. O que é uma chave estrangeira?
Coluna que referencia a chave de outra tabela e sustenta integridade referencial.

### 3. Por que um JOIN pode multiplicar linhas?
Porque a chave usada não é única em um ou nos dois lados; a cardinalidade precisa ser entendida antes.

### 4. Qual é a diferença entre WHERE e HAVING?
WHERE filtra linhas antes da agregação; HAVING filtra grupos depois do GROUP BY.

### 5. Quando usar LEFT JOIN?
Quando é necessário preservar todas as linhas da tabela da esquerda, inclusive sem correspondência.

### 6. O que é granularidade?
O significado de cada linha; por exemplo, uma linha por transação ou uma linha por cliente-mês.

### 7. Como SQL entra no trabalho de cientista de dados?
Extração, integração, validação e criação de features antes da modelagem.

### 8. O que é vazamento temporal em uma query?
Usar informação posterior ao momento em que a previsão deveria ser feita.

### 9. Como você aplicaria SQL e banco relacional em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria SQL e banco relacional com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar SQL e banco relacional?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 9 - Regressão linear, resíduos, métricas e validação

### 1. O que um coeficiente representa?
Variação esperada no target por unidade da feature, mantendo as demais constantes, dentro do modelo.

### 2. O que é um resíduo?
Valor observado menos previsto; evidencia erro não explicado.

### 3. O que é heterocedasticidade?
Variância do erro muda com nível previsto/feature, afetando inferência e incerteza.

### 4. MAE ou RMSE?
MAE é robusto e interpretable; RMSE penaliza mais erros grandes. Escolha pelo custo.

### 5. R2 alto garante modelo bom?
Não; pode haver leakage, erro alto relevante, instabilidade ou extrapolação ruim.

### 6. Por que RMSE pune erros grandes?
Porque eleva erros ao quadrado antes da média.

### 7. Como detectar overfitting?
Desempenho muito melhor no treino que em validação/teste, com instabilidade entre folds.

### 8. O que significa R2 negativo no teste?
O modelo generaliza pior que o baseline de prever a média do treino; pode indicar overfitting, drift, features fracas ou erro de pipeline.

### 9. Quando usar out-of-time?
Quando o modelo será aplicado no futuro e a ordem temporal pode mudar a distribuição.

### 10. Por que normalidade dos resíduos não é requisito absoluto de previsão?
É mais importante para inferência clássica; para previsão, importam generalização, padrões de resíduos e incerteza.

## Semana 10 - Regularização, árvore de regressão e GLM

### 1. Ridge e Lasso resolvem o mesmo problema?
Ambos regularizam; Ridge contrai coeficientes, Lasso pode selecionar zerando alguns.

### 2. O que é GLM?
Estrutura que relaciona média do target a preditor linear por função de ligação e família de distribuição.

### 3. Quando árvore supera linear?
Quando há não linearidades/interações/cortes; ainda precisa controlar overfitting.

### 4. Como uma árvore escolhe split?
Busca divisão que reduz impureza/erro segundo critério e restrições.

### 5. Por que árvore única overfita?
Pode crescer regras muito específicas para ruído do treino.

### 6. Qual a diferença prática entre L1 e L2?
L2 contrai coeficientes e estabiliza correlação; L1 pode zerar coeficientes e produzir esparsidade.

### 7. O que define um GLM?
Família de distribuição, preditor linear e função de ligação entre a média do alvo e o preditor.

### 8. Quando usar GLM Poisson?
Para contagens não negativas com exposição e relação log, verificando overdispersion.

### 9. Como uma árvore de regressão prevê?
A observação percorre regras até uma folha; a previsão é uma estatística dos alvos na folha.

### 10. Modelo mais preciso sempre é melhor?
Não; estabilidade, explicabilidade, latência, governança e custo também importam.

## Semana 11 - Regressão logística e Naive Bayes

### 1. Por que regressão logística é classificação?
Modela probabilidade de classe e aplica threshold; o nome vem do preditor linear/logit.

### 2. O que a sigmoide faz?
Mapeia qualquer número real para intervalo 0-1.

### 3. O que é odds?
Razão p/(1-p); compara chance do evento com a do não evento.

### 4. Por que usar Log Loss?
Penaliza probabilidades confiantes e erradas e é adequada ao ajuste probabilístico.

### 5. O que muda ao reduzir threshold?
Aumenta positivos previstos/Recall e tende a reduzir Precision.

### 6. Qual é a hipótese naive?
Features são condicionalmente independentes dada a classe.

### 7. GaussianNB e BernoulliNB diferem como?
Gaussiano modela feature contínua por Normal por classe; Bernoulli modela presença/ausência binária.

### 8. Probabilidade prevista é automaticamente calibrada?
Não; discriminação e calibração são propriedades diferentes.

### 9. Como você aplicaria classificadores probabilísticos em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria classificadores probabilísticos com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar classificadores probabilísticos?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 12 - KNN e SVM

### 1. Por que KNN precisa de escala?
A distância seria dominada por features numericamente maiores.

### 2. K pequeno e K grande causam o quê?
Pequeno: alta variância/overfit; grande: maior viés/suavização.

### 3. Por que KNN é lazy learner?
Não aprende parâmetros globais; armazena dados e calcula vizinhos na predição.

### 4. O que o SVM maximiza?
A margem entre fronteira e pontos mais próximos das classes.

### 5. O que são vetores de suporte?
Observações críticas que definem a margem/fronteira.

### 6. O que C controla?
Trade-off entre margem ampla e penalidade por violações/erros.

### 7. O que gamma controla no RBF?
Alcance de influência de cada ponto; alto pode criar fronteira muito local.

### 8. Quando evitar KNN/SVM?
KNN em bases enormes/alta dimensão sem estrutura; SVM em escala massiva ou quando explicabilidade simples é crucial.

### 9. Como você aplicaria KNN e SVM em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria KNN e SVM com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar KNN e SVM?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 13 - Árvore de classificação, Random Forest, Boosting e ensembles

### 1. Como uma árvore escolhe split?
Busca divisão que reduz impureza/erro segundo critério e restrições.

### 2. Por que árvore única overfita?
Pode crescer regras muito específicas para ruído do treino.

### 3. O que bagging faz?
Treina modelos em amostras/variações e agrega para reduzir variância.

### 4. Por que Random Forest descorrelaciona árvores?
Usa bootstrap e subconjuntos aleatórios de features.

### 5. O que distingue boosting?
Modelos são sequenciais e cada etapa corrige resíduos/erros anteriores.

### 6. Learning rate baixo sempre é melhor?
Pode generalizar melhor, mas exige mais estimadores e custo; precisa validação.

### 7. Feature importance prova causalidade?
Não; mede uso/impacto no modelo sob os dados e pode ter vieses.

### 8. Qual modelo você escolheria para sabatina?
Depende de métrica, estabilidade, latência, explicabilidade e custo, não apenas melhor score.

### 9. Como você aplicaria árvores e ensembles em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria árvores e ensembles com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar árvores e ensembles?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 14 - Redes neurais, deep learning e avaliação

### 1. O que um neurônio calcula?
Combinação ponderada das entradas + bias, seguida de ativação.

### 2. Por que usar função de ativação?
Introduz não linearidade; sem ela, várias camadas equivaleriam a transformação linear.

### 3. O que é backpropagation?
Cálculo de gradientes da perda em relação aos pesos, propagado da saída para trás.

### 4. O que learning rate controla?
Tamanho da atualização dos pesos; alto pode divergir, baixo pode ser lento.

### 5. O que é epoch e batch?
Epoch é passagem completa pelos dados; batch é subconjunto usado em uma atualização.

### 6. Quando evitar deep learning?
Poucos dados, baixa capacidade computacional, forte exigência de explicabilidade ou quando modelo simples resolve.

### 7. Como detectar overfitting em rede?
Loss de treino cai enquanto validação piora; diferença de métricas cresce. Early stopping e regularização ajudam.

### 8. O que dropout faz?
Desativa unidades aleatoriamente no treino para reduzir coadaptação e overfitting.

### 9. Por que calibrar uma rede de risco?
A sigmoid pode produzir probabilidades superconfiantes; faixas de score devem refletir frequências reais.

### 10. Quando uma árvore pode superar uma rede em tabular?
Em bases pequenas/médias e heterogêneas, boosting costuma exigir menos preparação e ser mais interpretável.

## Semana 15 - K-means, K-medoids e escolha do número de clusters

### 1. Qual é a diferença entre cluster e classe?
Classe é rótulo conhecido; cluster é estrutura inferida sem target.

### 2. O que K-means minimiza?
Soma das distâncias quadráticas aos centróides dentro dos clusters.

### 3. Por que escala é crucial?
Features maiores dominam distância e centróides.

### 4. K-means e K-medoids diferem como?
Centróide pode não ser observação; medoid é ponto real e tende a ser mais robusto.

### 5. O que o elbow procura?
Ponto de retornos decrescentes na redução da inércia.

### 6. O que silhueta mede?
Coesão com próprio cluster versus separação do cluster vizinho.

### 7. Silhueta alta garante valor de negócio?
Não; precisa interpretação, estabilidade e ação.

### 8. Como validar clusters sem target?
Índices internos, estabilidade, coerência, perfil e validação com especialistas/uso.

### 9. Como você aplicaria K-means e avaliação de clusters em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria K-means e avaliação de clusters com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar K-means e avaliação de clusters?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 16 - DBSCAN, hierárquico, GMM e detecção de anomalia

### 1. O que é ponto core no DBSCAN?
Ponto com vizinhança suficientemente densa segundo eps e MinPts.

### 2. O que eps controla?
Raio de vizinhança; depende de escala/métrica.

### 3. Qual limitação do DBSCAN?
Sensível a parâmetros/escala e difícil com densidades muito diferentes.

### 4. O que linkage define?
Como a distância entre clusters é calculada durante a fusão.

### 5. O que significa cortar dendrograma?
Escolher nível de distância e obter número de grupos.

### 6. K-means e GMM diferem como?
K-means gera pertença rígida e esférica; GMM modela mistura probabilística/covariância.

### 7. O que o EM faz?
Alterna estimar responsabilidades e atualizar parâmetros até convergência.

### 8. Anomalia é sinônimo de fraude?
Não; é desvio do padrão e precisa investigação/contexto.

### 9. Como você aplicaria DBSCAN, hierárquico, GMM e anomalias em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria DBSCAN, hierárquico, GMM e anomalias com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar DBSCAN, hierárquico, GMM e anomalias?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.

## Semana 17 - PLN, text mining, embeddings, Transformer e fundamentos de IA Generativa

### 1. O que é text mining?
Extração de padrões/informação de coleções textuais.

### 2. O que tokenização faz?
Divide texto em unidades processáveis; a definição depende do modelo/idioma.

### 3. O que TF-IDF representa?
Peso alto para termos frequentes no documento e relativamente raros no corpus.

### 4. Por que não remover toda stopword automaticamente?
Pode apagar negação/contexto e depende da tarefa.

### 5. O que é embedding?
Vetor denso que representa características/semântica aprendida.

### 6. Por que usar cosseno?
Compara direção e reduz efeito de magnitude em representações vetoriais.

### 7. Embeddings iguais significam textos equivalentes?
Não; são aproximações e podem carregar vieses/erros.

### 8. Como avaliar classificador de reclamações?
Métricas por classe, matriz de confusão, erro qualitativo e impacto operacional.

### 9. O que atenção faz?
Pondera relações entre representações para incorporar contexto.

### 10. Por que Transformer precisa de posição?
A atenção pura não conhece ordem; embeddings/encodings posicionais distinguem sequências.

## Semana 18 - In Context Learning, Prompt, RAG, fine-tuning, quantization, RLHF e guardrails

### 1. O que é In Context Learning?
Resolver tarefa a partir de instruções/exemplos no prompt sem atualizar pesos.

### 2. O que RAG acrescenta?
Recupera contexto externo antes da geração, permitindo usar documentos atualizados/privados.

### 3. O que é chunking?
Dividir documentos em unidades recuperáveis; tamanho/overlap afetam contexto e precisão.

### 4. Banco vetorial substitui banco relacional?
Não; resolve busca por similaridade, enquanto relacional atende integridade/consulta estruturada.

### 5. Como avaliar RAG?
Separar cobertura/relevância da recuperação, fidelidade ao contexto, resposta e citações.

### 6. Quando fine-tuning faz sentido?
Mudança consistente de comportamento/formato/domínio com dados de qualidade; não para simples atualização factual.

### 7. RAG ou fine-tuning para documentos novos?
RAG geralmente, pois atualiza conhecimento externo sem mexer nos pesos.

### 8. O que quantization faz?
Reduz precisão numérica dos pesos/ativação para diminuir memória/custo, com possível perda.

### 9. O que é RLHF?
Ajuste/alinhamento usando preferências humanas e aprendizado por reforço ou métodos relacionados.

### 10. O que é prompt injection?
Entrada tenta substituir instruções ou induzir acesso/ação não autorizada.

## Semana 19 - Programação linear, inteira, Branch-and-Bound, GAP e solvers

### 1. O que é função objetivo?
Quantidade a maximizar/minimizar em função das decisões.

### 2. O que é região viável?
Conjunto de soluções que satisfaz todas as restrições.

### 3. Quando variável precisa ser binária?
Decisão sim/não, selecionar/não selecionar, abrir/não abrir.

### 4. O que é relaxação linear?
Remover integralidade para obter problema contínuo e bound.

### 5. Por que arredondar pode falhar?
Pode violar restrições ou produzir solução longe do ótimo.

### 6. O que branch-and-bound faz?
Divide espaço em ramos e poda usando limites/viabilidade.

### 7. O que GAP informa?
Distância relativa entre melhor solução viável e bound; mede qualidade comprovada.

### 8. O que é incumbent?
É a melhor solução viável inteira conhecida; serve de referência para o GAP.

### 9. O que é Best Bound?
É o melhor limite teórico disponível para o ótimo entre os ramos ainda possíveis.

### 10. Como escolher um solver?
Pelo tipo de modelo, escala, licença e recursos; validar status, tolerância e tempo.

## Semana 20 - Big Data, Spark/PySpark, Hadoop/Hive, grafos e séries temporais

### 1. O que Hadoop resolve?
Armazenamento/processamento distribuído tolerante a falhas para grandes volumes.

### 2. O que Hive oferece?
Camada de consulta estilo SQL sobre dados distribuídos.

### 3. Por que Spark pode ser rápido?
Processamento otimizado, em memória quando útil, DAG e execução distribuída.

### 4. O que é partition?
Unidade de dados/trabalho distribuída entre executors.

### 5. O que é lazy evaluation?
Transformações são planejadas e só executadas quando uma ação exige resultado.

### 6. O que é shuffle?
Redistribuição de dados entre partições/nós, geralmente custosa.

### 7. PySpark substitui SQL?
Não; Spark SQL e DataFrame complementam bancos e pipelines conforme escala/arquitetura.

### 8. Quando Spark é exagero?
Dados pequenos e operações simples, pois overhead e complexidade superam benefício.

### 9. Por que não embaralhar série temporal?
Quebra causalidade temporal e permite treinar com futuro.

### 10. O que é tendência?
Mudança persistente de nível ao longo do tempo.

## Semana 21 - Ensembles, anomalias, text mining, deep learning, imagens e fala

### 1. O que um neurônio calcula?
Combinação ponderada das entradas + bias, seguida de ativação.

### 2. Por que usar função de ativação?
Introduz não linearidade; sem ela, várias camadas equivaleriam a transformação linear.

### 3. O que é backpropagation?
Cálculo de gradientes da perda em relação aos pesos, propagado da saída para trás.

### 4. O que learning rate controla?
Tamanho da atualização dos pesos; alto pode divergir, baixo pode ser lento.

### 5. O que é epoch e batch?
Epoch é passagem completa pelos dados; batch é subconjunto usado em uma atualização.

### 6. Por que CNN funciona em imagem?
Explora estrutura local e compartilhamento de filtros.

### 7. O que é speech analytics?
Extração de informação de áudio/transcrição: tema, sentimento, qualidade, intenção, conformidade.

### 8. Quando evitar deep learning?
Poucos dados, baixa capacidade computacional, forte exigência de explicabilidade ou quando modelo simples resolve.

### 9. O que bagging faz?
Treina modelos em amostras/variações e agrega para reduzir variância.

### 10. Por que Random Forest descorrelaciona árvores?
Usa bootstrap e subconjuntos aleatórios de features.

## Semana 22 - Capstone integrado, simulado prático e sabatina final

### 1. Como você começou o projeto?
Problema/decisão, unidade, target, janela, métrica e restrições antes do algoritmo.

### 2. Como garantiu ausência de leakage?
Corte temporal/granularidade, pipeline fit no treino e auditoria das features.

### 3. Por que escolheu esse modelo?
Baseline, protocolo comparável, métrica/custo, estabilidade, latência e explicabilidade.

### 4. Qual é o maior risco do projeto?
Deve citar risco técnico/dados/viés/drift e mitigação concreta.

### 5. Como o modelo seria monitorado?
Qualidade de dados, drift, performance, calibração, segmentos, latência e alertas.

### 6. O que faria com mais tempo?
Melhoria priorizada por impacto e evidência, não lista genérica.

### 7. Como reproduzir o repositório?
Ambiente/dependências, comando de execução, seeds, dados/geração e testes.

### 8. O que você aprendeu que mudaria em um próximo projeto?
Reflexão específica sobre dados, validação, escopo, decisão e comunicação.

### 9. Como você aplicaria capstone end-to-end em um problema bancário real?
Eu começaria pela decisão de negócio, definiria a unidade e os dados disponíveis, aplicaria capstone end-to-end com pipeline reproduzível, validaria fora da amostra e traduziria o resultado em ação, limitações e monitoramento.

### 10. Qual erro mais comum ao usar capstone end-to-end?
O erro mais comum é aplicar a técnica mecanicamente, sem checar pressupostos, leakage, qualidade dos dados, métrica adequada e custo operacional. Eu compararia alternativas e documentaria o motivo da escolha.