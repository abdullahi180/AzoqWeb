import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  userMistakes: [],
  sucessfulPassReset: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SUCESSFUL_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        userMistakes: [],
      };

    case userTypes.SUCESSFUL_PASS_RESET:
      return {
        ...state,
        sucessfulPassReset: action.payload,
      };

    case userTypes.USER_MISTAKE:
      return {
        ...state,
        userMistakes: action.payload,
      };

    case userTypes.RESET_USER:
    case userTypes.SUCESSFUL_LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
