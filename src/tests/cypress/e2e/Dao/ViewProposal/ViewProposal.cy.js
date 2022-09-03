beforeEach(() => {
  cy.visit("/dao/dx.io/proposals", { timeout: 500000 });
});

describe("Can Vote", () => {
  it("Can Sort by Needs Votes", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Votes").click({ timeout: 500000 });
  });
  it("Can Visit an individual Proposal from the DAO", () => {
    cy.contains("View", { timeout: 500000 }).click();
    cy.url().should("include", "/proposal");
  });
  it("Can See The Status Tag", () => {
   cy.contains("Starting")
  });
  it("Can See The Action Tag", () => {
    cy.contains("View")
  });
  // it("Can Perform All Actions on Vote Modal", () => {
  //   cy.contains("YES").click();
  //   cy.get("#vote-proposal-form_quantity").type(1);
  //   cy.get("#vote-lock-btn").click();
  //   cy.get("#vote-confirm-btn").click();
  //   cy.get("#vote-submit-btn").click();
  // });
});
