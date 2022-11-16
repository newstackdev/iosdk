describe("Can Execute a Proposal", () => {
  it.skip("Can Sort by Needs Execution", () => {
    cy.bypassRegisteredUserAuth();
    cy.visit("/dao/dx.io/proposals", { timeout: 500000 });
    cy.contains("Member Proposals").click();
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
  });
  it.skip("Can Visit an individual Proposal from the DAO that needs execution", () => {
    cy.contains("View").click();
    cy.url().should("include", "/member-proposal");
    cy.get(".view-proposal-wrapper");
  });
  it.skip("Can Perform All Actions on Execute Modal", () => {
    cy.get(".power-up-btn").click();
    cy.get(".confirm-btn").click();
    cy.contains("Nice!");
  });
});
