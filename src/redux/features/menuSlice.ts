import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceState {
  value: boolean;
}

const initialState: SliceState = {
  value: false,
};

export const MenuSlice = createSlice({
  name: "menuState",
  initialState,
  reducers: {
    reset: () => initialState,
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});
export const { reset, setMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
