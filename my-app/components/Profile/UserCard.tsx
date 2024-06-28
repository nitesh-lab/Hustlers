import React from 'react';
import User from './User';
import Profiles from './Profiles';

const UserCard = () => {
  return (
    <div className='w-[90%] mx-[10%] mt-[2rem] grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-0'>
      {/* <div className='hidden lg:block lg:col-start-1 lg:col-end-2'></div> */}

     <User/>
      <Profiles/>
    </div>
  );
};

export default UserCard;
