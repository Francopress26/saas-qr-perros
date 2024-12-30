import React from 'react';
import { IconType } from 'react-icons';



const Feature = ({ text, title, Icon }) => {
  return (
    <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3 justify-center items-center p-4 lg:p-6'>
      {Icon && <Icon className='text-4xl lg:text-5xl mb-3' aria-hidden="true" />}
      <h3 className='font-semibold text-center text-xl lg:text-2xl mb-2'>{title}</h3>
      <p className='font-light text-base lg:text-lg text-center'>{text}</p>
    </div>
  );
};

export default Feature;