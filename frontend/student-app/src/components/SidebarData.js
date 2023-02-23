import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SidebarData = [

    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        link:"/AccountCircle"
    },
    
    {
        title:"home",
        icon:<HomeIcon/>,
        link:"/home"
    },
    {
        title:"Projects",
        icon:<AccountTreeIcon/>,
        link:"/AccountTree"
    },
    {
        title:"Explore",
        icon:<ExploreIcon/>,
        link:"/Explore"
    },
    {
        title:"Dashboard",
        icon:<DashboardIcon/>,
        link:"/Dashboard"
    }
   
 ]


