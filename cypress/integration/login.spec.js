describe("The login flow", () => {
  it("does not work with wrong password", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=login-email-input]").type("faith@gmail.com");
    cy.get("[data-cy=login-password-input]").type("password1");
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=error-message]").contains("You entered a wrong password!");
    cy.location("pathname").should("equal", "/");
  });

  it("does not work with wrong email", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=login-email-input]").type("faith1@gmail.com");
    cy.get("[data-cy=login-password-input]").type("password");
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=error-message]").contains(
      "Admin with that email does not exist!"
    );
    cy.location("pathname").should("equal", "/");
  });

  it("happy path", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=login-email-input]").type("faith@gmail.com");
    cy.get("[data-cy=login-password-input]").type("password");
    cy.get("[data-cy=login-button]").click();
    cy.location("pathname").should("equal", "/people");
    cy.get("[data-cy=people-main-container]").should("be.visible");
  });
});
