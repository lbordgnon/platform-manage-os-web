import {
  IconLayoutDashboard,
  IconFilePencil,
  IconFileDollar,
  IconStack2
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
  {
    id: uniqueId(),
    title: 'Meus orçamentos',
    icon: IconStack2,
    href: '/budgets',
  },
];

export default MenuItemsEngineer;
