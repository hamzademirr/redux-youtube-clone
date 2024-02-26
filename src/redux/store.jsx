import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./Theme/themeSlice";
import sidebarReducer from "./Sidebar/sidebarSlice";
import videoCardReducer from "./VideoCard/videoCardSlice";
import videoDetailCardReducer from "./VideoDetailCard/VideoDetailCardSlice";
import videoSearchCardReducer from "./VideoSearchCard/VideoSearchCardSlice";
import VideoReducer from "./Video/VideoSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    videoCard: videoCardReducer,
    videoDetailCard: videoDetailCardReducer,
    videoSearchCard: videoSearchCardReducer,
    video: VideoReducer,
  },
})
