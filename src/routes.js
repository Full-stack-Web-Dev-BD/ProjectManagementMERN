import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Page404 from './pages/Page404';
import ProfilePage from './pages/ProfilePage';
import MyProjects from './pages/Components/MyProjects';
import ProjectDetails from './pages/Components/ProjectDetails'; 
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SignInPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <MyProjects /> },
        { path: 'app/:id', element: <ProjectDetails /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    {
      path: 'login',
      element: <SigninPage />,
    }, 
    {
      path: 'signup',
      element: <SignupPage />,
    }, 
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
