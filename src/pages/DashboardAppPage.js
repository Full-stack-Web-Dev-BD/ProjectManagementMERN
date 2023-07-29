import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import { 
  AppWidgetSummary, 
} from '../sections/@dashboard/app'; 
import ProjectTable from './Components/ProjectTable';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Project Management System </title>
      </Helmet>

      <Container maxWidth="xl">

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Projects" amount={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Runs" amount={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>
        </Grid>
      </Container>
      <ProjectTable/>
    </>
  );
}
