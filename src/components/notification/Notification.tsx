import React from 'react';
import { Link } from 'react-router-dom';
import DropDown from '../dropdown/DropDown';

import { RiEmotionHappyFill, RiEmotionSadFill } from 'react-icons/ri';
import {duration} from '../../utils/Duration';

const lists: {
  id: number;
  title: string;
  imgLink: string;
  link: string;
  time: string;
  isVisited: boolean;
}[] = [
  {
    id: 1,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'feb 13 2021',
    isVisited: false,
  },
  {
    id: 12,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'feb 10 2022',
    isVisited: true,
  },
  {
    id: 143,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 14 2022 14:00:00',
    isVisited: false,
  },
  {
    id: 534,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 14 2022 15:04:00',
    isVisited: false,
  },
  {
    id: 232,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 3 2022 15:04:00',
    isVisited: false,
  },
  {
    id: 754,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 3 2022 17:04:00',
    isVisited: true,
  },
  {
    id: 775,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 1 2022 11:04:00',
    isVisited: true,
  },
  {
    id: 342,
    title: 'Watch all free movies and tv series from the 15th to 18th march',
    imgLink:
      'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    link: '/sarcastic',
    time: 'march 1 2022 15:04:00',
    isVisited: false,
  },
];
const Notification: React.FC<{ handleVisibleDrp: () => void }> = (props) => {
  const status = true;
  return (
    <DropDown
      drpId='notification'
      label={<></>}
      handleDrp={props.handleVisibleDrp}
      styles='my-50 bg-secondary shadow-lg p-10 rounded-lg w-300 fixed sm:absolute sm:w-400  h-screen-90 overflow-hidden sm:right-0 right-10'>
      <>
        <div
          className='flex space-between items-center py-10 border-gray'
          style={{ borderBottom: '1px solid' }}>
          <span>Notification</span>
          <Link to='/settings/notification' className='flex'>
            {status ? (
              <RiEmotionHappyFill className='color-info' />
            ) : (
              <RiEmotionSadFill className='color-warn notification' />
            )}
          </Link>
        </div>
        <div
          className='flex flex-col py-10 overflow-y-scroll scrollbar-on-hover'
          style={{ maxHeight: '90%' }}>
          {lists.map((el) => (
            <Link
              to={el.link}
              key={el.id}
              className='flex gap-20 color-gray text-regular items-center hover-bg-fade p-6 rounded-regular my-6 relative'>
              <img
                src={el.imgLink}
                alt='banner'
                className='rounded-lg'
                style={{ width: 100, height: 60 }}
              />
              {!el.isVisited && (
                <span
                  className='rounded-full bg-white border-2 border-purple absolute left-0'
                  style={{ height: 10, width: 10 }}></span>
              )}
              <div className='flex flex-col gap-10'>
                <span>{el.title}</span>
                <span>{duration(el.time)}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    </DropDown>
  );
};

export default Notification;
