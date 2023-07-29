import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

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

export default function MyProjects() {
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <Typography variant="h4"> My Projects</Typography>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Project Title </TableCell>
              <TableCell align="right">Runs</TableCell>
              <TableCell align="right"> Timer </TableCell>
              <TableCell align="right"> Details </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right"> 330 </TableCell>
                <TableCell align="right" style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="outlined" color="secondary">
                    33s{' '}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <Link to={'/dashboard/app/3234023u42304nu2'}>
                    {' '}
                    <FaExternalLinkAlt />{' '}
                  </Link>{' '}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
