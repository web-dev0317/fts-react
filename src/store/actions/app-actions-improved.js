export const addItem = (menuItem) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    dispatch({ type: 'SET_MENU_ITEMS', menuItems: [...menuItems, menuItem] });
  };
};

export const removeItem = (id, menuItem) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    if (menuItem) {
      const menuItemsWithEditedItem = menuItems.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            ...menuItem,
          };
        }
        return i;
      });
      dispatch({ type: 'SET_MENU_ITEMS', menuItems: menuItemsWithEditedItem });
    } else {
      const filteredMenuItems = menuItems.filter(
        (menuItem) => menuItem.id !== id
      );
      dispatch({ type: 'SET_MENU_ITEMS', menuItems: filteredMenuItems });
    }
  };
};

export const makeItemAvailable = (id) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithItemMadeAvailable = menuItems.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          // should be a default value
          available: menuItem.normallyAvailableQty,
        };
      }
      return menuItem;
    });
    dispatch({
      type: 'SET_MENU_ITEMS',
      menuItems: menuItemsWithItemMadeAvailable,
    });
  };
};

export const makeItemUnavailable = (id) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithItemMadeUnavailable = menuItems.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          available: 0,
        };
      }
      return menuItem;
    });
    dispatch({
      type: 'SET_MENU_ITEMS',
      menuItems: menuItemsWithItemMadeUnavailable,
    });
  };
};

export const addOrder = (id) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithEditedItem = menuItems.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          quantityOrdered: menuItem.quantityOrdered + 1,
        };
      }
      return menuItem;
    });
    dispatch({ type: 'SET_MENU_ITEMS', menuItems: menuItemsWithEditedItem });
  };
};

export const removeOrder = (id) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithEditedItem = menuItems.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          quantityOrdered: menuItem.quantityOrdered - 1,
        };
      }
      return menuItem;
    });
    dispatch({ type: 'SET_MENU_ITEMS', menuItems: menuItemsWithEditedItem });
  };
};

export const placeOrder = () => {
  return async (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const JWT = getState().authReducer.JWT;
    const arrToDb = [];
    const menuItemsWithPlacedOrderQuantity = menuItems.map((menuItem) => {
      if (menuItem.quantityOrdered > 0) {
        let mi = {
          ...menuItem,
          quantityOrdered: 0,
          placedOrderQuantity:
            menuItem.placedOrderQuantity + menuItem.quantityOrdered,
        };
        let objToDb = {
          itemId: mi.id,
          iname: mi.name,
          quantityOrdered: mi.placedOrderQuantity,
        };
        arrToDb.push(objToDb);
        return mi;
      }
      return menuItem;
    });
    dispatch({
      type: 'SET_MENU_ITEMS',
      menuItems: menuItemsWithPlacedOrderQuantity,
    });
    await fetch('http://localhost:8080/place', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + JWT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arrToDb),
    });
  };
};

export const updateAvailable = (id, updateType) => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithAvailableUpdated = menuItems.map((menuItem) => {
      if (menuItem.id === id) {
        return {
          ...menuItem,
          available:
            updateType === 'ADD'
              ? menuItem.available + 1
              : menuItem.available - 1,
        };
      }
      return menuItem;
    });
    dispatch({
      type: 'SET_MENU_ITEMS',
      menuItems: menuItemsWithAvailableUpdated,
    });
  };
};

export const clearPlacedOrders = () => {
  return (dispatch, getState) => {
    const menuItems = getState().appReducerImproved;
    const menuItemsWithZPoQ = menuItems.map((menuItem) => {
      if (menuItem.placedOrderQuantity > 0) {
        return {
          ...menuItem,
          placedOrderQuantity: 0,
        };
      }
      return menuItem;
    });
    dispatch({
      type: 'SET_MENU_ITEMS',
      menuItems: menuItemsWithZPoQ,
    });
  };
};
