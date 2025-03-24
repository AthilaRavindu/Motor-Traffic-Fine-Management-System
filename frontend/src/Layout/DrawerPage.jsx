import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar, Button, Stack } from '@mui/material';
import COLORS from '../utils/Colors';
import profile from '../assets/Drawer/logo.png';
import { Outlet, useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CommentIcon from '@mui/icons-material/Comment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';


const drawerMenu = [
  { name: 'Dashboard', icon: <GridViewIcon />, path: '/dashbord' },
  { name: 'Users', icon: <GroupsIcon />, path: '/userManagement' },
  { name: 'Fines', icon: <RuleIcon />, path: '/finesManagement' },
  { name: 'Payment', icon: <PaymentsIcon />, path: '/analyze' },
  { name: 'Settting', icon: <SettingsIcon />, path: '/add/student' },
  
];

const userDrawerMenu = [
  { name: 'Dashboard', icon: <GridViewIcon />, path: '/civilUserDash' },
  { name: 'Payment', icon: <PaymentsIcon />, path: '/analyze' },
  
];

const policeOfficerDrawerMenu = [
  { name: 'Dashboard', icon: <GridViewIcon />, path: '/dashbord-police-officer' },
  { name: 'Fines', icon: <RuleIcon />, path: '/finesManagement' },  
];

const drawerWidth = 320;

const DrawerPage = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedDrawer, setSelectedDrawer] = React.useState([] || JSON.parse(localStorage.getItem('selectedDrawer')));


  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const logOutHandle = ()=>{ localStorage.clear(); navigate('/')}



  React.useEffect(() => {
    const accountType = localStorage.getItem('isAdmin');

    if (accountType === 'true') {
      setSelectedDrawer(drawerMenu);  
    } else if (accountType === 'PoliceOfficer') {
      setSelectedDrawer(policeOfficerDrawerMenu); 
    } else {
      setSelectedDrawer(userDrawerMenu); 
    }
  }, []);

  localStorage.setItem('selectedDrawer', JSON.stringify(selectedDrawer));




  const drawer = (
    <div style={{ backgroundColor: COLORS.bgBlue, height: '100%' }}>
      <Toolbar sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            border: `1px solid ${COLORS.white}`,
            borderRadius: '100%',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={profile}
            sx={{ width: { xs: '20px', md: '100px' }, height: { xs: '20px', md: '100px' } }}
          />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {selectedDrawer.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton
              sx={{
                bgcolor: COLORS.lightBlue,
                mb: 2,
                borderRadius: '20px',
                color: COLORS.black,
                px: 5,
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '20px',
                    fontWeight: 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button sx={{bgcolor:'red', color:'white'}} onClick = {()=>logOutHandle()}>Log Out</Button>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ bgcolor: COLORS.white, width: '100%' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color:COLORS.bgBlue }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={'row'} spacing={2}>
            <Box sx={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              height: '45px'
            }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <IconButton>
                  <NotificationsActiveIcon />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton>
                <IconButton>
                  <CurrencyExchangeIcon />
                </IconButton>
              </Stack>

            
            </Box>
            <Box sx={{
              px:2,
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              height: '45px'
            }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={4}
                
              >
                <Box>
                  <Avatar/>
                </Box>
                <Box>
                  <Typography sx={{
                    color:COLORS.black,
                    textAlign:'left'
                  }}>Lahiru</Typography>
                </Box>
              </Stack>

            
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth - 30 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

DrawerPage.propTypes = {
  window: PropTypes.func,
};

export default DrawerPage;
