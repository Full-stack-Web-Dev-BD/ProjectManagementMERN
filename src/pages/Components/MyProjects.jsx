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
import jwtDecode from 'jwt-decode';
import { BASE_URL, LOCAL_USER } from '../../utils/constant';
import ProjectCreateModal from './CreateProjectForm';
 

 
export default function MyProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if(token){
      const decodedToken= jwtDecode(token)
      console.log(decodedToken.user._id)
    const fetchProjects = async () => {
      const projects = await axios.get(`${BASE_URL}/api/projects/user/${decodedToken.user._id}`);
      console.log(projects.data);
      setprojects(projects.data);
      setLoading(false);
    };
    fetchProjects();
    }
  }, []);
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <div className='d-flex' style={{justifyContent:'space-between'}}>
      <Typography variant="h4"> My Projects</Typography>
      <ProjectCreateModal/>
      </div>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Client Name </TableCell> 
              <TableCell> Project Name </TableCell> 
              <TableCell align="right"> State </TableCell>
              <TableCell align="right"> Details </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {LOCAL_USER?.user?.name}
                </TableCell> <TableCell component="th" scope="row">
                  {row.projectName}
                </TableCell>
                <TableCell align="right" style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="outlined" color="secondary">
                    {row.state}
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
        {!loading && projects.length<1 ? <h3 className="text-center mt-4 mb-4">Project Not exist</h3> : ''}
      </TableContainer>
    </div>
  );
}
