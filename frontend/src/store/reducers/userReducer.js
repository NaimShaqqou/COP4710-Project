const reducer = (
  state = {
    firstName: "",
    lastName: "",
    id: "",
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
      };
    case "logout":
      return {
        ...state,
        firstName: "",
        lastName: "",
        id: "",
      };
    default:
      return state;
  }
};

export default reducer;
