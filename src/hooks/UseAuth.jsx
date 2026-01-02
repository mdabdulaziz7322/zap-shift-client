import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const UseAuth = () => {
   const AuthInfo = use(AuthContext);
    return AuthInfo;
};

export default UseAuth;