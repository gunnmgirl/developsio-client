describe("Adding new note", () => {
  beforeEach(() => {
    cy.login();
    cy.get("[data-cy=notes-nav-link]").click();
  });
  it("checks if the title is a required field", () => {
    cy.get("[data-cy=add-new-note]").click();
    cy.get("[data-cy=add-new-note-button]").click();
    cy.get("[data-cy=error-message]").contains("Title is required!");
  });
});
