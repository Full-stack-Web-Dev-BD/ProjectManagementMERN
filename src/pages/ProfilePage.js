import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';

export default function ProfilePage() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <div className="col-md-4 offset-md-4 mt-5">
        <Card >
          <CardMedia component="img" height="194" image="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg" alt="Paella dish" />
          
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Alamin Hossen"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Button variant='contained' >Logout</Button>
          </CardContent> 
        </Card>
      </div>
    </div>
  );
}
