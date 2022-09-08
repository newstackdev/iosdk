const uuid = () => Cypress._.random(0, 1e6);
const moodTitle = uuid();

describe("Upload text node", () => {
  it("Can Navigate to the upload Page", () => {
    cy.visit("/post-create");
  });
  it("Can select text node and fill out form values", () => {
    cy.get(".upload-text-node").click();
    cy.get("#basic_content").type("Test");
  });
  it("Shows mood grid", () => {
    cy.contains("Share").click();
    cy.get(".nl-mood-grid-row-three").should("exist");
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
    cy.get(".nl-post-img-wrapper > p").should("exist");
  });
});

describe("Upload image node", () => {
  it("Can upload image", () => {
    cy.visit("/post-create");
    cy.get(".ant-upload > input[type=file]").attachFile("UploadImage.jpg");
    cy.get("#basic_title > input").type("test");
    cy.contains("Share").click();
    cy.get(".nl-mood-grid-row-three", { timeout: 60000 }).should("exist");
    cy.contains(moodTitle).click();
    cy.contains("Save").click();
    cy.url().should("include", "/post");
    cy.get(".ant-image-img").should("exist");
  });
});

describe("Upload video node", () => {
  it("Can upload video", () => {
    cy.visit("/post-create");
    cy.get(".upload-video-node").click();
    cy.get(".ant-upload > input[type=file]").attachFile("Video.mp4");
    cy.get("#basic_title > input").type("test");
    cy.contains("Share").click();
    cy.get(".nl-mood-grid-row-three", { timeout: 60000 }).should("exist");
    cy.contains(moodTitle).click();
    cy.contains("Save").click();
    cy.url().should("include", "/post");
    cy.get(".nl-post-img-wrapper > video").should("exist");
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
    });
  });
});
