import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { useSearchParams, NavLink } from 'react-router-dom';
import './style.scss';

import { selectTheme } from '../../redux/Theme/themeSlice';
import { selectVideoDetailCardData, selectVideoDetailCardIsLoading, fetchVideoDetailData } from '../../redux/VideoDetailCard/VideoDetailCardSlice';
import Loading from "../../components/Loading";

function VideoDetailCard({ videoTitle }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()
  const theme = useSelector(selectTheme);
  const videoData = useSelector(selectVideoDetailCardData);
  const isLoading = useSelector(selectVideoDetailCardIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchVideoDetailData(videoTitle));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && videoData.map((video) => (
        <Card className={theme ? 'video-detail-card-template dark' : 'video-detail-card-template light'}>
          <NavLink className='navlink-template' to={`/detail?q=${video.id.videoId}`}>
            <div className='video-image'>
              <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
            </div>
            <div className='video-info'>
              <div className='video-title'>
                <h3>{video.snippet.title}</h3>
                <p>{video.snippet.channelTitle}</p>
                <p>{`${Math.random()}`.slice(0, 3) * 1000 + 1}K Views - {`${Math.floor(Math.random() * 7) + 1}`} days ago</p>
              </div>
            </div>
          </NavLink>
        </Card>
      ))}
    </>
  )
}

export default VideoDetailCard
