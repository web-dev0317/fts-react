import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Field, reduxForm } from 'redux-form';
import MyTextField from './renderTextField';
import { validate } from './validation';
import { useSocketProps } from '../../../hooks/use-socket-props';

const Form = (props) => {
  const attachSocketProps = useSocketProps();
  const { handleSubmit, pristine, valid, submitting, reset } = props;
  const { initialValues } = props;
  const socket = useSelector(({ socketReducer }) => socketReducer.socket);

  function add(values) {
    const normallyAvailableQty = +values.normallyAvailableQty;
    socket.emit(
      'ts-menu-item',
      attachSocketProps({
        type: 'ADD',
        menuItem: {
          ...values,
          normallyAvailableQty,
          available: normallyAvailableQty,
          price: +values.price,
          quantityOrdered: 0,
          placedOrderQuantity: 0,
        },
      })
    );
    reset();
  }

  const update = (values) => {
    socket.emit(
      'ts-menu-item',
      attachSocketProps({
        type: 'REMOVE',
        id: initialValues.id,
        menuItem: {
          iname: values.iname,
          price: +values.price,
          available: +values.available,
          // for ease of update in db
          quantityOrdered: initialValues.quantityOrdered,
          placedOrderQuantity: initialValues.placedOrderQuantity,
          normallyAvailableQty: initialValues.normallyAvailableQty,
        },
      })
    );
    props.setOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(initialValues ? update : add)}
      autoComplete="off"
    >
      <Grid container flexWrap="wrap" justifyContent="center" spacing={2}>
        <Grid item>
          <Field
            name="iname"
            component={MyTextField}
            label="Item name"
            type="text"
            value={initialValues && initialValues.iname}
          />
        </Grid>
        <Grid item>
          <Field
            name="price"
            component={MyTextField}
            label="Price"
            type="number"
            value={initialValues && initialValues.price}
          />
        </Grid>
        <Grid item>
          <Field
            name={initialValues ? 'available' : 'normallyAvailableQty'}
            component={MyTextField}
            label={initialValues ? 'Available' : 'Normally available quantity'}
            type="number"
            value={initialValues && initialValues.available}
          />
        </Grid>
      </Grid>
      <Grid
        container
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            disabled={pristine || !valid || submitting}
          >
            {initialValues ? 'Update' : 'Add'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="button"
            variant="contained"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset
          </Button>
        </Grid>
        {initialValues && (
          <Grid item>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                socket.emit(
                  'ts-menu-item',
                  attachSocketProps({
                    type: 'REMOVE',
                    id: initialValues.id,
                  })
                );
                props.setOpen(false);
              }}
            >
              Remove
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export const UpdateItemForm = reduxForm({
  form: 'menu-item-update-form',
  validate,
})(Form);

export default reduxForm({
  form: 'menu-item-add-form',
  validate,
})(Form);
