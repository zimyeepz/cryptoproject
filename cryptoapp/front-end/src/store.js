import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    cryptos:[]
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        add: (state, action) => {
            state.cryptos.push(action.payload);
        },
        update: (state, action) => {
            const { id } = action.payload;
            let item = state.cryptos.find(item => item.id == id);
            item.b = Math.random();
        },
        merge: (state, action) => {
            console.log("Merge",action);
            const { book, payload } = action.payload;
            if (book) {
                //Buscmos el libro en el state
                let item = state.cryptos.find(item => item.book == book);
                if(item){
                    item.payload[0].i = payload[0].i;
                    item.payload[0].a = payload[0].a;
                    item.payload[0].r = payload[0].r;
                    item.payload[0].v = payload[0].v;
                }else{
                    state.cryptos.push(action.payload);
                }
            }

        }
    }
});

export const { add, update, merge } = appSlice.actions;
const appReducer = appSlice.reducer;

export default configureStore({
    reducer: {
        app : appReducer
    }
});