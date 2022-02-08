const initialState = {
  isSignedIn: false,
  JWT: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return {
        ...state,
        isSignedIn: true,
        JWT: action.payload,
      };
    case 'SIGNED_OUT':
      return {
        ...state,
        isSignedIn: false,
        JWT: null,
      };
    default:
      return state;
  }
};

export default authReducer;
