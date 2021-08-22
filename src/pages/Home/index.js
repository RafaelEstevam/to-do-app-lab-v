import React, {useEffect, useState} from 'react';
import DefaultContext from '../../stores/defaultContext';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {API} from '../../services/api';

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  Drawer, 
  List,
  ListItem,
  Divider
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function TaskCount({flag, status}){

  const total = useSelector(state => state.task[flag]);

  return (
    <div style={{marginLeft: '10px'}}>
      {`${status}: ${total}`}
    </div>
  )
}

function ProgressBar({progress}){
  return (
    <div>{progress}</div>
  )
}

function Task({name, category, description, progress, status}) {
  return (
    <Card>
      <Typography>{name}</Typography>
      <Typography>{category}</Typography>
      <Typography>{description}</Typography>
      <ProgressBar progress={progress}/>
    </Card>
  )
}

function CardCount ({flag, status}) {

  const total = useSelector(state => state.task[flag]);

  return (
    <Card>
      <CardContent>
        <Typography>{status}</Typography>
        <Typography>{total}</Typography>
      </CardContent>
    </Card>
  )
}

function Home() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const tasksData = useSelector(state => state.task);
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // console.log(tasksData);

  // const handleAddTask = () => {
  //   dispatch({type: 'ADD_TASK', count: 1});
  // }

  // const handleRemoveTask = () => {
  //   dispatch({type: 'REMOVE_TASK', count: 1});
  // }

  useEffect(() => {
    try{
      API.get("/task/all").then((response) => {
        setTaskList(response.data);
        dispatch({type: 'ADD_TASK', count: response.data.length});
      })
    }catch(e){
      console.log(e);
    }
    
  }, []);

  return (
    <>
      {/* <AppBar position="relative">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <div>
            <Typography variant="h6" color="inherit" noWrap>
              To do app
            </Typography>
          </div>
          
          <div style={{display: 'flex'}}>
            <TaskCount flag={'totalTasks'} status="Total" />
            <TaskCount flag={'toDoTasks'} status="To Do"/>
            <TaskCount flag={'doingTasks'} status="Doing"/>
            <TaskCount flag={'finishTasks'} status="Finish"/>
          </div>
          <Button color="default" variant="outlined">+ ADD Task</Button>
        </Toolbar>
      </AppBar> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>

      {/* {tasksData.totalTasks}
      <Grid item xs={12}>
        <button onClick={() => handleAddTask()}>Add</button>
        <button onClick={() => handleRemoveTask()}>Remove</button>
      </Grid> */}

      {/* <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CardCount flag={'totalTasks'} />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardCount flag={'toDoTasks'} total={tasksData.toDoTasks} />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardCount flag={'doingTasks'} total={tasksData.doingTasks} />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardCount flag={'finishTasks'} total={tasksData.finishTasks} />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={3}>
          {taskList?.map((item) => (
            <Grid item xs={2}>
              <Task name={item.title} />
            </Grid>
          ))}
        </Grid>
      </Container> */}

    </>
  );
}

export default Home;