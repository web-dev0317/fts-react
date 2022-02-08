const menuItems = [
  // {
  //   id,
  //   iname,
  //   price,
  //   available,
  //   normallyAvailableQty,
  //   quantityOrdered,
  //   placedOrderQuantity,
  // },
];

const appReducerImproved = (state = menuItems, action) => {
  switch (action.type) {
    case 'SET_MENU_ITEMS':
      return action.menuItems;
    default:
      return state;
  }
};

export default appReducerImproved;
