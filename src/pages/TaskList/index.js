import react, {useEffect, useState, useMemo} from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import DataTable from 'components/table.component';
import { API } from 'services/api';
import {Button, Grid} from '@material-ui/core'

const columns = [
    {name: 'ID', maxWidth: '60px', selector: row => row.id},
    {name: 'Categoria', selector: row => row.category.name},
    {name: 'Usuário', selector: row => row.profile.login.email},
    {name: 'Título', selector: row => row.title},
    {name: 'Descrição', wrap: true, selector: row => row.description},
    {name: 'Status', selector: row => row.status},
    {
        name: 'Progresso',
        maxWidth: '60px',
        selector: row => row.progress,
        conditionalCellStyles: [
            {
                when: row => row.progress < 40,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
			        color: 'white',
                }
            },
            {
                when: row => row.progress > 40 && row.progress < 60,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
			        color: 'white',
                }
            },
            {
                when: row => row.progress > 60 && row.progress < 90,
                style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
			        color: 'white',
                }
            },
            {
                when: row => row.progress === 100,
                style: {
                    backgroundColor: '#8137f7e6',
			        color: 'white',
                }
            }
        ],
    },
    {name: 'Prazo', selector: row => row.deadline},
];

const ListView = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);

    const handleGoToTask = (row) => {
        history.push(`tasks/edit/${row.id}`);
    };

    const handleGoToNew = () => {
        history.push(`tasks/new`);
    };

    useEffect(() => {
        API.get('/task/all').then((response) => {
            setData(response.data);
        }).catch((e) => {
            enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
        })
    }, []);

    return (
        <DataTable
            columns={columns}
            data={data}
            title="Lista de tarefas"
            pagination
            pointerOnHover
            onRowClicked={(row) => handleGoToTask(row)}
            actions={<Button variant="contained" color="primary" onClick={e => handleGoToNew()}>Nova tarefa</Button>}
        />
    );
}

export default ListView;