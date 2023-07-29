import { Helmet } from 'react-helmet-async';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link, Container, Typography, Divider, Stack, Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

// hooks
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SigninPage() {
  const mdUp = useResponsive('up', 'md'); 
  const [Email, setEmail] = useState(''); 
  const [Password, setPassword] = useState(''); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email:Email,
        password: Password
      }

      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      window.localStorage.setItem("token", response.data?.token)
      window.location.href="/dashboard/app"
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Loop over the errors and show toast messages
        err.response.data.errors.forEach((error) => {
          toast.error(error.msg, { position: 'top-right', autoClose: 5000 });
        });
      } else if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
        toast.error('Error occurred during signup. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> Login | TestLabAI </title>
      </Helmet>

      <StyledRoot className="outerPage">
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" style={{ color: 'white' }} gutterBottom>
              Sign in to TestLabAI
            </Typography>

            <Typography className="text-light" variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <a href="/login">
                <Link variant="subtitle2">Go to Login !</Link>
              </a>
            </Typography>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <Stack spacing={3}> 
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ color: 'white !important', backgroundColor: 'white', borderRadius: '5px' }}
                  className="text-light"
                  name="email"
                  label=""
                  placeholder="Email"
                /> 

                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ color: 'white !important', backgroundColor: 'white', borderRadius: '5px' }}
                  className="text-light"
                  name="Password"
                  label=""
                  type='password'
                  placeholder="Password"
                />
              </Stack>
              <LoadingButton className="mt-4" fullWidth size="large" type="submit" variant="contained">
                Sign In
              </LoadingButton>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
