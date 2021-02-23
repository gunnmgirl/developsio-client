export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_THEME":
      return {
        theme: "dark",
      };
    case "TOGGLE_LIGHT_THEME":
      return {
        theme: "light",
      };
    default:
      return { ...state };
  }
};
