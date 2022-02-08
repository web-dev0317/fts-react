import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const Count = () => {
  const noOfMenuItems = useSelector(
    ({ appReducerImproved }) => appReducerImproved.length
  );

  return (
    <Typography
      variant="body1"
      display={'block'}
      textAlign={'center'}
      sx={{ m: 2 }}
    >
      Number of items in the menu: {noOfMenuItems}
    </Typography>
  );
};

export default Count;
