describe("Can Perform Bulk Approval", () => {
  it.skip("Loads Proposals", () => {
    cy.bypassRegisteredUserAuth();
    cy.visit("/dao/dx.io/proposals");
    cy.wait(2000);
    cy.contains("View");
  });
  it.skip("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.wait(2000);
    cy.contains("Approve").click();
  });
  it.skip("Shows Bulk Approval Modal", () => {
    cy.contains("Are you sure");
  });
  it.skip("Successfully Bulk Approves", () => {
    cy.get(".confirm-btn").click();
    cy.wait(5000);
  });
  it.skip("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Approve").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});

describe("Can Perform Bulk Execution", () => {
  it.skip("Loads Proposals", () => {
    cy.visit("/dao/dx.io/proposals");
    cy.wait(2000);
    cy.contains("View");
  });
  it.skip("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.wait(2000);
    cy.contains("Execute").click();
  });
  it.skip("Shows Bulk Execution Modal", () => {
    cy.contains("Are you sure");
  });
  it.skip("Successfully Bulk Executes", () => {
    cy.get(".confirm-btn").click();
    cy.wait(5000);
  });
  it.skip("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});
