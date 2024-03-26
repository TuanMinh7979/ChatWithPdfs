import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  allMessages: [],
};
const allMessagesSlice = createSlice({
  name: 'allMessages',
  initialState,
  reducers: {
    addOne: (state, action) => {
      state.allMessages.push(action.payload);
    
    },
    empty: (state) => {
      state.allMessages = [];
    },
  },
});
export const { addOne, empty } = allMessagesSlice.actions;
export default allMessagesSlice.reducer;
