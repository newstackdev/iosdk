describe("Can Perform Bulk Approval", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(2000);
    cy.contains("View");
  });
  it("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.wait(2000);
    cy.contains("Approve").click();
  });
  it("Shows Bulk Approval Modal", () => {
    cy.contains("Are you sure");
  });
  it("Successfully Bulk Approves", () => {
    cy.get(".confirm-btn").click();
    cy.wait(5000);
  });
  it("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Approve").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});

describe("Can Perform Bulk Execution", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(2000);
    cy.contains("View");
  });
  it("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.wait(2000);
    cy.contains("Execute").click();
  });
  it("Shows Bulk Execution Modal", () => {
    cy.contains("Are you sure");
  });
  it("Successfully Bulk Executes", () => {
    cy.get(".confirm-btn").click();
    cy.wait(5000);
  });
  it("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});
