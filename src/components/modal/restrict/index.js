import AppModal from '..';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { mpassword } from '../../../consts/mpassword';
import { useNavigate } from 'react-router-dom';

export default function Restrict(props) {
  const navigate = useNavigate();

  return (
    <AppModal open={props.restrict}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const pass = e.currentTarget.elements.mpassword.value;
          if (pass === mpassword) {
            props.setRestrict(false);
          }
        }}
        style={{ textAlign: 'center' }}
      >
        <TextField label="Password" id="mpassword" variant="outlined" />
      </form>
      <Typography
        variant="body2"
        color="secondary"
        textAlign="center"
        sx={{ cursor: 'pointer', mt: 1 }}
        onClick={() => navigate('/menu')}
      >
        Go to menu
      </Typography>
    </AppModal>
  );
}
