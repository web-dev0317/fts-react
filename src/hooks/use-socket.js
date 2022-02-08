import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  makeItemAvailable,
  makeItemUnavailable,
  removeItem,
  updateAvailable,
} from '../store/actions/app-actions-improved';
import { closeSocket, opSocket } from '../store/actions/socket-actions';

let open_init = true;
let close_init = false;

const SET_MENU_ITEMS = 'SET_MENU_ITEMS';

export const reset_init = () => {
  open_init = true;
  close_init = false;
};

export const useSocket = () => {
  const { socket, roomId } = useSelector(({ socketReducer }) => {
    return {
      socket: socketReducer.socket,
      roomId: socketReducer.roomId,
    };
  });
  const { isSignedIn, JWT } = useSelector(({ authReducer }) => {
    return {
      isSignedIn: authReducer.isSignedIn,
      JWT: authReducer.JWT,
    };
  });
  const dispatch = useDispatch();

  const doStuff = useCallback(
    (action) => {
      switch (action.type) {
        case 'ADD':
          dispatch(addItem(action.menuItem));
          break;
        case 'REMOVE':
          dispatch(removeItem(action.id, action.menuItem));
          break;
        case 'MAKE_ITEM_AVAILABLE':
          dispatch(makeItemAvailable(action.id));
          break;
        case 'MAKE_ITEM_UNAVAILABLE':
          dispatch(makeItemUnavailable(action.id));
          break;
        case 'UPDATE_AVAILABLE':
          dispatch(updateAvailable(action.id, action.updateType));
          break;
        // for initializing data
        case SET_MENU_ITEMS:
          dispatch({ type: SET_MENU_ITEMS, menuItems: action.menuItems });
          break;
        default:
          return;
      }
    },
    [dispatch]
  );

  const removeSocketListeners = useCallback(() => {
    if (socket) {
      socket.removeAllListeners();
    }
  }, [socket]);

  useEffect(() => {
    if (isSignedIn && JWT && roomId && open_init) {
      dispatch(opSocket(JWT, roomId));
      open_init = false;
      close_init = true;
    }
    if (!isSignedIn && close_init) {
      removeSocketListeners();
      dispatch(closeSocket());
      close_init = false;
    }
  }, [isSignedIn, JWT, roomId, dispatch, removeSocketListeners]);

  useEffect(() => {
    if (isSignedIn && socket) {
      socket.on('menu-item', doStuff);
    }
    return () => {
      removeSocketListeners();
    };
  }, [socket, doStuff, isSignedIn, removeSocketListeners]);
};
