import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Link } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Avatar, Box} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import { signOutWithFirebase } from 'Actions';
import {withRouter} from 'react-router-dom'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
      backgroundColor:'rgb(0, 151, 62)',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    textAlign:'center',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  backButton:{
    position:'relative',
    height: '100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 9999999,
    padding: 5,
  },
  backIcon:{
    fontSize: 30,
    color:'white',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  profile:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: 30,
      paddingTop: 30,
      flexDirection: 'column',
  }
}));

const SideBar = (props) => {

    const { title , backLink, history} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const signOut = () =>{
      dispatch(signOutWithFirebase(history))
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            {
                ( backLink !== null) &&
                <div className={classes.backButton}>
                    <Link to={backLink}>
                        <ArrowBackIcon className={classes.backIcon}/>
                    </Link>
                </div>
            }
          <Typography variant="h5" noWrap className={classes.title}>
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Box className={classes.profile}>
            <Avatar style={{color:'white', backgroundColor:'red'}}>{'N'}</Avatar>
            <Typography>username</Typography>
        </Box>
        <Divider />
        <List>

            <Link to="/">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItem>
            </Link>

            <Link to="/all-project">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'All Projects'} />
              </ListItem>
            </Link>

            <Link to="/my-project">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'My Projects'} />
              </ListItem>
            </Link>

            <Link to="/assigned-projects">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'Assigned Tasks'} />
              </ListItem>
            </Link>

            <Link to="/signed-off-task">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'Signed Off Tasks'} />
              </ListItem>
            </Link>

            <Link to="/approved-tasks">
              <ListItem button >
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={'Approved Task'} />
              </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
            <Link to="/add-project">
              <ListItem button >
                <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
                <ListItemText primary={'Add Project'} />
              </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
          <Link to="/my-profile">
            <ListItem button >
              <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
              <ListItemText primary={'My Profile'} />
            </ListItem>
          </Link>
            
          <ListItem button onClick={signOut}>
            <ListItemIcon><PowerSettingsNewIcon style={{color:'red'}} /></ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(SideBar);