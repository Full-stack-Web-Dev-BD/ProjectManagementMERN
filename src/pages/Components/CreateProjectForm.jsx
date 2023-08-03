import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, LOCAL_USER } from '../../utils/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border:'0',
  borderRadius:'10px', 
  boxShadow: 24,
  p: 4,
};

export default function ProjectCreateModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectName, setprojectName] = useState('');
  const [state, setstate] = useState('');
  const [testsuite, settestsuite] = useState('');
  const [rulSet, setrulSet] = useState('');
  const [swRequirements, setswRequirements] = useState('');
  const [codePath, setcodePath] = useState('');
  const [testCases, settestCases] = useState('');

  const createProject = (e) => {
    e.preventDefault();
    // Validate all variables are filled
    console.log(LOCAL_USER)
    if (
      projectName.trim() === '' ||
      state.trim() === '' ||
      testsuite.trim() === '' ||
      rulSet.trim() === '' ||
      swRequirements.trim() === '' ||
      codePath.trim() === '' ||
      testCases.trim() === ''
    ) {
      // Show a toast message using React Toastify
      toast.error('Please fill in all the fields');
      return;
    }

    // All variables are filled, make the API call
    const data = {
      projectName,
      state,
      testsuite,
      rulSet,
      swRequirements,
      codePath,
      testCases,
      user:LOCAL_USER.user?._id
    };
    axios
      .post(`${BASE_URL}/api/projects`, data)
      .then((response) => {
        // Handle successful API response here
        toast.success('Project was successfully created');
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
      .catch((error) => {
        // Handle error cases here
      });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create New Project
      </Button>

      <Modal
        style={{ border: '0px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-center">Create New Project</h4>
          <hr />
          <form className="row" onSubmit={(e) => createProject(e)}>
            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}}
                required
                placeholder="Project Name"
                title="Project Name"
                onChange={(e) => setprojectName(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <select onChange={(e) => setstate(e.target.value)} className="form-control" name="State" id="">
                <option value="">Select State</option>
                <option value={'New'}>New</option>
                <option value={'Running'}>Running</option>
                <option value={'Done'}>Done</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}}
                required
                placeholder="Test Suite"
                title="testsuite"
                onChange={(e) => settestsuite(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}} required placeholder="Rul Set" title="rulSet" onChange={(e) => setrulSet(e.target.value)} />
            </div>

            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}}
                required
                placeholder="SW Requirements"
                title="swRequirements"
                onChange={(e) => setswRequirements(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}} required placeholder="Code Path" title="codePath" onChange={(e) => setcodePath(e.target.value)} />
            </div>

            <div className="col-md-6 mb-3">
              <Input style={{width:'100%'}}
                required
                placeholder="Test Cases"
                title="testCases"
                onChange={(e) => settestCases(e.target.value)}
              />
            </div>
            <div className="col-md-12 mt-4 text-right">
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
