import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isPopupOpen: false,
  },
  reducers: {
    openPopup: (state) => {
      state.isPopupOpen = true;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
