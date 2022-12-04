const reducer = (
  state = {
    firstName: "",
    lastName: "",
    id: "",
    email: "",
  },
  action
) => {
  //Object.assign(state, state)
  switch (action.type) {
    case "login":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.id,
        email: action.payload.email,
      };
    case "logout":
      return {
        ...state,
        firstName: "",
        lastName: "",
        id: "",
        email: "",
      };
    default:
      return state;
  }
};

export default reducer;
