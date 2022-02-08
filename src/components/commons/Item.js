import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { red, green, yellow } from '@mui/material/colors';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrder,
  removeOrder,
} from '../../store/actions/app-actions-improved';
import AppModal from '../modal';
import { UpdateItemForm } from './redux-form/Form';
import { useSocketProps } from '../../hooks/use-socket-props';

const Item = ({ item, edit }) => {
  const attachSocketProps = useSocketProps();
  const available = item.available;
  const socket = useSelector(({ socketReducer }) => socketReducer.socket);
  const dispatch = useDispatch();
  const setAvailable = useState(available > 0)[1];
  const [open, setOpen] = useState(false);
  const onClick = edit
    ? {
        onClick: () => {
          setAvailable((prev) => {
            socket.emit(
              'ts-menu-item',
              attachSocketProps({
                type: prev ? 'MAKE_ITEM_UNAVAILABLE' : 'MAKE_ITEM_AVAILABLE',
                id: item.id,
              })
            );
            return !prev;
          });
        },
      }
    : {};

  const action = edit
    ? {
        action: (
          <IconButton onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>
        ),
      }
    : {};

  return (
    <>
      <AppModal open={open} onClose={() => setOpen(false)}>
        <UpdateItemForm initialValues={item} setOpen={setOpen} />
      </AppModal>
      <Card sx={{ m: 1, minWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor:
                  available <= 10
                    ? available === 0
                      ? red[500]
                      : yellow[500]
                    : green[500],
                cursor: 'pointer',
              }}
              aria-label="menu-item"
              {...onClick}
            >
              {item.iname.slice(0, 1)}
            </Avatar>
          }
          {...action}
          title={item.iname}
          subheader={`Price: Rs. ${item.price}, Available: ${available}`}
        />
        {!edit && (
          <CardContent>
            <Typography variant="h6" textAlign="center">
              {item.quantityOrdered}
            </Typography>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  onClick={() => {
                    dispatch(addOrder(item.id));
                    socket.emit(
                      'ts-menu-item',
                      attachSocketProps({
                        type: 'UPDATE_AVAILABLE',
                        id: item.id,
                        updateType: 'SUB',
                      })
                    );
                  }}
                  disabled={available === 0}
                >
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    dispatch(removeOrder(item.id));
                    socket.emit(
                      'ts-menu-item',
                      attachSocketProps({
                        type: 'UPDATE_AVAILABLE',
                        id: item.id,
                        updateType: 'ADD',
                      })
                    );
                  }}
                  disabled={item.quantityOrdered === 0}
                >
                  <RemoveIcon />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default Item;
