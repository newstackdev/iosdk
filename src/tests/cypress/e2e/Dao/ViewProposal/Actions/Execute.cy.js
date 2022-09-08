describe("Can Execute a Proposal", () => {
  it("Can Sort by Needs Execution", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals", { timeout: 500000 });
    cy.contains("Member Proposals").click();
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
  });
  it("Can Visit an individual Proposal from the DAO that needs execution", () => {
    cy.contains("View").click();
    cy.url().should("include", "/member-proposal");
    cy.get(".view-proposal-wrapper");
  });
  it("Can Perform All Actions on Execute Modal", () => {
    cy.get(".power-up-btn").click();
    cy.get(".confirm-btn").click();
    cy.contains("Nice!");
  });
});
