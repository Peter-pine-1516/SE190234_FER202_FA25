export const initialUserState = {
    users: [],
    displayedUsers: [],
    isLoading: false,
    error: null,
};


export const userReducer = (state, action) => {
    switch (action.type) {
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "SET_USERS":
        return {
          ...state,
          users: action.payload,
          displayedUsers: action.payload,
          isLoading: false,
          error: null,
        };

      case "UPDATE_USER_STATUS":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id
              ? { ...user, status: action.payload.status }
              : user
          ),
          displayedUsers: state.displayedUsers.map((user) =>
            user.id === action.payload.id
              ? { ...user, status: action.payload.status }
              : user
          ),
          isLoading: false,
          error: null,
        };
      case "SET_ERROR":
        return { ...state, error: action.payload, isLoading: false };
      case "SET_FILTERED_USERS":
        return { ...state, displayedUsers: action.payload };
      case "CLEAR_FILTERS":
        return { ...state, displayedUsers: state.users };
      default:
        return state;
    }
}
