import React, {useEffect, useState} from 'react';
import DefaultContext from '../../stores/defaultContext';
import { useSelector, useDispatch } from 'react-redux';
import {API} from '../../services/api';

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Card,
  CardContent
} from '@material-ui/core'
import CameraIcon from '@material-ui/icons/PhotoCamera';

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
  const tasksData = useSelector(state => state.task);
  const [taskList, setTaskList] = useState([]);

  // console.log(tasksData);

  // const handleAddTask = () => {
  //   dispatch({type: 'ADD_TASK', count: 1});
  // }

  // const handleRemoveTask = () => {
  //   dispatch({type: 'REMOVE_TASK', count: 1});
  // }

  useEffect(() => {
    API.get("/task/all").then((response) => {
      setTaskList(response.data);
      dispatch({type: 'ADD_TASK', count: response.data.length});
    })
  }, []);

  // useEffect(() => {
  //   console.log(tasksData);
  // }, [tasksData])
  
  return (
    <>
      
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon />
          <Typography variant="h6" color="inherit" noWrap>
            To do app
          </Typography>
        </Toolbar>
      </AppBar>

      {/* {tasksData.totalTasks}
      <Grid item xs={12}>
        <button onClick={() => handleAddTask()}>Add</button>
        <button onClick={() => handleRemoveTask()}>Remove</button>
      </Grid> */}

      <Container>
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
      </Container>
      
    </>
  );
}

export default Home;