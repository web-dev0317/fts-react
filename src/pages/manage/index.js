import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Item from '../../components/commons/Item';
import { useState } from 'react';
import Restrict from '../../components/modal/restrict';

export default function Items() {
  const menuItems = useSelector(({ appReducerImproved }) => appReducerImproved);
  const [restrict, setRestrict] = useState(true);

  return (
    <>
      <Restrict restrict={restrict} setRestrict={setRestrict} />
      <Typography variant="h5">Manage menu</Typography>
      <Typography variant="body2" sx={{ mt: 1 }} color="primary">
        Edit item / Reset Quantity / Remove item
      </Typography>
      <Grid container justifyContent="center" flexWrap="wrap" sx={{ m: 2 }}>
        {menuItems.map((item) => (
          <Grid item key={item.id}>
            <Item item={item} edit />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
