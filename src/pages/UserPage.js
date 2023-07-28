import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Users() {
  return (
    <div className='col-md-10 offset-md-1 mt-4'>
      <Typography variant='h4'className='mb-4 mt-4'> Manage Employee </Typography>
      <Button variant='contained'>Add Employee</Button>
    <TableContainer component={Paper} className="mt-4">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Name </TableCell>
            <TableCell> Image </TableCell>
            <TableCell> Email </TableCell>
            <TableCell> Address </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell align="right"> <span style={{marginRight:'30px'}}>Action</span> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align=""> Img </TableCell>
              <TableCell align=""> email </TableCell>
              <TableCell align=""> Address </TableCell>
              <TableCell align=""> 2334 </TableCell>
              <TableCell align="right" style={{display:'flex',gap:'10px'}}>
                <Button variant='contained' color='secondary'> Edit </Button>
                <Button variant='outlined' color='secondary' >Delete </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
