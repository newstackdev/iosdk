describe("Does not attempt to bulk approve", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it("Can Sort by Needs Approval", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Approve").click();
  });
  it("Shows alert that there are no qualifying proposals to approve", () => {
    cy.contains("Oops!");
  });
  it("Can close alert", () => {
    cy.get(".ant-modal-close-x").click();
  });
});

describe("Does not attempt to bulk execute", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Execute").click();
  });
  it("Shows alert that there are no qualifying proposals to approve", () => {
    cy.contains("Oops!");
  });
  it("Can close alert", () => {
    cy.get(".ant-modal-close-x").click();
  });
});
