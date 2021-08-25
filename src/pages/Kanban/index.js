import react, {useEffect, useState} from 'react';
import {Grid, Card, CardHeader, CardContent} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from 'components/task.column.component';

const Kanban = () => {

    const token = useSelector(state => state.token);
    const decode = useSelector(state => state.decode);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <TaskColumn title="To do" status="To do" />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="In progress" status="In progress" />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Blocked" status="Blocked" />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Finish" status="Finished" />
            </Grid>
        </Grid>
    )
}

export default Kanban;