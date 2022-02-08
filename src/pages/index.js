import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddTaskIcon from '@mui/icons-material/AddTask';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import AddItemForm from './add';
import Items from './manage';
import UserMenuItems from './menu';
import Feedback from './feedback';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './login';
import { clearAuthInfo } from '../store/actions/auth-actions';
import { setRoomId } from '../store/actions/socket-actions';

const signedIn = [
  {
    name: 'Add item',
    icon: <AddTaskIcon />,
    path: '/add',
  },
  {
    name: 'Management console',
    icon: <ArtTrackIcon />,
    path: '/manage',
  },
  {
    name: 'Menu card',
    icon: <MenuBookIcon />,
    path: '/menu',
  },
  {
    name: 'Feedback',
    icon: <FeedbackIcon />,
    path: '/feedback',
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isSignedIn = useSelector(({ authReducer }) => authReducer.isSignedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname: path } = location;

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isSignedIn) {
      navigate(path);
    }
  }, [isSignedIn, navigate, path]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Food tracker by BW
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isSignedIn &&
            signedIn.map((obj) => (
              <ListItem
                button
                key={obj.name}
                onClick={() => navigate(obj.path)}
              >
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={obj.name} />
              </ListItem>
            ))}
          {isSignedIn && (
            <ListItem
              button
              onClick={() => {
                localStorage.removeItem('JWT');
                localStorage.removeItem('roomId');
                dispatch(clearAuthInfo());
                dispatch(setRoomId(null));
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          )}
          {!isSignedIn && (
            <>
              <ListItem button onClick={() => navigate('/feedback')}>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary={'Feedback'} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/login');
                }}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={'Log out'} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/feedback" element={<Feedback />} />
          {isSignedIn && (
            <>
              <Route path="/add" element={<AddItemForm />} />
              <Route path="/manage" element={<Items />} />
              <Route path="/menu" element={<UserMenuItems />} />
              <Route path="/*" element={<Navigate to="/menu" />} />
            </>
          )}
          {!isSignedIn && (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}
