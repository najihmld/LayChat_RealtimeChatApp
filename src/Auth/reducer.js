const initialState = {
  data: [],
  isLoading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_USER_REJECT':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default auth;
