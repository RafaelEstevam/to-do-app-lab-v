import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, Button, Typography} from '@material-ui/core';
import TaskCard from './task.card.component';

export default function TaskColumn({title, subheader}) {
  return (
    <Card>
        <CardHeader
            title={title}
            subheader={subheader}
        />
        <CardContent>
            <TaskCard />
        </CardContent>
    </Card>
  );
}
