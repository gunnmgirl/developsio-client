Cypress.Commands.add("login", () => {
  localStorage.clear();
  cy.visit("http://localhost:3000");
  cy.request("POST", "http://localhost:4000/auth/login", {
    email: "lara@gmail.com",
    password: "135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4",
  }).then((response) => {
    const { token, me } = response.body;
    localStorage.setItem("token", token);
    cy.window()
      .its("store")
      .then((store) => store.dispatch({ type: "LOGIN_SUCCESS", payload: me }));
  });
});
