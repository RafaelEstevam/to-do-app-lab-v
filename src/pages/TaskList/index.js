import react, {useEffect} from 'react';

import DataTable from 'components/table.component';
import {API} from 'services/api';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
];

const ListView = () => {

    useEffect(() => {
        API.get('/task/all').then((response) => {
            console.log(response);
        }).catch((e) => {

        })
    }, [])

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                title="Lista de tarefas"
                pagination
                selectableRows
            />
        </>
    );
}

export default ListView;