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
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
  width: "50%",

};

export default function CreateNewTestrunForm({ projectID }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [testrunName, settestrunName] = useState('');
  const [state, setstate] = useState('');
  const [testDuraton, settestDuraton] = useState('');
  const [numberOfFunctionFailed, setnumberOfFunctionFailed] = useState('');
  const [NumberOfFunctionTested, setNumberOfFunctionTested] = useState('');
  const [NumberOfFunctionWOTest, setNumberOfFunctionWOTest] = useState('');
  const [NumberOfFunctionPassed, setNumberOfFunctionPassed] = useState('');
  const [BranchCoverage, setBranchCoverage] = useState('');
  const [StatementCoverage, setStatementCoverage] = useState('');
  const [creationDateTime, setCreationDateTime]= useState('')

  const createProject = (e) => {
    e.preventDefault();
    console.log(LOCAL_USER);
    if (
      testrunName.trim() === '' ||
      state.trim() === '' ||
      testDuraton.trim() === '' ||
      numberOfFunctionFailed.trim() === '' ||
      NumberOfFunctionTested.trim() === '' ||
      NumberOfFunctionWOTest.trim() === '' ||
      NumberOfFunctionPassed.trim() === '' ||
      BranchCoverage.trim() === '' ||
      creationDateTime.trim() === '' ||
      StatementCoverage.trim() === ''
    ) {
      // Show a toast message using React Toastify
      toast.error('Please fill in all the fields');
      return;
    }
    const data = {
      testrunName,
      state,
      testDuraton,
      numberOfFunctionFailed,
      NumberOfFunctionTested,
      NumberOfFunctionWOTest,
      NumberOfFunctionPassed,
      BranchCoverage,
      StatementCoverage,
      creationDate:creationDateTime
    };
    axios
      .post(`${BASE_URL}/api/runs/${projectID}`, data)
      .then((response) => {
        toast.success('Testrun was successfully created');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error cases here
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create new Testrun
      </Button>

      <Modal
        style={{ border: '0px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-center">Create New Testrun</h4>
          <hr />
          <form className="row" onSubmit={(e) => createProject(e)}>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Test Run Name"
                onChange={(e) => settestrunName(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <select onChange={(e) => setstate(e.target.value)} className="form-control" name="State" id="">
                <option value="">Select State</option>
                <option value={'Waiting'}>Waiting</option>
                <option value={'Running'}>Running</option>
                <option value={'Passed'}>Passed</option>
                <option value={'Failed'}>Failed</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Test Duraton"
                onChange={(e) => settestDuraton(e.target.value)}
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Creation Date/Time"
                onChange={(e) => setCreationDateTime(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder="Number Of Function Failed"
                onChange={(e) => setnumberOfFunctionFailed(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Number Of Function Tested"
                onChange={(e) => setNumberOfFunctionTested(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Number Of Function WO Test"
                onChange={(e) => setNumberOfFunctionWOTest(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Number Of Function Passed"
                onChange={(e) => setNumberOfFunctionPassed(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Branch Coverage"
                onChange={(e) => setBranchCoverage(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Input
                style={{ width: '100%' }}
                placeholder=" Statement Coverage"
                onChange={(e) => setStatementCoverage(e.target.value)}
              />
            </div>
            <div className="col-md-12 text-right mt-4">
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
