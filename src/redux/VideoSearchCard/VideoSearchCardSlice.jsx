import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoSearchData = createAsyncThunk("videoCard/fetchVideoSearchData", async (SearchParams) => {
  let api = import.meta.env.VITE_API;
  const http = '/http/search?';
  const response = await fetch(http + new URLSearchParams({
    key: api,
    q: SearchParams,
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    regionCode: 'TR',
    videoDuration: 'long'
  }));
  return response.json();
});

export const fetchChannelSearchData = createAsyncThunk("videoCard/fetchChannelSearchData", async (channelId) => {
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

export const VideoSearchCardSlice = createSlice({
  name: 'videoSearchCard',
  initialState: {
    videoData: [],
    channelData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoSearchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideoSearchData.fulfilled, (state, action) => {
      state.videoData = action.payload.items;
      state.isLoading = false;
    });
    builder.addCase(fetchChannelSearchData.pending, (state) => {
      state.isLoading = true;
      state.channelData = [];
    });
    builder.addCase(fetchChannelSearchData.fulfilled, (state, action) => {
      state.channelData = [...state.channelData, action.payload];
      state.isLoading = false;
    });
  },
});

export const selectVideoSearchCardIsLoading = (state) => state.videoSearchCard.isLoading;
export const selectVideoSearchCardData = (state) => state.videoSearchCard.videoData;
export const selectChannelSearchCardData = (state) => state.videoSearchCard.channelData;
export default VideoSearchCardSlice.reducer;
