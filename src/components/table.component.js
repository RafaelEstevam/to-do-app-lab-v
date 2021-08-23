
import react from 'react';
import DataTable from 'react-data-table-component';

const Table = ({columns, data, title, pagination, selectableRows}) => {
    return (
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pagination={pagination}
            selectableRows={selectableRows}
        />
    );
};

export default Table;