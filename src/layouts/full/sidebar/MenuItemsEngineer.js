import {
  IconLayoutDashboard,
  IconFilePencil,
  IconFileDollar
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const MenuItemsEngineer = [
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
    title: 'Criar OS',
    icon: IconFilePencil,
    href: '/create-os',
  },
  {
    id: uniqueId(),
    title: 'Cadastrar Oçamento',
    icon: IconFileDollar,
    href: '/create-budget',
  },
];

export default MenuItemsEngineer;
