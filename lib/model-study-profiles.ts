export type ModelStudyProfile = {
  preparation: string;
  scaling: string;
  categoriesAndMissing: string;
  imbalance: string;
  hyperparameters: string;
  metricsAndValidation: string;
  overfitAndUnderfit: string;
  strengthsAndLimits: string;
  monitoring: string;
};

const tree: ModelStudyProfile = {
  preparation: "Separe treino, validação e teste antes de aprender qualquer transformação. Árvores toleram relações não lineares e outliers, mas ainda exigem checagem de qualidade e vazamento.",
  scaling: "Padronização normalmente não é necessária, porque os cortes dependem da ordem dos valores, não da distância.",
  categoriesAndMissing: "No scikit-learn, impute missings e use one-hot para categorias sem ordem; label encoding só é seguro quando existe ordem real ou o algoritmo trata categorias nativamente.",
  imbalance: "Comece com pesos de classe e ajuste de limiar; compare oversampling e undersampling somente dentro dos folds de treino.",
  hyperparameters: "Profundidade, mínimo de amostras por folha, número de árvores, quantidade de features e taxa de aprendizado controlam complexidade e generalização.",
  metricsAndValidation: "Use precision, recall, F1, ROC-AUC/PR-AUC, KS ou Gini conforme custo do erro; prefira validação out-of-time em crédito e fraude.",
  overfitAndUnderfit: "Árvore muito profunda memoriza ruído; árvore rasa demais perde padrões. Compare as curvas de treino e validação e restrinja a complexidade.",
  strengthsAndLimits: "É interpretável e captura interações, mas uma árvore isolada é instável. Ensembles estabilizam ou reduzem viés, ao custo de menor transparência.",
  monitoring: "Acompanhe drift de dados, taxa do evento, estabilidade das features, desempenho por safra/segmento e diferença entre Gini de desenvolvimento e produção.",
};

const distance: ModelStudyProfile = {
  preparation: "Defina features que representem semelhança real, trate missings e remova identificadores. Outliers e dimensões irrelevantes distorcem vizinhanças.",
  scaling: "Obrigatória na prática: uma variável em escala maior dominaria a distância. Ajuste o scaler apenas no treino.",
  categoriesAndMissing: "Impute antes de calcular distâncias e codifique categorias de modo compatível com a métrica; one-hot pode aumentar muito a dimensão.",
  imbalance: "No KNN classificador, classes raras podem desaparecer na vizinhança; avalie pesos por distância, classe e amostragem apenas no treino.",
  hyperparameters: "Número de vizinhos ou clusters, métrica de distância, pesos, inicialização e critérios de vizinhança são as escolhas centrais.",
  metricsAndValidation: "Em classificação use métricas orientadas ao custo; em cluster use silhueta, estabilidade e utilidade de negócio, nunca apenas o cotovelo.",
  overfitAndUnderfit: "Poucos vizinhos geram alta variância; muitos suavizam demais. Muitos clusters fragmentam; poucos escondem segmentos úteis.",
  strengthsAndLimits: "A intuição é simples, mas escala, alta dimensionalidade, outliers e custo de inferência podem tornar a solução ruim.",
  monitoring: "Monitore distribuição das distâncias, tamanho e perfil dos grupos, dados fora do padrão e estabilidade temporal dos segmentos.",
};

const linear: ModelStudyProfile = {
  preparation: "Faça split primeiro, trate missings, categorias e outliers no pipeline e investigue multicolinearidade, resíduos e possível vazamento.",
  scaling: "É importante para comparar coeficientes e essencial para regularização L1/L2 e métodos guiados por distância; ajuste no treino.",
  categoriesAndMissing: "Use one-hot para categorias nominais, uma referência por variável e imputação aprendida apenas no treino.",
  imbalance: "Para regressão logística, ajuste limiar, pesos e amostragem conforme custo; para alvo contínuo, investigue caudas e segmentos raros.",
  hyperparameters: "Força/tipo de regularização, interações, transformação do alvo e família/link no GLM são as escolhas mais relevantes.",
  metricsAndValidation: "Regressão: MAE, RMSE e R² com análise de resíduos. Logística: recall, precision, F1, AUC, KS/Gini e calibração. Valide no tempo quando necessário.",
  overfitAndUnderfit: "Muitas variáveis e interações podem overfitar; forma linear simples demais underfita. Regularize e compare treino, validação e resíduos.",
  strengthsAndLimits: "É rápida, auditável e uma ótima baseline; perde desempenho quando a relação real é fortemente não linear sem engenharia de features.",
  monitoring: "Acompanhe estabilidade dos coeficientes, resíduos/calibração, drift, performance por segmento e deterioração por safra.",
};

