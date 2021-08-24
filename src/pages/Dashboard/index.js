import React, { useEffect, useState } from 'react';
import DefaultContext from '../../stores/defaultContext';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { API } from '../../services/api';

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Box,
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

function TaskCount({ flag, status }) {

  const total = useSelector(state => state.task[flag]);

  return (
    <div style={{ marginLeft: '10px' }}>
      {`${status}: ${total}`}
    </div>
  )
}

function ProgressBar({ progress }) {
  return (
    <div>{progress}</div>
  )
}

function Task({ name, category, description, progress, status }) {
  return (
    <Card>
      <Typography>{name}</Typography>
      <Typography>{category}</Typography>
      <Typography>{description}</Typography>
      <ProgressBar progress={progress} />
    </Card>
  )
}

function CardCount({ flag, status }) {

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
  const tasksData = useSelector(state => state.task);
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = React.useState(false);
 
  // console.log(tasksData);

  // const handleAddTask = () => {
  //   dispatch({type: 'ADD_TASK', count: 1});
  // }

  // const handleRemoveTask = () => {
  //   dispatch({type: 'REMOVE_TASK', count: 1});
  // }

  useEffect(() => {
    try {
      API.get("/task/all").then((response) => {
        setTaskList(response.data);
        dispatch({ type: 'ADD_TASK', count: response.data.length });
      })
    } catch (e) {
      console.log(e);
    }

  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              Teste
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              Teste
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              Teste
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              Teste
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <AppBar position="relative">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <div> <Typography variant="h6" color="inherit" noWrap>   To do app </Typography>
          </div>
          
          <div style={{display: 'flex'}}> <TaskCount flag={'totalTasks'} status="Total" /> <TaskCount flag={'toDoTasks'} status="To Do"/> <TaskCount flag={'doingTasks'} status="Doing"/> <TaskCount flag={'finishTasks'} status="Finish"/>
          </div>
          <Button color="default" variant="outlined">+ ADD Task</Button>
        </Toolbar>
      </AppBar> */}

      {/* {tasksData.totalTasks}
      <Grid item xs={12}>
        <button onClick={() => handleAddTask()}>Add</button>
        <button onClick={() => handleRemoveTask()}>Remove</button>
      </Grid> */}

      {/* <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}> <CardCount flag={'totalTasks'} />
          </Grid>
          <Grid item xs={12} md={3}> <CardCount flag={'toDoTasks'} total={tasksData.toDoTasks} />
          </Grid>
          <Grid item xs={12} md={3}> <CardCount flag={'doingTasks'} total={tasksData.doingTasks} />
          </Grid>
          <Grid item xs={12} md={3}> <CardCount flag={'finishTasks'} total={tasksData.finishTasks} />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={3}>
          {taskList?.map((item) => ( <Grid item xs={2}>   <Task name={item.title} /> </Grid>
          ))}
        </Grid>
      </Container> */}

    </>
  );
}

export default Home;