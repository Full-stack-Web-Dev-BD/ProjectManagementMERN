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
  width:'50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"10px",
  p: 4,
};

export default function EditTestrunForm({ projectID, testRunDetails }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [testrunName, settestrunName] = useState(testRunDetails.testrunName);
  const [state, setstate] = useState(testRunDetails.state);
  const [testDuraton, settestDuraton] = useState(testRunDetails.testDuraton);
  const [numberOfFunctionFailed, setnumberOfFunctionFailed] = useState(testRunDetails.numberOfFunctionFailed);
  const [NumberOfFunctionTested, setNumberOfFunctionTested] = useState(testRunDetails.NumberOfFunctionTested);
  const [NumberOfFunctionWOTest, setNumberOfFunctionWOTest] = useState(testRunDetails.NumberOfFunctionWOTest);
  const [NumberOfFunctionPassed, setNumberOfFunctionPassed] = useState(testRunDetails.NumberOfFunctionPassed);
  const [BranchCoverage, setBranchCoverage] = useState(testRunDetails.BranchCoverage);
  const [StatementCoverage, setStatementCoverage] = useState(testRunDetails.StatementCoverage);
  const [creationDateTime, setCreationDateTime]= useState('')

  const createProject = (e) => {
    e.preventDefault();
    const data = {
      ...testRunDetails,
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
      .put(`${BASE_URL}/api/runs/${projectID}/${testRunDetails._id}`, data)
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
        Details
      </Button>

      <Modal
        style={{ border: '0px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-center">View/Update Testrun</h4>
          <hr />
          <form className="row" onSubmit={(e) => createProject(e)}>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> testrun Name </span>
              <Input
                style={{ width: '100%' }}
                onChange={(e) => settestrunName(e.target.value)}
                placeholder={testRunDetails.testrunName}
              />
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Creation Date/Time </span>
              <Input
                style={{ width: '100%' }} 
                onChange={(e) => setCreationDateTime(e.target.value)}
                placeholder={testRunDetails.creationDate}
              />
            </div>
            <div className="col-md-6 mb-4">
              <span>Status</span>
              <select onChange={(e) => setstate(e.target.value)} className="form-control" name="State" id="">
                <option value=""> {testRunDetails.state} </option>
                <option value={'Waiting'}>Waiting</option>
                <option value={'Running'}>Running</option>
                <option value={'Passed'}>Passed</option>
                <option value={'Failed'}>Failed</option>
              </select>
            </div>

            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> test Duration </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => settestDuraton(e.target.value)}
                placeholder={testRunDetails.testDuraton}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.testDuraton}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> number Of Function Failed </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setnumberOfFunctionFailed(e.target.value)}
                placeholder={testRunDetails.numberOfFunctionFailed}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.numberOfFunctionFailed}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Number Of Function Tested </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setNumberOfFunctionTested(e.target.value)}
                placeholder={testRunDetails.NumberOfFunctionTested}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.NumberOfFunctionTested}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Number Of Function WO Test </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setNumberOfFunctionWOTest(e.target.value)}
                placeholder={testRunDetails.NumberOfFunctionWOTest}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.NumberOfFunctionWOTest}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Number Of Function Passed </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setNumberOfFunctionPassed(e.target.value)}
                placeholder={testRunDetails.NumberOfFunctionPassed}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.NumberOfFunctionPassed}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Branch Coverage </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setBranchCoverage(e.target.value)}
                placeholder={testRunDetails.BranchCoverage}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.BranchCoverage}</p>
            </div>
            <div className="col-md-6 mb-4">
              <span style={{ textTransform: 'capitalize' }}> Statement Coverage </span>
              {/* <Input
                style={{ width: '100%' }}
                onChange={(e) => setStatementCoverage(e.target.value)}
                placeholder={testRunDetails.StatementCoverage}
              /> */}
              <p style={{ textTransform: 'capitalize' }}>{testRunDetails.StatementCoverage}</p>
            </div>
            <div className="col-md-12 mt-4 text-right">
              <Button type="submit" variant="contained">
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
