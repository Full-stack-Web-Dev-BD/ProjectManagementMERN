import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import jwtDecode from 'jwt-decode';
import { Button } from '@mui/material';
import moment from 'moment/moment';

export default function ProfilePage() {
  const [userDetails, setUserDetails] = React.useState({});

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      setUserDetails(user.user);
    }
  }, []);

  return (
    <div>
      <div className="col-md-4 offset-md-4 mt-5">
        <Card>
          <CardMedia
            component="img"
            height="194"
            image="https://twproject.com/blog/wp-content/uploads/project-management-software-in-mother-tongue.png"
            alt="Paella dish"
          />

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userDetails.name[0].toLocaleUpperCase()}
              </Avatar>
            }
            title={userDetails.name}
            subheader={userDetails.createdAt ? moment(userDetails.createdAt).format('MMMM D, YYYY') : ''}
          />
          <CardContent>
            <Button
              variant="contained"
              onClick={(e) => {
                window.localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