const probabilistic: ModelStudyProfile = {
  preparation: "Escolha a variante compatível com o dado, trate missings e evite leakage. A hipótese central é independência condicional entre features dada a classe.",
  scaling: "Em geral não é requisito; o ponto decisivo é a distribuição assumida por cada variante.",
  categoriesAndMissing: "Gaussian serve a features contínuas aproximadamente gaussianas; Bernoulli a indicadores binários; Multinomial a contagens não negativas, especialmente texto.",
  imbalance: "Use priors/pesos coerentes, ajuste de limiar e métricas adequadas; não confie em acurácia com evento raro.",
  hyperparameters: "Suavização (alpha), priors de classe e estabilidade de variância são os principais controles.",
  metricsAndValidation: "Avalie precision, recall, F1, PR-AUC/ROC-AUC e calibração com split que represente produção.",
  overfitAndUnderfit: "Costuma ter baixo custo e maior viés; correlações fortes entre features podem contar a mesma evidência várias vezes.",
  strengthsAndLimits: "É muito rápido e forte como baseline/texto, mas probabilidades podem ser ruins quando as hipóteses estão distantes da realidade.",
  monitoring: "Monitore prior da classe, vocabulário/distribuições das features, calibração e métricas no tempo.",
};

const kernel: ModelStudyProfile = {
  preparation: "Trate missings, codifique categorias, reduza ruído e separe o teste antes do pipeline. SVM é sensível a escala e outliers.",
  scaling: "Obrigatória para impedir que uma feature domine margens e distâncias do kernel.",
  categoriesAndMissing: "Impute e use codificação numérica; one-hot pode ser adequado, mas alta dimensionalidade exige cuidado.",
  imbalance: "Use class_weight, limiar/decisão e métricas orientadas à classe rara; amostragem ocorre apenas no treino.",
  hyperparameters: "C controla penalização; gamma controla alcance no RBF; kernel define a fronteira possível.",
  metricsAndValidation: "Validação cruzada para hiperparâmetros e teste/OOT final; use métricas alinhadas ao custo e calibre probabilidades se necessário.",
  overfitAndUnderfit: "C/gamma altos podem criar fronteira excessivamente complexa; valores baixos podem suavizar demais.",
  strengthsAndLimits: "Pode funcionar muito bem em amostras médias e alta dimensão, mas escala mal em bases enormes e é menos explicável.",
  monitoring: "Monitore drift, margem/distribuição do score, calibração e desempenho por tempo e segmento.",
};

const neural: ModelStudyProfile = {
  preparation: "Separe dados antes de qualquer ajuste, normalize features, trate missings e desenhe uma validação fiel ao uso. Redes precisam de dados e controle de vazamento.",
  scaling: "Quase sempre necessária para estabilizar e acelerar a otimização.",
  categoriesAndMissing: "Impute missings; use one-hot ou embeddings para categorias conforme cardinalidade e volume.",
  imbalance: "Combine pesos, loss adequada, amostragem no treino e ajuste de limiar; acompanhe PR-AUC e recall/precision.",
  hyperparameters: "Arquitetura, learning rate, batch, épocas, regularização, dropout e early stopping dominam o resultado.",
  metricsAndValidation: "Curvas de treino/validação, early stopping e teste/OOT final; escolha métricas pelo custo bancário.",
  overfitAndUnderfit: "Rede grande treinada demais memoriza; pequena ou mal otimizada não aprende. Use regularização, early stopping e baseline simples.",
  strengthsAndLimits: "Captura padrões complexos, mas exige mais dados, computação, governança e explicabilidade.",
  monitoring: "Monitore drift, calibração, latência, falhas, desempenho por grupo e mudanças no pipeline/versão.",
};

const density: ModelStudyProfile = {
  ...distance,
  preparation: "Trate missings, padronize quando a geometria exigir, investigue outliers e escolha features que representem comportamento útil.",
  hyperparameters: "DBSCAN depende de eps e min_samples; hierárquico de distância/linkage; GMM de componentes e covariância.",
  metricsAndValidation: "Use silhueta/estabilidade e validação de negócio. GMM também permite likelihood/BIC/AIC; DBSCAN deve ser avaliado pela utilidade do ruído identificado.",
  strengthsAndLimits: "DBSCAN encontra formas arbitrárias e ruído, hierárquico mostra relações, GMM dá pertencimento probabilístico; todos dependem da representação dos dados.",
};

export const modelStudyProfiles: Record<string, ModelStudyProfile> = {
  "regr-01": linear,
  "regr-02": linear,
  "regr-03": tree,
  "regr-05": linear,
  "class-01": tree,
  "class-02": tree,
  "class-03": tree,
  "class-04": linear,
  "class-05": distance,
  "class-06": probabilistic,
  "class-07": neural,
  "class-08": kernel,
  "cluster-01": distance,
  "cluster-02": density,
  "cluster-03": density,
  "cluster-04": distance,
  "cluster-05": density,
};
