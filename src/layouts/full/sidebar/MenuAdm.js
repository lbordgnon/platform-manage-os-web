import {
  IconLayoutDashboard,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuAdm = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Registrar Engenheiro',
    icon: IconUserPlus,
    href: '/signup-engineer',
  },
];

export default MenuAdm;
