describe("Can Login Successfully", () => {
  it("Can Fill out Form", () => {
    cy.visit("http://localhost:3000/", { timeout: 500000 });
    cy.contains("Sign In").click();
    cy.get("#basic_phone").type("420111111112{enter}");
    cy.get("#basic_phoneVerificationCode").type("111111{enter}");
  });
});
