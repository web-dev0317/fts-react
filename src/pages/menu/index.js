import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Item from '../../components/commons/Item';
import AppModal from '../../components/modal';
import OrderGrid from '../../components/menu/commons/OrderGrid';
import { useState } from 'react';

export default function UserMenuItems() {
  const menuItems = useSelector(({ appReducerImproved }) => appReducerImproved);
  const [open, setOpen] = useState(false);
  const [poIsOpen, setPoIsOpen] = useState(false);

  return (
    <>
      <AppModal open={open} onClose={() => setOpen(false)}>
        <OrderGrid placed={poIsOpen} setOpen={setOpen} />
      </AppModal>
      <AppModal open={poIsOpen} onClose={() => setPoIsOpen(false)}>
        <OrderGrid placed setOpen={setPoIsOpen} />
      </AppModal>
      <Typography variant="h5">Menu</Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => setOpen(true)}>View orders</Button>
        <Button
          onClick={() => {
            setOpen(false);
            setPoIsOpen(true);
          }}
        >
          Placed orders
        </Button>
      </Container>
      <Grid container justifyContent="center" flexWrap="wrap" sx={{ m: 2 }}>
        {menuItems.map((item) => (
          <Grid item key={item.id}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
