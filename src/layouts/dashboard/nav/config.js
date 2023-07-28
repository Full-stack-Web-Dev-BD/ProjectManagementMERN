// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Manage Employee',
    path: '/dashboard/employee',
    icon: icon('ic_user'),
  }, 
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: icon('ic_blog'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_lock'),
  }
];

export default navConfig;
