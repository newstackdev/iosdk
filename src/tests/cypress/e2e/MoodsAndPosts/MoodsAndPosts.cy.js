const uuid = () => Cypress._.random(0, 1e6);
const moodTitle = uuid();

describe("Upload node", () => {
  it("Can Navigate to the upload Page", () => {
    cy.visit("/post-create", { timeout: 50000 });
  });
  it("Can select text node and fill out form values", () => {
    cy.get(".upload-image-node").click();
    cy.get("#basic_content").type("Test");
  });
  it("Shows mood grid", () => {
    cy.contains("Share").click();
    cy.get(".nl-mood-grid-row-three", { timeout: 30000 }).should("exist");
  });
  it("Can create mood", () => {
    cy.get("#add-folder-button").click();
    cy.get("#mood-create-title").type(moodTitle);
    cy.get("#mood-create-description").type("test");
    cy.get("#mood-create-submit").click();
  });
  it("Selects mood and save node in the mood", () => {
    cy.contains(moodTitle).click();
    cy.contains("Save").click();
  });
  it("Should redirect to the post that was saved in the mood", () => {
    cy.url().should("include", "/post");
  });
});

describe("Creation of moods and post votings scenarios", () => {
  it("Can Navigate to the explore Page", () => {
    cy.visit("/explore");
  });
  it("Can select a spotlighted post from explore page", () => {
    cy.get(".swiper-slide-active").click();
  });
  it("Can vote < 100% and move on to another post", () => {
    cy.url().then((url) => {
      cy.get(".nl-post-img-wrapper").trigger("mousedown", { force: true });
      cy.wait(1000);
      cy.get(".nl-post-img-wrapper").trigger("mouseup", { force: true });
      cy.wait(1000);
      cy.url().should("not.eq", url);
    });
  });
  it("Can vote 100% and stay on same post to select mood", () => {
    cy.url().then((url) => {
      cy.get(".nl-post-img-wrapper").trigger("mousedown", { force: true });
      // cy.get(".nl-rating-bar").should("have.css", "width", "100vw");
      cy.wait(5000);
      cy.get(".nl-post-img-wrapper").trigger("mouseup", { force: true });
      cy.wait(1000);
      cy.url().should("eq", url);
    });
  });
  it("Can select mood and share the post that got 100% on the vote and move on to another post", () => {
    cy.url().then((url) => {
      cy.get(".nl-mood-grid-row-three").should("exist");
      cy.contains(moodTitle).click();
      cy.contains("Share").click();
      cy.wait(1000);
      cy.url().should("not.eq", url);
      // cy.visit(url.substring(0, url.lastIndexOf("/")));
    });
  });
  // it("Can switch moods when voting on the last post in the mood", () => {
  //   cy.
  // });
});
