describe("Logout", () => {
  beforeEach(() => {
    cy.login();
  });
  it("checks if the logout works", () => {
    cy.get("[data-cy=header-chevron-down]").click();
    cy.get("[data-cy=logout-popover-item]").click();
    cy.location("pathname").should("equal", "/login");
  });
});
