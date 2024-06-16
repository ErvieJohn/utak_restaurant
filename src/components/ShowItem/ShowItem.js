import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const columns = [
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'size', label: 'Size', minWidth: 170 },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US') + " PHP",
    },
    {
        id: 'cost',
        label: 'Cost',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US') + " PHP",
    },
    {
        id: 'stock_no',
        label: 'Amount\u00a0in\u00a0stock',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
    // {
    //   id: 'cost',
    //   label: 'Cost\u00a0(km\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
];


function ShowItem({data, openEditModal, openDeleteModal}) {
    const items = data;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items ?
                            (items
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        if(column.id !== 'action'){
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <button className='btn' style={{backgroundColor: "blue", color: "white", marginRight: "10px"}} onClick={()=>openEditModal(row.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                        {"  "} Edit
                                                    </button>
                                                    <button className='btn' style={{backgroundColor: "red", color: "white"}} onClick={()=>openDeleteModal(row.id, row.name)}>
                                                        <FontAwesomeIcon icon={faTrashCan}/>
                                                        {"  "} Delete
                                                    </button>
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                                );
                            })
                        ) : (<TableRow><TableCell align='center' style={{textAlign: "center", color: "#676666", fontSize: "1.2rem" }}>No records found.</TableCell></TableRow>)}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={items ? items.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default ShowItem