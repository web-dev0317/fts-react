import openSocket from 'socket.io-client';
import { reset_init } from '../../hooks/use-socket';

export const opSocket = (JWT, roomId) => {
  const socket = openSocket('http://localhost:8081');
  socket.emit('init', { token: JWT, roomId });
  return (dispatch) => {
    dispatch({
      type: 'OPEN_SOCKET',
      payload: socket,
    });
  };
};

export const closeSocket = () => {
  return (dispatch) => {
    reset_init();
    dispatch({
      type: 'CLOSE_SOCKET',
    });
  };
};

export const setRoomId = (roomId) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ROOM_ID',
      payload: roomId,
    });
  };
};
