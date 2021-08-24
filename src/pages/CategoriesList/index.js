import react from 'react';

import DataTable from '../../components/table.component';

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
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                title="Categorias"
                pagination
                selectableRows
            />
        </>
    );
}

export default ListView;