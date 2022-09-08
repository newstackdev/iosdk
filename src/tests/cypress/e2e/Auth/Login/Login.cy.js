import { Input } from "antd";

describe("Can Login Successfully", () => {
  it("Can Fill out Form", () => {
    cy.visit("/", { timeout: 500000 });
    cy.contains("Sign In").click();
    cy.get("#basic_phone").type("420123123123");
    cy.get("#basic_phone").type("{enter}");
    cy.wait(3000);
    cy.get("#basic_phoneVerificationCode").type("111111{enter}");
  });
});
