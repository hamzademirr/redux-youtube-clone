import React from 'react';
import { useSelector } from 'react-redux';
import VideoCard from '../../components/video-card';
import './style.scss';
import { selectTheme } from '../../redux/Theme/themeSlice';

function Home() {
  const theme = useSelector(selectTheme);
  return (
    <div className={theme ? 'dark item' : 'light item'}>
      <div className='video-container'>
        <VideoCard />
      </div>
    </div>
  )
}

export default Home
