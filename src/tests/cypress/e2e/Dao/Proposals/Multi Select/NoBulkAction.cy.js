describe("Does not attempt to bulk approve", () => {
  it.skip("Loads Proposals", () => {
    cy.bypassRegisteredUserAuth();
    cy.visit("/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it.skip("Can Sort by Needs Approval", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Approve").click();
  });
  it.skip("Shows alert that there are no qualifying proposals to approve", () => {
    cy.contains("Oops!");
  });
  it.skip("Can close alert", () => {
    cy.get(".ant-modal-close-x").click();
  });
});

describe("Does not attempt to bulk execute", () => {
  it.skip("Loads Proposals", () => {
    cy.visit("/dao/dx.io/proposals");
    cy.wait(5000);
    cy.contains("View");
  });
  it.skip("Can Sort by Needs Execution", () => {
    cy.contains("Multi Select").trigger("mouseover");
    cy.contains("Execute").click();
  });
  it.skip("Shows alert that there are no qualifying proposals to approve", () => {
    cy.contains("Oops!");
  });
  it.skip("Can close alert", () => {
    cy.get(".ant-modal-close-x").click();
  });
});
