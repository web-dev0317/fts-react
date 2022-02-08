import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthInfo } from '../store/actions/auth-actions';
import { setRoomId } from '../store/actions/socket-actions';

let init = true;

export const useValuesFromLS = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (init) {
      const jwt = localStorage.getItem('JWT');
      const roomId = localStorage.getItem('roomId');
      if (jwt && roomId) {
        dispatch(setAuthInfo(jwt));
        dispatch(setRoomId(roomId));
      }
      init = false;
    }
  }, [dispatch]);
};
