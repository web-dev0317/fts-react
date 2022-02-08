import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const MyTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <>
    <TextField
      label={label}
      variant="outlined"
      {...input}
      {...custom}
      id={input.name}
    />
    {touched && error && (
      <Typography
        variant="caption"
        display="block"
        textAlign="center"
        color="error"
      >
        {error}
      </Typography>
    )}
  </>
);

export default MyTextField;
