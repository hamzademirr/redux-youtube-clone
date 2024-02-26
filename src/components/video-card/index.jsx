import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import './style.scss';

import { selectTheme } from '../../redux/Theme/themeSlice';
import { fetchVideoCardData, fetchChannelCardData, selectChannelCardData, selectVideoCardData, selectVideoIsLoading } from '../../redux/VideoCard/videoCardSlice';
import Loading from "../../components/Loading";

function VideoCard() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const videoData = useSelector(selectVideoCardData);
  const channelData = useSelector(selectChannelCardData);
  const isLoading = useSelector(selectVideoIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await dispatch(fetchVideoCardData());
        const videoData = await videoResponse.payload.items;
        const channelIds = videoData.map(video => video.snippet.channelId);
        const channelDataPromises = channelIds.map(channelId => dispatch(fetchChannelCardData(channelId)));
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
      {!isLoading && videoData.map((video, index) => (
        <Card key={video.id} className={theme ? 'video-card-template dark' : 'video-card-template light'}>
          <NavLink className='navlink-template' to={`/detail?q=${video.id}`}>
            <div className='video-image'>
              <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
            </div>
            <div className='video-info'>
              {channelData[index] && (
                <img src={channelData[index].snippet.thumbnails.default.url} alt={channelData[index].snippet.title} />
              )}
              <div>
                <p>{video.snippet.title}</p>
                <span>{video.snippet.channelTitle}</span>
                <br />
                <span>{video.statistics.viewCount} izlenme - {new Date().getDate() - new Date(video.snippet.publishedAt).getDate()} gün önce</span>
              </div>
            </div>
          </NavLink>
        </Card>
      ))}
    </>
  )
}

export default VideoCard;
