import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/semanas/1");
  await expect(page.getByRole("dialog", { name: /Semana 1:/ })).toBeVisible();
});

test("renders the six tabs with readable typography and no page overflow", async ({ page }) => {
  const tabs = page.locator(".weekly-six-tabs button");
  await expect(tabs).toHaveCount(6);
  for (const label of ["APRENDER", "PRATICAR", "PROJETO", "SABATINA", "REVISAR", "PROGRESSO"]) {
    await expect(tabs.filter({ hasText: label })).toHaveCount(1);
  }
  const fontSize = await page.locator(".drawer-section-intro p").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  expect(fontSize).toBeGreaterThanOrEqual(16);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("switches all weekly sections inside the same study page", async ({ page }) => {
  const checks = [
    ["PRATICAR", "Exercícios curtos antes do projeto"],
    ["PROJETO", "PROJETO DA SEMANA 1"],
    ["SABATINA", "Explique como alguém que aplicaria amanhã"],
    ["REVISAR", "Volte ao que ainda não está seguro"],
    ["PROGRESSO", "Conclusão baseada em evidências"],
    ["APRENDER", "Entenda, aplique e saiba defender"],
  ];
  for (const [tab, heading] of checks) {
    await page.locator(".weekly-six-tabs button", { hasText: tab }).click();
    await expect(page.getByText(heading, { exact: false }).first()).toBeVisible();
    await expect(page.getByRole("dialog", { name: /Semana 1:/ })).toBeVisible();
  }
});

test("renders Markdown and LaTeX in optional depth", async ({ page }) => {
  await page.locator(".optional-depth-card summary").click();
  await expect(page.locator(".weekly-markdown h3")).toHaveText("Intuição matemática");
  await expect(page.locator(".weekly-markdown ul li")).toHaveCount(3);
  await expect(page.locator(".weekly-markdown .katex").first()).toBeVisible();
});

test("persists a completion evidence checkbox after reload", async ({ page }) => {
  await page.locator(".weekly-six-tabs button", { hasText: "PROGRESSO" }).click();
  const practice = page.locator(".completion-criteria label", { hasText: "Exercícios principais concluídos" }).locator("input");
  await practice.check();
  await page.waitForTimeout(800);
  await page.reload();
  await page.locator(".weekly-six-tabs button", { hasText: "PROGRESSO" }).click();
  await expect(page.locator(".completion-criteria label", { hasText: "Exercícios principais concluídos" }).locator("input")).toBeChecked();
});
