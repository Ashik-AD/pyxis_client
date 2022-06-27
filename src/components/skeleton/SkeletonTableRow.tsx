import React from 'react';

const SkeletonTableRow = () => {
  const styles = {
    height: 10,
  };
  return (
    <div className='grid col-8 gap-20 items-center'>
      <div className='span-4 flex px-20 gap-10 items-center'>
        <div
          className='h-100 bg-fade SkeletonAnimate rounded-lg'
          style={{ width: 70 }}></div>
        <div className='flex flex-col w-75 gap-10'>
          <span
            className='w-25 bg-fade SkeletonAnimate rounded-xlg'
            style={styles}></span>
          <span
            className='w-50 bg-fade SkeletonAnimate rounded-xlg'
            style={styles}></span>
        </div>
      </div>
      <span
        className='w-50 bg-fade SkeletonAnimate rounded-lg'
        style={styles}></span>
      <span
        className='w-50 bg-fade SkeletonAnimate rounded-lg'
        style={styles}></span>
      <span
        className='w-50 bg-fade SkeletonAnimate rounded-lg'
        style={styles}></span>
      <div className='flex gap-10'>
        <span
          className='w-25 bg-fade SkeletonAnimate rounded-lg'
          style={styles}></span>
        <span
          className='w-25 bg-fade SkeletonAnimate rounded-lg'
          style={styles}></span>
      </div>
    </div>
  );
};

export default SkeletonTableRow;
