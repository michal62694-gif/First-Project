import { createSlice } from '@reduxjs/toolkit'

const initialState = {
api:[
    {id:1,name:'michal', key:'12345-ABCDE-67890-FGHIJ', userId:1},
    {id:2,name:'yossi', key:'54321-EDCBA-09876-JIHGF', userId:2 },
    {id:3,name:'dana', key:'11223-AABBCC-33445-DDEEE', userId:3 }
],
}



export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
        apiArrived: (state, action) => {
                const allApi=action.payload;
                state.api = [...allApi];
            },

        addApi: (state, action) => {
            const newApi = action.payload;
                if (state.api.length > 0) {
                newApi.id = state.api[state.api.length - 1].id + 1;
            } else {
                newApi.id = 1;
            }  
            state.api.push(newApi);
        },
        updateApi: (state, action) => {
            const updatedApi = action.payload;
            const index = state.api.findIndex(p => p.id === updatedApi.id);
            state.api[index] = {...updatedApi};
        },
        deleteApi: (state, action) => {
            const id = action.payload;
            const index = state.api.findIndex(p => p.id === id);
            state.api.splice(index, 1);
        },
        changeCurrentApi: (state, action) => {
            const current = action.payload;
            state.currentApi = current
        },
  },
})

// Action creators are generated for each case reducer function
export const { apiArrived, addApi, updateApi, deleteApi, changeCurrentApi } = apiSlice.actions

export default apiSlice.reducer