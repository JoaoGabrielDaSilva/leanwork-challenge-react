import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const PROJECT_URL = "localhost:5173";

test("Button is disabled when fields are empty", async ({ page }) => {
  await page.goto(`${PROJECT_URL}/user-register`);

  await expect(page.getByText("Cadastrar")).toBeDisabled();
});

test("Button get enable when fields are filled", async ({ page }) => {
  await page.goto(`${PROJECT_URL}/user-register`);

  await page.getByLabel("Nome").fill(faker.person.firstName());
  await page.getByLabel("E-mail").fill(faker.internet.email());
  await page.getByLabel("CPF").fill(faker.string.numeric({ length: 11 }));
  await page.getByLabel("Telefone").fill(faker.string.numeric({ length: 13 }));

  await expect(page.getByText("Cadastrar")).toBeEnabled();
});

test("Errors are shown if fields are invalid", async ({ page }) => {
  await page.goto(`${PROJECT_URL}/user-register`);

  await page.getByLabel("Nome").fill("1");
  await page.getByLabel("E-mail").fill("1");
  await page.getByLabel("CPF").fill("1");
  await page.getByLabel("Telefone").fill("1");

  await page.getByText("Cadastrar").click();

  await expect(
    page.getByText("O nome deve ter pelo menos 3 caracteres")
  ).toBeVisible();
  await expect(page.getByText("O CPF deve ser válido")).toBeVisible();
  await expect(page.getByText("O e-mail deve ser válido")).toBeVisible();
  await expect(page.getByText("O telefone deve ser válido")).toBeVisible();
});

test("User should be registered when fields are valid", async ({ page }) => {
  await page.goto(`${PROJECT_URL}/user-register`);

  const VALID_CPF = "794.583.950-97";
  const VALID_PHONE = "51 98292-1923";

  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    cpf: VALID_CPF,
    phone: VALID_PHONE,
  };

  await page.getByLabel("Nome").fill(user.name);
  await page.getByLabel("E-mail").fill(user.email);
  await page.getByLabel("CPF").fill(user.cpf);
  await page.getByLabel("Telefone").fill(user.phone);

  await page.getByText("Cadastrar").click();

  await expect(page.getByText("Usuários Registrados")).toBeVisible();
  await expect(page.getByText(user.name)).toBeVisible();
  await expect(page.getByText(user.cpf)).toBeVisible();
  await expect(page.getByText(user.phone)).toBeVisible();
  await expect(page.getByText(user.email)).toBeVisible();
});

test("Should navigate to user list page", async ({ page }) => {
  await page.goto(`${PROJECT_URL}/user-register`);

  await page.getByText("Ver usuários cadastrados ->").click();
  await expect(page.getByText("Usuários Registrados")).toBeVisible();
});
