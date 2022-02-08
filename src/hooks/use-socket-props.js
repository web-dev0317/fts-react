import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useSocketProps = () => {
  const roomId = useSelector(({ socketReducer }) => socketReducer.roomId);
  const token = useSelector(({ authReducer }) => authReducer.JWT);

  const attachSocketProps = useCallback(
    (action) => {
      if (roomId && token) {
        return {
          ...action,
          roomId,
          token,
        };
      }
      return action;
    },
    [roomId, token]
  );

  return attachSocketProps;
};
