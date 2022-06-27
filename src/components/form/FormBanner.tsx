import React from 'react';
import poster from '../../image/poster2.jpg';

const FormBanner: React.FC = () => {
  return (
    <div
      className='movie_slider span-2 bg-cover bg-center display-none sm:display-block w-60'
      style={{ backgroundImage: `url(${poster})` }}></div>
  );
};

export default React.memo(FormBanner);
