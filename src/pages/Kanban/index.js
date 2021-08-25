import react from 'react';
import {Grid, Card, CardHeader, CardContent} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from 'components/task.column.component';
import { decodeToken } from 'services/api';

const Kanban = () => {

    const token = useSelector(state => state.token);
    const decode = useSelector(state => state.decode);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <TaskColumn title="To do" subheader="Total: " />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="In progress" subheader="Total: " />
            </Grid>
            <Grid item xs={12} md={3}>
             <TaskColumn title="Finish" subheader="Total: " />
            </Grid>
            <Grid item xs={12} md={3}>
                <TaskColumn title="Finish" subheader="Total: " />
            </Grid>
        </Grid>
    )
}

export default Kanban;