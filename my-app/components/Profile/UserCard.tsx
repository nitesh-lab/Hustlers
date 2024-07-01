import React from 'react';
import User from './User';
import Profiles from './Profiles';
import { user_obj } from '../auth/Signup';

const UserCard = ({user}:{user:user_obj}) => {
  return (
    <div className='w-[90%] mx-[10%] mt-[2rem] grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-0'>
      {/* <div className='hidden lg:block lg:col-start-1 lg:col-end-2'></div> */}

     <User user={(user) as user_obj}/>
      <Profiles/>
    </div>
  );
};

export default UserCard;
