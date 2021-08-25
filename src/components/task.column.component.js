import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import {Card, CardContent, CardHeader, Button, Typography} from '@material-ui/core';
import TaskCard from './task.card.component';
import {API} from 'services/api'

export default function TaskColumn({title, subheader, status}) {

  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get(`/task/status/${status}`).then((response) => {
      setList(response.data);
      console.log(response)
    }).catch(() => {
      enqueueSnackbar(`Não foi possível listar as tarefas em ${title}`, {variant: "error"});
    })
  }, [])

  return (
    <Card>
        <CardHeader
            title={title}
            subheader={subheader}
        />
        <CardContent>
          {list?.map((item) => (
            <TaskCard key={item.id} task={item} />
          ))}
        </CardContent>
    </Card>
  );
}
