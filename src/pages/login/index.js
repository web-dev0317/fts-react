import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useHttp } from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { setAuthInfo } from '../../store/actions/auth-actions';
import { setRoomId } from '../../store/actions/socket-actions';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ERR_MSG = 'Cannot be empty!';

let err = false;

const storeJwtLocal = (JWT, roomId) => {
  localStorage.setItem('JWT', JWT);
  localStorage.setItem('roomId', roomId);
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [cpasswordError, setCpasswordError] = useState(null);
  const { request, isLoading, error } = useHttp();

  const login = async (url, body) => {
    let data = null;
    if (url === '/login') {
      const base64Str = Buffer.from(
        body.email + ':' + body.password,
        'utf-8'
      ).toString('base64');
      data = await request({
        url,
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + base64Str,
        },
      });
    } else {
      data = await request({
        body,
        url,
        method: 'POST',
      });
    }
    const JWT = data && data.JWT;
    const roomId = data && data.roomId;
    if (JWT && roomId && !error) {
      storeJwtLocal(JWT, roomId);
      dispatch(setAuthInfo(JWT));
      dispatch(setRoomId(roomId));
      navigate('/menu');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setCpasswordError(null);
    err = false;
    let { username, email, password, cpassword } = e.currentTarget.elements;
    username = username && username.value;
    email = email.value;
    password = password.value;
    cpassword = cpassword && cpassword.value;
    if (!isLogin) {
      if (username.trim().length === 0) {
        err = true;
        setUsernameError(ERR_MSG);
      }
      if (cpassword.trim().length === 0) {
        err = err || true;
        setCpasswordError(ERR_MSG);
      } else if (cpassword.trim().localeCompare(password.trim()) !== 0) {
        err = err || true;
        setCpasswordError("Doesn't match");
      }
    }

    if (email.trim().length === 0) {
      err = err || true;
      setEmailError(ERR_MSG);
    } else if (!email.includes('@')) {
      err = err || true;
      setEmailError('Enter a valid email address');
    }
    if (password.trim().length < 8) {
      err = err || true;
      setPasswordError('Must be 8 characters long!');
    }

    if (!err) {
      if (isLogin) {
        login('/login', {
          email,
          password,
        });
      } else {
        login('/signup', {
          username,
          email,
          password,
        });
      }
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ mb: 2 }}
        color="secondary"
      >
        Login / Sign up
      </Typography>
      {error && (
        <Typography
          variant="caption"
          textAlign="center"
          color="error"
          display="block"
          sx={{ mb: 1 }}
        >
          {error}
        </Typography>
      )}
      <form
        style={{ textAlign: 'center' }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          spacing={2}
        >
          {!isLogin && (
            <Grid item>
              <TextField label="Username" id="username" variant="standard" />
              {usernameError && (
                <Typography variant="caption" color="error" display="block">
                  {usernameError}
                </Typography>
              )}
            </Grid>
          )}
          <Grid item>
            <TextField
              label="Email"
              id="email"
              variant="standard"
              type="email"
            />
            {emailError && (
              <Typography variant="caption" color="error" display="block">
                {emailError}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              id="password"
              variant="standard"
              type="password"
            />
            {passwordError && (
              <Typography variant="caption" color="error" display="block">
                {passwordError}
              </Typography>
            )}
          </Grid>
          {!isLogin && (
            <Grid item>
              <TextField
                label="Confirm password"
                id="cpassword"
                variant="standard"
                type="password"
              />
              {cpasswordError && (
                <Typography variant="caption" color="error" display="block">
                  {cpasswordError}
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
        <Grid
          container
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid item>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLogin ? 'Login' : 'Sign up'}
            </Button>
            {!isLoading && (
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', mt: 1 }}
                display="block"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}
