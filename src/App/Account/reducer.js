const initialState = {
  userData: [],
  isRejected: false,
  isFulfilled: false
};

//Insert initial state
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.payload
      };

    default:
      return state;
  }
};

export default user;
