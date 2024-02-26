import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { useSearchParams, NavLink } from 'react-router-dom';
import './style.scss';

import { selectTheme } from '../../redux/Theme/themeSlice';
import { fetchVideoSearchData, fetchChannelSearchData, selectVideoSearchCardData, selectChannelSearchCardData, selectVideoSearchCardIsLoading } from '../../redux/VideoSearchCard/VideoSearchCardSlice';
import Loading from "../../components/Loading";

function VideoSearchCard() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()
  const theme = useSelector(selectTheme);
  const videoData = useSelector(selectVideoSearchCardData);
  const channelData = useSelector(selectChannelSearchCardData);
  const isLoading = useSelector(selectVideoSearchCardIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await dispatch(fetchVideoSearchData(searchParams.get('q')));
        const videoData = await videoResponse.payload.items;
        const channelIds = videoData.map(video => video.snippet.channelId);
        const channelDataPromises = channelIds.map(channelId => dispatch(fetchChannelSearchData(channelId)));
        await Promise.all(channelDataPromises);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && videoData && videoData.map((video, index) => (
        <Card key={video.id} className={theme ? 'video-search-card-template dark' : 'video-search-card-template light'}>
          <NavLink className='navlink-template' to={`/detail?q=${video.id.videoId}`}>
            <div className='video-image'>
              <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
            </div>
            <div className='video-info'>
              <div className='video-title'>
                <h3>{video.snippet.title}</h3>
                <p>{`${Math.random()}`.slice(0, 3) * 1000 + 1}K Views - {`${Math.floor(Math.random() * 7) + 1}`} days ago</p>
              </div>
              <div className='channel-info'>
                {channelData[index] && (
                  <img src={channelData[index].snippet.thumbnails.default.url} alt={channelData[index].snippet.title} />
                )}
                <span>{video.snippet.channelTitle}</span>
              </div>
              <p>{video.snippet.description}</p>
            </div>
          </NavLink>
        </Card>
      ))}
    </>
  );

}

export default VideoSearchCard;
