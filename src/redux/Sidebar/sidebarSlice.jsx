import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    show: false,
  },
  reducers:{
    toggleSidebar: (state) => {
      state.show = !state.show;
    }
  }
})

export const selectSidebar = (state) => state.sidebar.show;
export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
