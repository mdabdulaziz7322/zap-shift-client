import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Forbidden from '../../Forbidden/Forbidden';



const DashboardHome = () => {
   
    const {role, roleLoading} = useUserRole();

    if(roleLoading) {
      return  <h3>role is loading</h3>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else if (role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else{
        return <Forbidden></Forbidden>
    }

    
};

export default DashboardHome;