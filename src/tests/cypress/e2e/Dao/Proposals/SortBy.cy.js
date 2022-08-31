describe("Can Perform All Sorts", () => {
  it("Loads Proposals", () => {
    cy.visit("http://localhost:3000/dao/dx.io/proposals");
    cy.contains("View");
  });
  it("Can Sort by Needs Approval", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Approval").click();
  });
  it("Can Sort by Needs Execution", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Execution").click();
  });
  it("Can Sort by Needs Votes", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Votes").click();
  });
  it("Can Sort by Expired", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Expired").click();
  });
  it("Can Sort by Me", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("By Me").click();
  });
  it("Can Sort by Others", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("Others").click();
  });
  it("Can Sort by See All", () => {
    cy.contains("Sort By").trigger("mouseover");
    cy.contains("See All").click();
  });
});
