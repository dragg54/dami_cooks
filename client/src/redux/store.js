// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import  cartReducer  from './CartSlice'
import  userReducer  from './UserSlice'
import globalModalReducer from './GlobalModalSlice'


const persistConfig = {
    key: "root",
    storage,
    blacklist: ['cart', 'globalModal']

  }

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    globalModal: globalModalReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat()
});
export const persistor = persistStore(store)
export default store;