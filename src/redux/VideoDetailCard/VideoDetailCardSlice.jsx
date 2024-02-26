import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoDetailData = createAsyncThunk('videoDetailCard/fetchVideoDetailData', async (videoTitle) => {
  let api = import.meta.env.VITE_API;
  const http = '/http/search?';

  const response = await fetch(http + new URLSearchParams({
    key: api,
    q: videoTitle.replace(/[^\w\s.ğüşıöçĞÜŞİÖÇ]/g, ''),
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    regionCode: 'TR',
    videoDuration: 'long'
  }));
  return response.json();
})

export const VideoDetailCardSlice = createSlice({
  name: 'videoDetailCard',
  initialState: {
    videoData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoDetailData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoDetailData.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
  }
});

export const selectVideoDetailCardIsLoading = (state) => state.videoDetailCard.isLoading;
export const selectVideoDetailCardData = (state) => state.videoDetailCard.videoData;
export default VideoDetailCardSlice.reducer;
