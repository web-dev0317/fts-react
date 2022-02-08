import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {
  clearPlacedOrders,
  placeOrder,
} from '../../../store/actions/app-actions-improved';

const getOrderedMenuItemsAndTotal = (menuItems) => {
  const orderedMenuItems = menuItems.filter(
    (menuItem) => menuItem.quantityOrdered > 0
  );
  const total = orderedMenuItems.reduce(
    (total, orderedMenuItem) =>
      total + orderedMenuItem.price * orderedMenuItem.quantityOrdered,
    0
  );
  return [orderedMenuItems, total];
};

const getOrderMenuItemsPlacedAndTotal = (menuItems) => {
  const orderMenuItemsPlaced = menuItems.filter(
    (menuItem) => menuItem.placedOrderQuantity > 0
  );
  const total = orderMenuItemsPlaced.reduce(
    (total, placedOrder) =>
      total + placedOrder.placedOrderQuantity * placedOrder.price,
    0
  );
  return [orderMenuItemsPlaced, total];
};

export default function OrderGrid({ setOpen, placed }) {
  const dispatch = useDispatch();
  const menuItems = useSelector(({ appReducerImproved }) => appReducerImproved);

  let arr = [];
  let total = 0;

  if (placed) {
    const [orderMenuItemsPlaced, tot] =
      getOrderMenuItemsPlacedAndTotal(menuItems);
    arr = orderMenuItemsPlaced;
    total = tot;
  } else {
    const [orderedMenuItems, tot] = getOrderedMenuItemsAndTotal(menuItems);
    arr = orderedMenuItems;
    total = tot;
  }

  return (
    <>
      <Typography variant="h5" sx={{ m: 1, textAlign: 'center' }}>
        Total: Rs. {total}
      </Typography>
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        spacing={1}
      >
        {arr.map((i) => (
          <Grid item key={i.id}>
            <Card>
              <CardHeader
                title={i.iname}
                subheader={`Price: Rs. ${i.price}, Quantity ordered: ${
                  placed ? i.placedOrderQuantity : i.quantityOrdered
                }`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      {!placed ? (
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          color="secondary"
          onClick={() => {
            dispatch(placeOrder());
            setOpen(false);
          }}
          disabled={arr.length === 0}
        >
          Place order
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          color="secondary"
          onClick={() => {
            dispatch(clearPlacedOrders());
          }}
          disabled={arr.length === 0}
        >
          Clear
        </Button>
      )}
    </>
  );
}
