import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import {Card, CardContent, CardHeader, Tooltip, IconButton} from '@material-ui/core';
import TaskCard from './task.card.component';
import {API} from 'services/api';

import ControlPointIcon from '@material-ui/icons/ControlPoint';

export default function TaskColumn({title, subheader = 'Total: ', status}) {

  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);

  const handleNewTask = () => {
    dispatch({type: 'ADD_TASK', status: status});
    history.push("/tasks/new");
  }

  useEffect(() => {
    API.get(`/task/status/${status}`).then((response) => {
      setList(response.data);
      console.log(response)
    }).catch(() => {
      enqueueSnackbar(`Não foi possível listar as tarefas em ${title}`, {variant: "error"});
    })
  }, [])

  return (
    <Card style={{height: "80%"}}>
        <CardHeader
          title={title}
          subheader={`${subheader} ${list.length}`}
          action={
            <Tooltip title="Cadastrar nova tarefa">
                <IconButton aria-label="settings" variant="outlined" color="primary" onClick={() => handleNewTask()}>
                    <ControlPointIcon />
                </IconButton>
            </Tooltip>
        }
        />
        <CardContent style={{maxHeight: '80%', overflowX: 'hidden', overFlowY: 'auto'}}>
          {list?.map((item) => (
            <TaskCard key={item.id} task={item} />
          ))}
        </CardContent>
    </Card>
  );
}
