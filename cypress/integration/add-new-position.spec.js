describe("Adding new position", () => {
  beforeEach(() => {
    s;
    cy.login();
    cy.get("[data-cy=positions-nav-link]").click();
  });
  it("checks if the name is a required field", () => {
    cy.get("[data-cy=add-job-position]").click();
    cy.get("[data-cy=add-position-button]").click();
    cy.get("[data-cy=error-message]").contains("Name is required!");
  });
});
