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

export default function MyRuns({runs}) {
  return (
    <div className=" ">
      <Typography variant="h4"> My Runs</Typography>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{textTransform:'capitalize'}}> Name </TableCell>
              <TableCell style={{textTransform:'capitalize'}} align="right">No. of Error</TableCell>
              <TableCell style={{textTransform:'capitalize'}} align="right"> Coverage </TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {runs.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{textTransform:'capitalize'}} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{textTransform:'capitalize'}} align="right"> {row.error} </TableCell>
                <TableCell style={{textTransform:'capitalize'}} align="right">
                  {row.coverage}
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
