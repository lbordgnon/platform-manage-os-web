import React from 'react';
import Menuitems from './MenuItems';
import MenuItemsEngineer from './MenuItemsEngineer';
import MenuAdm from './MenuAdm';

import Cookie from 'js.cookie';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const userType = Cookie.get('userType');
  let menu; 
  if(userType < 3){
   menu = userType === 1 ? MenuItemsEngineer : Menuitems
  }
  else{
    menu = MenuAdm;
  }
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menu.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
