const initialState = {
  socket: null,
  roomId: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    case 'CLOSE_SOCKET':
      return {
        ...state,
        socket: null,
      };
    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
