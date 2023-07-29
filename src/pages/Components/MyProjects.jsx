import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
 

 
export default function MyProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await axios.get(`${BASE_URL}/api/projects`);
      console.log(projects.data)
      setprojects(projects.data);
      setLoading(false);
    };
    fetchProjects();
  }, []);
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <Typography variant="h4"> My Projects</Typography>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Project Title </TableCell> 
              <TableCell align="right"> Timer </TableCell>
              <TableCell align="right"> Details </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right" style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="outlined" color="secondary">
                    {row.timer}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Link to={`/dashboard/app/${row._id}`}>
                    <FaExternalLinkAlt />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading ? <h3 className="text-center">Loading...</h3> : ''}
      </TableContainer>
    </div>
  );
}
