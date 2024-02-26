import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: true,
  },
  reducers: {
    changeTheme: (state) => {
      state.theme = !state.theme;
    }
  }
})

export const selectTheme = (state) => state.theme.theme;
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
