import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/semanas/1");
  await expect(page.getByRole("dialog", { name: /Semana 1:/ })).toBeVisible();
});

test("renders exactly five tabs with readable typography and no overflow", async ({ page }) => {
  const tabs = page.locator(".weekly-five-tabs button");
  await expect(tabs).toHaveCount(5);
  for (const label of ["ESTUDAR", "PRATICAR", "SABATINA", "REVISAR", "MATERIAIS"]) await expect(tabs.filter({ hasText: label })).toHaveCount(1);
  const fontSize = await page.locator(".drawer-section-intro p").first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  expect(fontSize).toBeGreaterThanOrEqual(16);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("switches every weekly section inside the same study page", async ({ page }) => {
  const checks = [
    ["PRATICAR", "Como provar que realmente entendeu?"],
    ["SABATINA", "Defenda a aplicação"],
    ["REVISAR", "Recupere o conteúdo"],
    ["MATERIAIS", "Outras explicações"],
    ["ESTUDAR", "O que exatamente aprender"],
  ];
  for (const [tab, heading] of checks) {
    await page.locator(".weekly-five-tabs button", { hasText: tab }).click();
    await expect(page.getByText(heading, { exact: false }).first()).toBeVisible();
    await expect(page.getByRole("dialog", { name: /Semana 1:/ })).toBeVisible();
  }
});

test("starts with literal syllabus, compact concept map and AI prompt controls", async ({ page }) => {
  await expect(page.getByText("EMENTA DA SEMANA", { exact: true })).toBeVisible();
  await expect(page.getByText("O QUE ESTUDAR", { exact: true })).toBeVisible();
  await expect(page.getByText("Gerar apostila completa da semana", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copiar prompt" })).toBeVisible();
  await expect(page.getByText("Anexar PDF", { exact: true })).toBeVisible();
});

test("persists compact mastery evidence after reload", async ({ page }) => {
  await page.locator(".weekly-five-tabs button", { hasText: "REVISAR" }).click();
  await page.locator(".compact-mastery summary").click();
  const explain = page.locator(".completion-criteria label", { hasText: "Consigo explicar" }).locator("input");
  await explain.check();
  await page.waitForTimeout(800);
  await page.reload();
  await page.locator(".weekly-five-tabs button", { hasText: "REVISAR" }).click();
  await page.locator(".compact-mastery summary").click();
  await expect(page.locator(".completion-criteria label", { hasText: "Consigo explicar" }).locator("input")).toBeChecked();
});
