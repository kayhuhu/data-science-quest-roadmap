import { mkdir, writeFile } from "node:fs/promises";

const output = new URL("../public/datasets/", import.meta.url);
await mkdir(output, { recursive: true });

let state = 20260808;
const random = () => {
  state = (1664525 * state + 1013904223) >>> 0;
  return state / 2 ** 32;
};
const normal = () => {
  const u = Math.max(random(), Number.EPSILON);
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const logistic = (value) => 1 / (1 + Math.exp(-value));
const csv = (headers, rows) => `${headers.join(",")}\n${rows.map((row) => row.join(",")).join("\n")}\n`;
const fixed = (value, digits = 4) => Number(value).toFixed(digits);

const classificationOne = Array.from({ length: 490 }, (_, index) => {
  const idade = Math.round(19 + random() * 56);
  const renda = Math.max(900, 4800 + normal() * 2400);
  const utilizacao = Math.min(1.3, Math.max(0, 0.48 + normal() * 0.26));
  const atrasos = Math.max(0, Math.round(normal() * 0.7 + (utilizacao > 0.82 ? 1.2 : 0)));
  const relacionamento = Math.max(1, Math.round(random() * 180));
  const linear = -3.2 + 2.8 * utilizacao + 0.58 * atrasos - 0.00012 * renda - 0.004 * relacionamento + 0.006 * (idade - 40);
  const target = random() < logistic(linear) ? 1 : 0;
  return [index + 1, idade, fixed(renda, 2), fixed(utilizacao), atrasos, relacionamento, target];
});

const classificationTwo = Array.from({ length: 600 }, (_, index) => {
  const renda = Math.max(700, 5200 + normal() * 2900);
  const comprometimento = Math.min(1.2, Math.max(0.02, 0.34 + normal() * 0.2));
  const atraso = Math.max(0, Math.round(normal() * 0.65 + (comprometimento > 0.7 ? 1 : 0)));
  const consultas = Math.max(0, Math.round(random() * 8));
  const saldo = Math.max(0, 1700 + normal() * 1600);
  const drift = index > 479 ? 0.12 : 0;
  const linear = -2.8 + 3.4 * comprometimento + 0.68 * atraso + 0.11 * consultas - 0.00016 * renda + drift;
  const target = random() < logistic(linear) ? 1 : 0;
  return [fixed(renda, 2), fixed(comprometimento), atraso, consultas, fixed(saldo, 2), target];
});

const regressionOne = Array.from({ length: 500 }, (_, index) => {
  const x1 = normal();
  const x2 = normal();
  const x3 = 0.65 * x1 + normal() * 0.45;
  const x4 = random() * 2 - 1;
  const target = 0.9 * x1 - 0.45 * x2 + 0.25 * x3 + 0.15 * x4 + normal() * 0.52;
  return [index + 1, fixed(x1), fixed(x2), fixed(x3), fixed(x4), fixed(target)];
});

const regressionTwo = Array.from({ length: 450 }, (_, index) => {
  const area = 30 + random() * 180;
  const quartos = 1 + Math.floor(random() * 5);
  const distancia = random() * 28;
  const idadeImovel = random() * 45;
  const target = 520 + 8.5 * area + 105 * quartos - 16 * distancia - 2.2 * idadeImovel + normal() * 128;
  return [index + 1, fixed(area, 2), quartos, fixed(distancia, 2), fixed(idadeImovel, 2), fixed(target, 2)];
});

const centers = [[-3.2, -2.2, 0.4], [3.1, -1.8, 2.3], [-2.4, 3.4, -2.1], [3.6, 3.1, -0.2]];
const clustering = centers.flatMap((center, cluster) => Array.from({ length: 90 }, (_, index) => [
  cluster * 90 + index + 1,
  fixed(center[0] + normal() * 0.78),
  fixed(center[1] + normal() * 0.74),
  fixed(center[2] + normal() * 0.66),
]));

const files = [
  ["classificacao_Q1.csv", ["id", "idade", "renda_mensal", "utilizacao_limite", "atrasos_30d", "meses_relacionamento", "target"], classificationOne],
  ["classificacao_Q2.csv", ["renda_mensal", "comprometimento_renda", "atrasos_30d", "consultas_credito", "saldo_medio", "target"], classificationTwo],
  ["regressao_Q1.csv", ["id", "x1", "x2", "x3", "x4", "target"], regressionOne],
  ["regressao_Q2.csv", ["id", "area_m2", "quartos", "distancia_centro_km", "idade_imovel", "aluguel"], regressionTwo],
  ["agrupamento.csv", ["id", "comportamento_1", "comportamento_2", "comportamento_3"], clustering],
];

for (const [name, headers, rows] of files) {
  await writeFile(new URL(name, output), csv(headers, rows), "utf8");
}

await writeFile(new URL("LEIA-ME.txt", output), `DATASETS DIDÁTICOS RECONSTRUÍDOS\n\nOs arquivos originais citados em PROVA_ITAU_2.ipynb não acompanharam o material recebido. Estes cinco CSVs foram gerados de forma determinística para permitir que o pipeline, os comandos e as métricas sejam praticados. Eles preservam o tipo de problema e deixam a variável-alvo na última coluna, como o notebook espera, mas não pretendem reproduzir linha a linha os arquivos originais. Portanto, os números podem divergir do gabarito original.\n\nGerador: scripts/generate-assessment-datasets.mjs\nSeed: 20260808\n`, "utf8");

console.log(`Datasets didáticos gerados: ${files.length}`);
