describe("Can Create and Auto Approve a New Standard Proposal", () => {
  it("Can Navigate to the NewProposal Page", () => {
    cy.visit("/dao/dx.io/proposals", { timeout: 500000 });
    cy.contains("NewProposal").click();
    cy.url().should("include", "/new-proposal");
  });
  it("Can fill out form values", () => {
    cy.contains("feature").click();
    cy.contains("feature request").click();
    cy.get("#new-proposal-form_title").type("Test Title From Cypress");
    cy.contains("One Day").click();
    cy.get("#new-proposal-form_summary").type("Test Description From Cypress");
    cy.get(".ant-checkbox-input").click({ multiple: true });
  });
  it("Shows Receipts", () => {
    cy.get(".share-proposal-btn").click();
    cy.contains("Congratulations");
  });
  it("Navigates Back To the Dao", () => {
    cy.get(".ant-modal-close-x").click();
    cy.wait(10000);
    cy.url().should("include", "/proposals");
  });
  it("Shows the NewProposal is already approved", () => {
    cy.contains("View").click();
    cy.contains("live");
    cy.contains("Vote");
  });
});
