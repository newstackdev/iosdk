describe("Can View a Proposal", () => {
  //   before(() => {
  //     cy.bypassRegisteredUserAuth();
  //   });
  //   beforeEach(() => {
  //     cy.visit("/dao/dx.io/proposals", { timeout: 500000 });
  //   });
  it.skip("Can Visit an individual Proposal from the DAO", () => {
    cy.contains("View").click();
    cy.url().should("include", "/proposal");
    cy.get(".view-proposal-row-wrapper");
  });
  //   it.skip("Can Perform All Actions on Vote Modal", () => {
  //     cy.contains("YES").click();
  //     cy.get("#vote-proposal-form_quantity").type(1);
  //     cy.get("#vote-lock-btn").click();
  //     cy.get("#vote-confirm-btn").click();
  //     cy.get("#vote-submit-btn").click();
  //   });
});
