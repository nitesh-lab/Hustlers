import React from 'react';
import User from './User';
import Profiles from './Profiles';
import { user_obj } from '../auth/Signup';

const UserCard = ({user,client_email,isFollowing}:{user:user_obj,client_email:string,isFollowing:boolean}) => {
  return (
    <div className=' w-[90%] mx-[5%] mt-[2rem] grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-0'>
      {/* <div className='hidden lg:block lg:col-start-1 lg:col-end-2'></div> */}

     <User user={(user) as user_obj} isFollow={isFollowing} client_email={client_email}/>
      <Profiles/>
    </div>
  );
};

export default UserCard;
