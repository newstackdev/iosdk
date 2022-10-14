const uuid = () => Cypress._.random(0, 1e6);
const text = uuid();

describe("Edit profile", () => {
  before(() => {
    cy.bypassRegisteredUserAuth();
  });
  it("Can Navigate to update profile page", () => {
    cy.visit("/my/profile/update");
  });

  it("Should fillout active inputs", () => {
    cy.get(".nl-userUpdate-social-input input")
      .not(".nl-social-input-verified")
      .each((el) => cy.wrap(el).type("{selectall}{backspace}").type(text));

    cy.get("#basic_displayName").type("{selectall}{backspace}").type(text);
    cy.get("#basic_description").type("{selectall}{backspace}").type(text);
    cy.get("#basic_website").type("{selectall}{backspace}").type(text);
  });
  it("Should upload profile picture", () => {
    cy.get(".ant-upload > input[type=file]").attachFile("UploadImage.jpg");
  });
  it("Should save and redirect to user profile", () => {
    cy.contains("Save").click();
  });
  it("Should contain changes in profile", () => {
    cy.wait(3000);
    cy.get(".nl-userProfile-editBtn").click();
    cy.url().should("include", "/my/profile/update");
    cy.get(".nl-userUpdate-social-input input")
      .not(".nl-social-input-verified")
      .each((el) => cy.wrap(el).should("have.value", text));
    cy.get("#basic_displayName").should("have.value", text);
    cy.get("#basic_description").should("have.value", text);
    cy.get("#basic_website").should("have.value", text);
  });
  it("Should have a profile picture preview", () => {
    cy.get(".upload-profile-update-placeholder-img").should("exist");
  });
  it("Should be able to sign out", () => {
    cy.contains("Sign Out").click();
    cy.get(".nl-onboarding-title").should("exist");
  });
});
