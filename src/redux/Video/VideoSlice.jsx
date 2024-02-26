import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideo = createAsyncThunk("videoCard/fetchVideo", async (SearchParams) => {
  let api = import.meta.env.VITE_API;
  const http = '/http/videos?';

  const response = await fetch(http + new URLSearchParams({
    key: api,
    part: "snippet,statistics",
    id: SearchParams,
  }));
  return response.json();
});

export const fetchVideoChannelData = createAsyncThunk("videoCard/fetchVideoChannelData", async (channelId) => {
  let api = import.meta.env.VITE_API;
  const http = '/http/channels?';

  const response = await fetch(http + new URLSearchParams({
    key: api,
    part: 'snippet',
    id: channelId
  }));

  const data = await response.json();
  return data.items[0];
});

export const VideoSlice = createSlice({
  name: 'video',
  initialState: {
    videoData: [],
    channelData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchVideoChannelData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoChannelData.fulfilled, (state, action) => {
      state.channelData = action.payload;
      state.isLoading = false;
    });
  },
});

export const selectVideoIsLoading = (state) => state.video.isLoading;
export const selectVideoData = (state) => state.video.videoData;
export const selectChannelData = (state) => state.video.channelData;
export default VideoSlice.reducer;
