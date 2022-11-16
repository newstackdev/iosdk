describe("Can Perform All Sorts", () => {
  it.skip("Loads Proposals", () => {
    cy.bypassRegisteredUserAuth();
    cy.visit("/dao/dx.io/proposals");
    cy.contains("View");
  });
  it.skip("Can Sort by Needs Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Approval").click();
  });
  it.skip("Can Sort by Needs Execution", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
  });
  it.skip("Can Sort by Needs Votes", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Votes").click();
  });
  it.skip("Can Sort by Expired", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Expired").click();
  });
  it.skip("Can Sort by Me", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("By Me").click();
  });
  it.skip("Can Sort by Others", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Others").click();
  });
  it.skip("Can Sort by See All", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("See All").click();
  });
});
