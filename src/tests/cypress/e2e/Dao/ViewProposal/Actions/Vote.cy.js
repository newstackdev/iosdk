describe("Can Vote on a Proposal", () => {
  it.skip("Can Sort by Needs Votes", () => {
    cy.bypassRegisteredUserAuth();
    cy.visit("/dao/dx.io/proposals", { timeout: 500000 });
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Votes").click();
  });
  it.skip("Can Visit an individual Proposal from the DAO that needs votes", () => {
    cy.contains("0 yes").click();
    cy.url().should("include", "/proposal");
    cy.get(".view-proposal-row-wrapper");
  });
  it.skip("Can Perform All Actions on Vote Modal", () => {
    cy.get(".power-up-btn").click();
    cy.contains("YES").click();
    cy.get("#vote-proposal-form_quantity").type(1);
    cy.get("#vote-lock-btn").click();
    cy.get("#vote-confirm-btn").click();
    cy.get("#vote-submit-btn").click();
    cy.contains("Congratulations");
  });
});
