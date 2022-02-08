export const setAuthInfo = (JWT) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SIGNED_IN', payload: JWT });
  };
};

export const clearAuthInfo = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_MENU_ITEMS', menuItems: [] });
    dispatch({ type: 'SIGNED_OUT' });
  };
};
