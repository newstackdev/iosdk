describe("Can Perform Bulk Approval", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it("Can Sort by Needs Approval", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Approve").click();
  });
  it("Shows Bulk Approve Modal", () => {
    cy.contains("Are you sure");
  });
  it("Successfully Bulk Approves", () => {
    cy.contains("0") ? cy.get(".ant-modal-close-x").click() : cy.get(".confirm-btn").click();
  });
  it("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Approval").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});

describe("Can Perform Bulk Execution", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it("Can Sort by Needs Approval", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Execute").click();
  });
  it("Shows Bulk Approve Modal", () => {
    cy.contains("Are you sure");
  });
  it("Successfully Bulk Executes", () => {
    cy.contains("0") ? cy.get(".ant-modal-close-x").click() : cy.get(".confirm-btn").click();
  });
  it("Cleared The Proposals Needing Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
    cy.get(".toggle-wrapper").should("be.empty");
  });
});
